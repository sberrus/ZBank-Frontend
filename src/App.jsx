import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Header from "./components/_partials/Header";
import UserPanel from "./components/user-panel/UserPanel";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/user-panel" component={UserPanel} />
				<Route path="/" exact component={Login} />
				<Redirect to="/" />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
