// Libraries
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// API
import createQuiz from "../../api/quiz/createQuiz";

//Contexts
import { AuthContext } from "../../contexts/AuthContext";

const Admin = (props) => {
	const [quiz, setQuiz] = useState({});

	const { auth } = useContext(AuthContext);

	if (!auth.isLoggedIn) {
		return <Redirect to="/login" />;
	}

	const handleUpload = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
			setQuiz(e.target.result);
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createQuiz(auth.token, quiz);
		props.history.push("/admin");
	};

	return (
		<section className="section is-medium">
			<div className="columns is-centered has-text-centered">
				<div className="column is-half is-centered">
					<p className="title">Admin page</p>
				</div>
			</div>
			<div className="columns is-centered has-text-centered py-6">
				<div className="column is-half is-centered">
					<div className="file is-primary is-centered">
						<label className="file-label">
							<input
								type="file"
								name="questions"
								className="file-input"
								onChange={handleUpload}
							/>
							<span className="file-cta">
								<span className="file-label">Select file</span>
							</span>
						</label>
					</div>
				</div>
			</div>
			<div className="columns is-centered has-text-centered py-4">
				<div className="column is-half is-centered">
					<div className="field">
						<p className="control">
							<button
								className="button is-success"
								onClick={handleSubmit}
							>
								Submit
							</button>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Admin;
