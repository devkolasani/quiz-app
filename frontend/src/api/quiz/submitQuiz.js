import axios from "axios";

const submitQuiz = async (token, id, answers) => {
	try {
		const res = await axios({
			method: "post",
			headers: { Authorization: `Bearer ${token}` },
			url: `http://localhost:4000/quiz/submitquiz`,
			data: {
				quiz_id: id,
				quiz_answers: answers,
			},
		});
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default submitQuiz;
