// Models
const Quiz = require("../models/quiz");
const Result = require("../models/result");

const quizController = {
	quizbydifficulty: async (req, res) => {
		res.status(200).send("Quizes I guess");
	},
};

module.exports = quizController;
