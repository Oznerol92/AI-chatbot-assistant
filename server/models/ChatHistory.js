const mongoose = require("mongoose");

const ChatHistorySchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		chatId: { type: String, required: true },
		role: { type: String, enum: ["user", "assistant"], required: true },
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("ChatHistory", ChatHistorySchema);
