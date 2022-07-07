//imports
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

//Components
import LoginForm from "./LoginForm";
import RegisterForm from "./Register/RegisterForm";

//Styles
import "./Login.scss";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

//assets
import Blob from "../../static/blob.svg";

const Login = (props) => {
	return (
		<div id="background" className="container-fluid">
			<div id="wraper" className="row vh-100 position-relative">
				<div id="decorationLayer" className="position-absolute vh-100">
					<div>
						<img src={Blob} alt="Blob background" />
					</div>
				</div>
				<section id="loginForm" className="col-12 col-lg-12">
					<div className="col-12 col-md-6 col-lg-5 col-xl-4 m-auto h-100 d-flex flex-column justify-content-center">
						<div className="d-flex border rounded position-relative" id="loginWrapper">
							<div className="position-absolute" id="blurLayer"></div>
							<Switch>
								<Route path="/register" component={RegisterForm} />
								<Route path="/forgot-password" component={ForgotPassword} />
								<Route path="/" exact component={LoginForm} props={props} />
								<Redirect to="/" />
							</Switch>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default withRouter(Login);
