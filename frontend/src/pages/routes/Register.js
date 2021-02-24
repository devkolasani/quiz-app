//Libraries
import { useState } from "react";
import { Link } from "react-router-dom";

// API
import register from "../../api/auth/register";

const Register = (props) => {
	const [formState, setFormState] = useState({
		name: "name",
		email: "name@mail.com",
		password: "Password",
	});

	const handleNameChange = (e) => {
		setFormState({ ...formState, name: e.target.value });
	};

	const handleEmailChange = (e) => {
		setFormState({ ...formState, email: e.target.value });
	};

	const handlePasswordChange = (e) => {
		setFormState({ ...formState, password: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await register(formState);
		props.history.push("/login");
	};

	return (
		<section className="section is-medium">
			<div className="columns is-centered">
				<div className="column is-one-third">
					<p className="title">Register to Quiz App</p>
				</div>
			</div>
			<div className="columns is-centered">
				<form className="column is-one-third">
					<div className="field">
						<label className="label">Name</label>
						<div className="control">
							<input
								type="text"
								className="input"
								value={formState.name}
								onChange={handleNameChange}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
							<input
								type="email"
								className="input"
								value={formState.email}
								onChange={handleEmailChange}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Password</label>
						<div className="control">
							<input
								type="password"
								className="input"
								value={formState.password}
								onChange={handlePasswordChange}
							/>
						</div>
						<p className="help"></p>
					</div>
					<div className="field">
						<p className="control">
							<button
								className="button is-success"
								onClick={handleSubmit}
							>
								Register
							</button>
						</p>
					</div>
				</form>
			</div>
			<div className="columns is-centered">
				<div className="column is-one-third">
					<p className="is-2">
						Already registered?
						<Link to="/login"> Log in</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Register;
