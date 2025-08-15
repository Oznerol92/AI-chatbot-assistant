const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: { type: String, required: true },
		description: { type: String },
		dueDate: { type: Date, required: true },
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Reminder", ReminderSchema);
