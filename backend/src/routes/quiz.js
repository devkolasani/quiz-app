// Libraries
const router = require("express").Router();

//Controllers
const authController = require("../controllers/auth");
const quizController = require("../controllers/quiz");

router.get(
	"/quizbydifficulty",
	authController.verifyToken,
	quizController.quizbydifficulty
);

router.post(
	"/submitquiz",
	authController.verifyToken,
	quizController.submitquiz
);

router.post(
	"/createquiz",
	authController.verifyToken,
	authController.verifyAdminAccess,
	quizController.createquiz
);

module.exports = router;
