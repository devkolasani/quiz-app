const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		access_level: {
			type: String,
			enum: ["USER", "ADMIN"],
			default: "USER",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
