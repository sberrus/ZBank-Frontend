//imports
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

//Components
import LoginForm from "./LoginForm";
import RegisterForm from "./Register/RegisterForm";
//Styles
import "./Login.css";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

const Login = (props) => {
	return (
		<div id="background">
			<div className="layer layer-top"></div>
			<section className="position-absolute col-12" id="loginForm">
				<div className="logo-container d-flex align-content-center justify-content-center">
					<span>[logo]</span>
				</div>
				<div className="d-flex align-content-center justify-content-center">
					<Switch>
						<Route path="/register" component={RegisterForm} />
						<Route
							path="/forgot-password"
							component={ForgotPassword}
						/>
						<Route
							path="/"
							exact
							component={LoginForm}
							props={props}
						/>
						<Redirect to="/" />
					</Switch>
				</div>
			</section>
			<div className="layer layer-bottom"></div>
		</div>
	);
};

export default withRouter(Login);
