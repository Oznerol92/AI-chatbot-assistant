const jwt = require("jsonwebtoken");
const logger = require("../services/logger");
require("dotenv").config();

module.exports = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		logger.warn("No JWT token provided");
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // attach user info to request
		logger.info(`JWT verified for userId: ${decoded.id || "unknown"}`);
		next();
	} catch (err) {
		logger.error(`JWT verification failed: ${err.message}`);
		return res.status(401).json({ error: "Invalid token" });
	}
};
