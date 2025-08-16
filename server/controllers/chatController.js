const openaiService = require("../services/openaiService");
const logger = require("../services/logger");
const Chat = require("../models/ChatHistory");

// Send a message to AI
exports.getChatResponse = async (req, res, next) => {
	try {
		const { message, chatId } = req.body;
		const userId = req.user.id;

		logger.info(
			`Received message from user ${userId} for chat ${chatId}: ${message}`
		);

		const aiResponse = await openaiService.getChatResponse(
			userId,
			chatId,
			message
		);

		logger.info(`AI response for chat ${chatId}: ${aiResponse}`);

		res.json({ reply: aiResponse });
	} catch (err) {
		logger.error("Error in getChatResponse:", err);
		next(err);
	}
};

// Fetch full chat history for the user
exports.getChatHistory = async (req, res, next) => {
	try {
		const userId = req.user.id;

		// Assuming Chat model stores messages with userId
		const chatHistory = await Chat.find({ user: userId }).sort({
			createdAt: 1,
		});

		res.json({ chatHistory });
	} catch (err) {
		logger.error("Error in getChatHistory:", err);
		next(err);
	}
};
