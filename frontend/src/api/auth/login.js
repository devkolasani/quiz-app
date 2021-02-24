import axios from "axios";

const login = async (data) => {
	try {
		const res = await axios.post("http://localhost:4000/auth/login", data);
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default login;
