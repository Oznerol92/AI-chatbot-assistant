const openaiService = require("../services/openaiService");
const logger = require("../services/logger");

exports.getChatResponse = async (req, res, next) => {
	try {
		const { message, chatId } = req.body;
		console.log("getChatResponse");

		const userId = req.user.id; // Assuming auth middleware adds `req.user`

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
		next(err); // Pass to error middleware
	}
};
