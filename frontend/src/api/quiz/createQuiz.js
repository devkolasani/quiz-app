import axios from "axios";

const createQuiz = async (token, quizdata) => {
	try {
		const res = await axios({
			method: "post",
			headers: { Authorization: `Bearer ${token}` },
			url: "http://localhost:4000/quiz/createquiz",
			data: JSON.parse(quizdata),
		});
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default createQuiz;
