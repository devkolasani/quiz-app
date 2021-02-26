// Libraries
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// API
import submitQuiz from "../../api/quiz/submitQuiz";

//Contexts
import { AuthContext } from "../../contexts/AuthContext";
import { QuizContext } from "../../contexts/QuizContext";

const Quiz = (props) => {
	const { quiz } = useContext(QuizContext);
	const { auth } = useContext(AuthContext);

	const [qnum, setQnum] = useState(0);
	const [answers, setAnswers] = useState(Array(20).join(".").split("."));

	if (quiz.id === "") {
		return <Redirect to="/home" />;
	}

	const handleChange = (e) => {
		let tempAnswers = answers;
		tempAnswers[qnum] = e.target.value;
		setAnswers(tempAnswers);
	};

	const handleNext = (e) => {
		e.preventDefault();
		if (qnum < 19) {
			setQnum(qnum + 1);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitQuiz(auth.token, quiz.id, answers);
		props.history.push("/home");
	};

	return (
		<section className="section is-medium">
			<div className="columns is-centered has-text-centered">
				<div className="column is-half">
					<p className="title">Quiz page</p>
				</div>
			</div>
			<div className="columns is-centered has-text-left py-6">
				<div className="column is-half">
					<div className="field">
						<form className="control" onChange={handleChange}>
							<p className="subtitle">
								{qnum + 1})&nbsp;&nbsp;
								{quiz.questions[qnum].question}
							</p>
							<label className="radio py-2">
								<input
									type="radio"
									name="option"
									className="mr-2"
									value="A"
									// checked={answers[qnum] === "A"}
								/>
								{quiz.questions[qnum].options[0]}
							</label>
							<br />
							<label className="radio py-2">
								<input
									type="radio"
									name="option"
									className="mr-2"
									value="B"
									// checked={answers[qnum] === "B"}
								/>
								{quiz.questions[qnum].options[1]}
							</label>
							<br />
							<label className="radio py-2">
								<input
									type="radio"
									name="option"
									className="mr-2"
									value="C"
									// checked={answers[qnum] === "C"}
								/>
								{quiz.questions[qnum].options[2]}
							</label>
							<br />
							<label className="radio py-2">
								<input
									type="radio"
									name="option"
									className="mr-2"
									value="D"
									// checked={answers[qnum] === "D"}
								/>
								{quiz.questions[qnum].options[3]}
							</label>
						</form>
					</div>
				</div>
			</div>
			<div className="columns is-centered has-text-left">
				<div className="column is-one-fifth ">
					<button
						className="button is-dark mr-6"
						onClick={handleNext}
					>
						Next
					</button>
					<button
						className="button is-dark ml-6"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</div>
		</section>
	);
};

export default Quiz;
