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
				quiz_id: randomQuiz[0]._id,
				difficulty_level: randomQuiz[0].difficulty_level,
				questions: randomQuiz[0].questions,
			});
		} catch (err) {
			res.status(500).send({ error: err });
		}
	},
	submitquiz: async (req, res) => {
		try {
			// Calculating result
			const quizID = req.body.quiz_id;
			const quiz = await Quiz.findById(quizID).exec();
			const quizAnswers = req.body.quiz_answers;
			const quizKey = quiz.keys;
			let correctAnswerCount = 0;
			for (let index = 0; index < quizKey.length; index++) {
				if (quizKey[index] == quizAnswers[index]) {
					correctAnswerCount += 1;
				}
			}
			const resultPerc = (correctAnswerCount / quizKey.length) * 100;

			// Create object based on Result model
			const result = new Result({
				user: res.id,
				quiz_id: quizID,
				difficulty_level: quiz.difficulty_level,
				percentage: resultPerc,
			});

			//Save document to database
			const savedResult = await result.save();

			//Return success message
			res.status(201).send(savedResult);
		} catch (err) {
			res.status(500).send({ error: err });
		}
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
