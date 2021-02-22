// Libraries
const router = require("express").Router();

const authController = require("../controllers/auth");
//Controllers
const quizController = require("../controllers/quiz");

router.get(
	"/quizbydifficulty",
	authController.verifyToken,
	quizController.quizbydifficulty
);

module.exports = router;
