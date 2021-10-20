import React from "react";
import { Switch, Link, Route, Redirect } from "react-router-dom";
import "./Login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = () => {
	return (
		<div className="background">
			<div className="layer layer-top">
				<div className="logo-container d-flex align-content-center justify-content-center">
					<span>[logo]</span>
				</div>
				<div className="d-flex align-content-center justify-content-center">
					<Switch>
						<Route path="/register" component={RegisterForm} />
						<Route path="/forgot-password"></Route>
						<Route path="/" exact component={LoginForm} />
						<Redirect to="/" />
					</Switch>
				</div>
			</div>
			<div className="layer layer-bottom"></div>
		</div>
	);
};

export default Login;
