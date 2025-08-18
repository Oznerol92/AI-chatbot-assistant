const mongoose = require("mongoose");
const openaiService = require("../services/openaiService");
const logger = require("../services/logger");
const ChatHistory = require("../models/ChatHistory");

// Send a message to AI
exports.getChatResponse = async (req, res, next) => {
	try {
		let { message, chatId } = req.body;
		const userId = req.user.id;

		if (!chatId) {
			chatId = new mongoose.Types.ObjectId().toString();
			logger.info(`Started new conversation ${chatId} for user ${userId}`);
		}

		// Let the service handle saving & AI call
		const aiResponse = await openaiService.getChatResponse(
			userId,
			chatId,
			message
		);

		// Return updated conversation
		res.json({ chatId, reply: aiResponse });
	} catch (err) {
		logger.error("Error in getChatResponse:", err);
		next(err);
	}
};

// Fetch full chat history for the user
exports.getChatHistory = async (req, res, next) => {
	try {
		const userId = req.user.id;

		// Fetch all messages across all conversations for this user
		const chatHistory = await ChatHistory.find({ userId }).sort({
			createdAt: 1,
		});

		res.json({ chatHistory });
	} catch (err) {
		logger.error("Error in getChatHistory:", err);
		next(err);
	}
};
