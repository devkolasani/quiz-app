//Libraries
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// API
import login from "../../api/auth/login";

// Context
import { AuthContext } from "../../contexts/AuthContext";

const Login = (props) => {
	const [formState, setFormState] = useState({
		email: "name@mail.com",
		password: "Password",
	});

	const { setAuth } = useContext(AuthContext);

	const handleEmailChange = (e) => {
		setFormState({ ...formState, email: e.target.value });
	};

	const handlePasswordChange = (e) => {
		setFormState({ ...formState, password: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await login(formState);
		console.log(res.data);
		setAuth({
			name: res.data.name,
			token: res.data.auth_token,
			isLoggedIn: true,
		});
		props.history.push("/home");
	};

	return (
		<section className="section is-medium">
			<div className="columns is-centered">
				<div className="column is-one-third">
					<p className="title">Login to Quiz App</p>
				</div>
			</div>
			<div className="columns is-centered">
				<form className="column is-one-third">
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
							<input
								type="email"
								className="input"
								value={formState.email}
								onChange={(e) => handleEmailChange(e)}
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
								onChange={(e) => handlePasswordChange(e)}
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
								Login
							</button>
						</p>
					</div>
				</form>
			</div>
			<div className="columns is-centered">
				<div className="column is-one-third">
					<p className="is-2">
						Don't have an account?
						<Link to="/register"> Register</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Login;
