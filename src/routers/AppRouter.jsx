import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/_partials/Header";
import Login from "../components/Login/Login";
import User from "../components/User/User";
import Transaction from "../components/Transaction/Transaction";
import Error404 from "../components/404/Error404";
export default function AppRouter() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/transaction" component={Transaction} />
				<Route exact path="/user" component={User} />
				<Route exact path="/" component={Login} />
				<Route path="*" component={Error404} />
			</Switch>
		</Router>
	);
}
