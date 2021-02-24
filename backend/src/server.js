// Libraries
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

//Environment Variables Config
require("dotenv").config();

// Configure Database
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Initialize Express and Mongoose objects
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Routes
const authRouter = require("./routes/auth");
const quizRouter = require("./routes/quiz");

app.use("/auth", authRouter);
app.use("/quiz", quizRouter);

app.listen(process.env.PORT, () => console.log("Server Listening"));
