const OpenAI = require("openai");
require("dotenv").config();
const ChatHistory = require("../models/ChatHistory");
const logger = require("./logger");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getChatResponse(userId, chatId, message, model = "gpt-4o-mini") {
	try {
		// Save user message in DB
		const userMsg = await ChatHistory.create({
			userId,
			chatId,
			role: "user",
			content: message,
		});
		logger.info(`Saved user message: ${JSON.stringify(userMsg)}`);

		// Get chat history from DB
		const historyDocs = await ChatHistory.find({ chatId }).sort({
			createdAt: 1,
		});
		const history = historyDocs.map((doc) => ({
			role: doc.role,
			content: doc.content,
		}));

		logger.info(`Chat history for ${chatId}: ${JSON.stringify(history)}`);

		// Send to OpenAI
		const response = await client.chat.completions.create({
			model,
			messages: history,
		});

		const assistantMessage = response.choices[0].message.content;

		// Save assistant message
		const assistantMsg = await ChatHistory.create({
			userId,
			chatId,
			role: "assistant",
			content: assistantMessage,
		});
		logger.info(`Saved assistant message: ${JSON.stringify(assistantMsg)}`);

		return assistantMessage;
	} catch (err) {
		logger.error("OpenAI API Error:", err);
		throw new Error("Failed to get chat response");
	}
}

async function resetChat(chatId) {
	await ChatHistory.deleteMany({ chatId });
	logger.info(`Reset chat history for chatId ${chatId}`);
}

module.exports = { getChatResponse, resetChat };

// const OpenAI = require("openai");
// require("dotenv").config();

// const client = new OpenAI({
// 	apiKey: process.env.OPENAI_API_KEY,
// });

// // Store chats in memory (key = chatId, value = message history)
// const chats = {};

// // Get or create a chat's history
// function getChatHistory(chatId) {
// 	if (!chats[chatId]) {
// 		chats[chatId] = [];
// 	}
// 	return chats[chatId];
// }

// // Add a message to a chat
// function addMessageToChat(chatId, role, content) {
// 	const history = getChatHistory(chatId);
// 	history.push({ role, content });
// }

// // Get a ChatGPT-like response for a specific chat
// async function getChatResponse(chatId, message) {
// 	// Add the user's message to history
// 	addMessageToChat(chatId, "user", message);

// 	// Send the full conversation for that chat
// 	const response = await client.chat.completions.create({
// 		model: "gpt-4o-mini", // Change to "gpt-5" if needed
// 		messages: getChatHistory(chatId),
// 	});

// 	// Extract assistant's reply
// 	const assistantMessage = response.choices[0].message.content;

// 	// Add assistant's reply to history
// 	addMessageToChat(chatId, "assistant", assistantMessage);

// 	return assistantMessage;
// }

// // Reset a specific chat's conversation
// function resetChat(chatId) {
// 	delete chats[chatId];
// }

// module.exports = { getChatResponse, resetChat };
