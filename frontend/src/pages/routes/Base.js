// Libraries
import { useContext } from "react";
import { Redirect } from "react-router-dom";

//Contexts
import { AuthContext } from "../../contexts/AuthContext";

const Base = () => {
	const { auth } = useContext(AuthContext);

	if (auth.isLoggedIn) {
		return <Redirect to="/home" />;
	} else {
		return <Redirect to="/login" />;
	}
};

export default Base;
