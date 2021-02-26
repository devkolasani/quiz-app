// Libraries
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styling
import "../styles/index.scss";

// Route components
import Base from "./routes/Base";
import Home from "./routes/Home";
import Quiz from "./routes/Quiz";
import Admin from "./routes/Admin";
import Login from "./routes/Login";
import Register from "./routes/Register";

// Context Providers
import AuthContextProvider from "../contexts/AuthContext";
import QuizContextProvider from "../contexts/QuizContext";

function App() {
	return (
		<Router>
			<Switch>
				<AuthContextProvider>
					<Route path="/" component={Base} exact />
					<Route path="/login" component={Login} exact />
					<Route path="/register" component={Register} exact />
					<QuizContextProvider>
						<Route path="/home" component={Home} exact />
						<Route path="/quiz" component={Quiz} exact />
						<Route path="/admin" component={Admin} exact />
					</QuizContextProvider>
				</AuthContextProvider>
			</Switch>
		</Router>
	);
}

export default App;
