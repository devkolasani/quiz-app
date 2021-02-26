import axios from "axios";

const quizByDifficulty = async (token, difficulty) => {
	try {
		const res = await axios({
			method: "get",
			headers: { Authorization: `Bearer ${token}` },
			url: `http://localhost:4000/quiz/quizbydifficulty?difficulty_level=${difficulty}`,
		});
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default quizByDifficulty;
