//Imports
import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

//Routes
import Header from "../components/_partials/Header";
import Login from "../components/Login/Login";
import User from "../components/User/User";
import Transaction from "../components/Transaction/Transaction";
import Error404 from "../components/404/Error404";

export default function AppRouter() {
	//logged user context
	const userContext = createContext();

	//logged user token verification
	const [userLogged, setUserLogged] = useState(() => {
		const user = localStorage.token;
		console.log(user);
		if (!user) return null;
		return user;
	});

	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/transaction" component={Transaction} />
				<Route exact path="/" exact component={User} />
				<Route path="*" component={Error404} />
				<Redirect to="/login" />
			</Switch>
		</Router>
	);
}
