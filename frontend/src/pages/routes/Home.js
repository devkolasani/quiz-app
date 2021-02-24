// Libraries
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

//Contexts
import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {
	const [formState, setFormState] = useState("EASY");

	const { auth } = useContext(AuthContext);

	if (!auth.isLoggedIn) {
		return <Redirect to="/login" />;
	}

	const handleChange = (e) => {
		e.preventDefault();
		setFormState(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
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
