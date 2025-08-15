const mongoose = require("mongoose");
const logger = require("../services/logger");
require("dotenv").config();

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		logger.info(`MongoDB connected: ${conn.connection.host}`);
	} catch (err) {
		logger.error(`MongoDB connection error: ${err.message}`);
		process.exit(1); // Exit process with failure
	}
};

module.exports = connectDB;
