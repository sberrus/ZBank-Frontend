//Imports
import { Route, Switch } from "react-router-dom";

//Routes
import Login from "../components/Login/Login";
import User from "../components/User/User";
import Transaction from "../components/Transaction/Transaction";

//Rutes Conditioning
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

//404 handler
import Error404 from "../components/404/Error404";

export default function AppRouter() {
	return (
		<Switch>
			{/* Rutas Públicas */}
			<PublicRoute exact path="/" component={Login} />
			{/* Rutas Privadas */}
			<PrivateRoute exact path="/dashboard" component={User} />
			<PrivateRoute exact path="/transaction" component={Transaction} />

			{/* 404 handlers */}
			<Route path="*" component={Login} />
		</Switch>
	);
}
