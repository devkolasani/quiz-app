const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
	{
		created_by_user: { type: String, required: true },
		difficulty_level: {
			type: String,
			enum: ["EASY", "INTERMEDIATE", "HARD"],
			default: "EASY",
			required: true,
		},
		questions: { type: mongoose.Schema.Types.Mixed, required: true },
		keys: [String],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
