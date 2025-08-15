const mongoose = require("mongoose");

const AssistantConfigSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		chatId: { type: String, required: true },
		name: { type: String, default: "Assistant" },
		persona: { type: String, default: "friendly AI assistant" },
		settings: {
			temperature: { type: Number, default: 0.7 },
			maxTokens: { type: Number, default: 1000 },
			model: { type: String, default: "gpt-4o-mini" },
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("AssistantConfig", AssistantConfigSchema);
