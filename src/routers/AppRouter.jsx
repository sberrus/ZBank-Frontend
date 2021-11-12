//Imports
import { Route, Switch } from "react-router-dom";

//Routes
import Login from "../components/Login/Login";
import User from "../components/User/User";
import Transactions from "../components/Transactions/Transactions";
import RegisterForm from "../components/Login/Register/RegisterForm";
import ForgotPassword from "../components/Login/ForgotPassword/ForgotPassword";
import Transaction from "../components/Transactions/Transaction";

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
			<PublicRoute exact path="/register" component={RegisterForm} />
			<PublicRoute
				exact
				path="/forgot-password"
				component={ForgotPassword}
			/>
			{/* Rutas Privadas */}
			<PrivateRoute exact path="/dashboard" component={User} />
			<PrivateRoute exact path="/transactions" component={Transactions} />
			<PrivateRoute exact path="/transaction" component={Transaction} />

			{/* 404 handlers */}
			<Route path="*">
				<Route component={Error404} />
			</Route>
		</Switch>
	);
}
