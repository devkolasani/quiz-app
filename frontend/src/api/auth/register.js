import axios from "axios";

const register = async (data) => {
	try {
		const res = await axios.post(
			"http://localhost:4000/auth/register",
			data
		);
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default register;
