// Libraries
import React, { createContext, useState } from "react";

// Quiz Context
export const QuizContext = createContext();

const QuizContextProvider = (props) => {
	const [quiz, setQuiz] = useState({
		id: "",
		difficulty: "",
		questions: [],
		answers: [],
	});

	return (
		<QuizContext.Provider value={{ quiz, setQuiz }}>
			{props.children}
		</QuizContext.Provider>
	);
};

export default QuizContextProvider;
