const User = require("../models/User");
const logger = require("../services/logger");
const generateToken = require("../utils/generateToken");

const ChatHistory = require("../models/ChatHistory");

exports.register = async (req, res, next) => {
	try {
		const { name, email, password, password2 } = req.body;

		if (password !== password2) {
			return res.status(400).json({ error: "Passwords do not match" });
		}

		let user = await User.findOne({ email });
		if (user) {
			logger.warn(`Registration failed: email ${email} already in use`);
			return res.status(400).json({ error: "Email already in use" });
		}

		user = new User({ name, email, password });
		await user.save();

		logger.info(`User registered: ${email}`);

		const token = generateToken(res, user);

		// Set JWT as HTTP-only cookie
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		res.status(201).json({
			message: "User registered successfully",
			user: { name: user.name, email: user.email },
		});
	} catch (err) {
		logger.error("Error in register:", err);
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Generate JWT and set cookie
		const token = generateToken(res, user);

		// Fetch user's chat history
		const chatHistory = await ChatHistory.find({ userId: user._id }).sort({
			createdAt: 1,
		});

		console.log(chatHistory);

		res.json({
			message: "Login successful",
			user: { name: user.name, email: user.email },
			chatHistory, // attach chat history
		});
	} catch (err) {
		logger.error("Error in login:", err);
		next(err);
	}
};

exports.logout = (req, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
	});
	res.json({ message: "Logged out successfully" });
};

exports.getMe = async (req, res, next) => {
	try {
		const userId = req.user._id;

		// Fetch chat history for this user
		const chatHistory = await ChatHistory.find({ userId }).sort({
			createdAt: 1,
		});

		res.json({
			id: req.user._id,
			name: req.user.name,
			email: req.user.email,
			chatHistory: chatHistory.map((msg) => ({
				role: msg.role,
				content: msg.content,
				chatId: msg.chatId,
			})),
		});
	} catch (err) {
		next(err);
	}
};
