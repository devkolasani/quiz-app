// Libraries
import React, { createContext, useState } from "react";

// Auth Context
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const [auth, setAuth] = useState({
		name: "",
		token: "",
		isLoggedIn: false,
	});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
