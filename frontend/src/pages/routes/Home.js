// Libraries
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// API
import quizByDifficulty from "../../api/quiz/quizByDifficulty";

//Contexts
import { AuthContext } from "../../contexts/AuthContext";
import { QuizContext } from "../../contexts/QuizContext";

const Home = (props) => {
	const [formState, setFormState] = useState("EASY");

	const { auth } = useContext(AuthContext);
	const { setQuiz } = useContext(QuizContext);

	if (!auth.isLoggedIn) {
		if (auth.access_level === "ADMIN") {
			return <Redirect to="/admin" />;
		}
		return <Redirect to="/login" />;
	}

	const handleChange = (e) => {
		e.preventDefault();
		setFormState(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await quizByDifficulty(auth.token, formState);
		setQuiz({
			id: res.data.quiz_id,
			difficulty: res.data.difficulty_level,
			questions: res.data.questions,
			answers: [],
		});
		props.history.push("/quiz");
	};

	return (
		<section className="section is-medium">
			<div className="columns is-centered has-text-centered">
				<div className="column is-half is-centered">
					<p className="title">Home Page</p>
				</div>
			</div>
			<div className="columns is-centered py-6">
				<div className="column is-one-fifth has-text-centered">
					<div className="field">
						<div className="control">
							<div className="select">
								<select
									value={formState}
									onChange={handleChange}
								>
									<option>Easy</option>
									<option>Intermediate</option>
									<option>Hard</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div className="column is-one-fifth has-text-centered">
					<div className="field">
						<p className="control">
							<button
								className="button is-success"
								onClick={handleSubmit}
							>
								Start Quiz
							</button>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
