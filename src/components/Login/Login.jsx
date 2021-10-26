import React from "react";
import {
	Switch,
	Link,
	Route,
	Redirect,
	BrowserRouter as Router,
} from "react-router-dom";
import "./Login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = () => {
	return (
		<div id="background">
			{/**
			 * //todo: Solucionar problema con las vistas en pantallas grandes. El componente de los forms no se renderiza correctamente. Ver si un absolute soluciona el peo :v
			 */}
			<div className="layer layer-top"></div>
			<section className="position-absolute col-12" id="loginForm">
				<div className="logo-container d-flex align-content-center justify-content-center">
					<span>[logo]</span>
				</div>
				<div className="d-flex align-content-center justify-content-center">
					<Router>
						<Switch>
							<Route path="/register" component={RegisterForm} />
							<Route path="/forgot-password">
								<div className="text-center">
									[Proximamente] <br />
									[insertar imagen graciosa]
									<br />
									<Link
										to="/"
										className="d-block mt-5 display-5"
									>
										vuelve puto
									</Link>
								</div>
							</Route>
							<Route path="/" exact component={LoginForm} />
							<Redirect to="/" />
						</Switch>
					</Router>
				</div>
			</section>
			<div className="layer layer-bottom"></div>
		</div>
	);
};

export default Login;
