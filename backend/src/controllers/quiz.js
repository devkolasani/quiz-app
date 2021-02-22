// Models
const Quiz = require("../models/quiz");
const Result = require("../models/result");

const quizController = {
	quizbydifficulty: async (req, res) => {
		try {
			const randomQuiz = await Quiz.aggregate()
				.match({
					difficulty_level: req.body.difficulty_level,
				})
				.sample(1);

			res.status(200).send({
				difficulty_level: randomQuiz[0].difficulty_level,
				questions: randomQuiz[0].questions,
			});
		} catch (err) {
			res.status(500).send({ error: err });
		}
	},
	submitquiz: async (req, res) => {
		res.status(200).send("Quizes I guess");
	},
	createquiz: async (req, res) => {
		try {
			// Create object based on Quiz model
			const quiz = new Quiz({
				created_by_user: res.id,
				difficulty_level: req.body.difficulty_level,
				questions: req.body.questions,
				keys: req.body.keys,
			});

			// Save document to database
			const savedQuiz = await quiz.save();

			// Return Success Message
			res.status(201).send(savedQuiz);
		} catch (err) {
			res.status(500).send({ error: err });
		}
	},
};

module.exports = quizController;
