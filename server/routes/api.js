// server/routes/api.js
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const validateRequest = require("../middleware/validateRequest");
const chatController = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
	"/chat",
	validateRequest([
		body("message").notEmpty().withMessage("Message is required"),
	]),
	authMiddleware,
	chatController.getChatResponse
);

module.exports = router;

// var express = require("express");
// var router = express.Router();
// const { getChatResponse } = require("../services/openaiService");

// router.get("/", function (req, res) {
// 	res.send("respond with a resource");
// });

// router.post("/chat", async function (req, res) {
// 	try {
// 		const { chatId, message } = req.body;

// 		if (!chatId) {
// 			return res.status(400).json({ error: "chatId is required" });
// 		}
// 		if (!message) {
// 			return res.status(400).json({ error: "message is required" });
// 		}

// 		const reply = await getChatResponse(chatId, message);
// 		res.json({ reply });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: "Something went wrong with OpenAI API" });
// 	}
// });

// module.exports = router;
