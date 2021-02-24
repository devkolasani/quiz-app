// Libraries
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styling
import "../styles/index.scss";

// Route components
import Base from "./routes/Base";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";

// Context Providers
import AuthContextProvider from "../contexts/AuthContext";

function App() {
	return (
		<Router>
			<Switch>
				<AuthContextProvider>
					<Route path="/" component={Base} exact />
					<Route path="/home" component={Home} exact />
					<Route path="/login" component={Login} exact />
					<Route path="/register" component={Register} exact />
				</AuthContextProvider>
			</Switch>
		</Router>
	);
}

export default App;
