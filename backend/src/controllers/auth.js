// Libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/user");

const authController = {
	login: async (req, res) => {
		try {
			const user = await User.findOne({
				email: req.body.email,
			});

			// Verify if user exists
			if (!user) {
				return res.status(404).send("User doesn't exist");
			}

			// Compare passwords
			const validPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);
			if (!validPassword) {
				return res.status(401).send(" Wrong email or password");
			}

			// Generate access token
			const token = jwt.sign(
				{
					id: user._id,
					name: user.name,
					email: user.email,
					access_level: user.access_level,
				},
				process.env.ACCESS_TOKEN_SECRET
			);

			// Return access token
			res.status(202).send(token);
		} catch (err) {
			res.status(500).send({ error: err });
		}
	},
	register: async (req, res) => {
		try {
			// Verify if user doesn't exist
			const userAlreadyExists = await User.findOne({
				email: req.body.email,
			});
			if (userAlreadyExists) {
				return res.status(400).send("Email already used");
			}

			// Hashing password
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			// Create object based on user model
			const user = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
			});

			// Save document to database
			await user.save();

			// Return Success Message
			res.status(201).send();
		} catch (err) {
			res.status(500).send({ error: err });
		}
	},
	// Middleware
	verifyToken: async (req, res, next) => {
		try {
			// Extract access token
			const access_token = req.header("Authorization").split(" ")[1];

			// Check for a token
			if (!access_token) {
				return res.status(400).send(" Access token required ");
			}

			// Verify Token
			try {
				const verified = jwt.verify(
					access_token,
					process.env.ACCESS_TOKEN_SECRET
				);
				res.id = verified.id;
				res.access_level = verified.access_level;
			} catch (err) {
				return res.status(401).send(" Invalid token");
			}

			next();
		} catch (err) {
			res.status(500).send({ error: err });
		}
	},
	verifyAdminAccess: async (req, res, next) => {
		try {
			if (res.access_level != "ADMIN") {
				return res
					.status(401)
					.send(" User doesn't have admin privilages ");
			}

			next();
		} catch (err) {
			res.status(500).send({ error: err });
		}
	},
};

module.exports = authController;
