const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({ error: "Not authorized" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select("-password");
		next();
	} catch (err) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}
};

// const jwt = require("jsonwebtoken");
// const logger = require("../services/logger");
// require("dotenv").config();

// module.exports = (req, res, next) => {
// 	const token = req.headers.authorization?.split(" ")[1];

// 	if (!token) {
// 		logger.warn("No JWT token provided");
// 		return res.status(401).json({ error: "No token provided" });
// 	}

// 	try {
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);
// 		req.user = decoded; // attach user info to request
// 		logger.info(`JWT verified for userId: ${decoded.id || "unknown"}`);
// 		next();
// 	} catch (err) {
// 		logger.error(`JWT verification failed: ${err.message}`);
// 		return res.status(401).json({ error: "Invalid token" });
// 	}
// };
