// server/utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (res, user) => {
	const token = jwt.sign(
		{
			id: user._id,
			name: user.name,
			email: user.email,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "7d", // 7 days
		}
	);

	// Set JWT as an HTTP-Only cookie
	res.cookie("token", token, {
		httpOnly: true, // Prevent access from JavaScript
		secure: process.env.NODE_ENV === "production", // HTTPS in production
		sameSite: "strict", // CSRF protection
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});

	return token;
};

module.exports = generateToken;
