const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
	{
		user: { type: String, required: true },
		difficulty_level: {
			type: String,
			enum: ["EASY", "INTERMEDIATE", "HARD"],
			default: "EASY",
			required: true,
		},
		percentage: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
