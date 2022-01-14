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
		<div id="background" className="container-fluid">
			<div id="wraper" className="row vh-100 position-relative">
				<div id="decorationLayer" className="position-absolute vh-100">
					<div>
						<svg width="1000" height="1000" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<pattern
									id="pattern"
									patternUnits="userSpaceOnUse"
									width="25"
									height="25"
									viewBox="0 0 100 100"
									fill="#212121"
								>
									<line x1="50" y1="0" x2="50" y2="100" stroke="#212121" stroke-width="10" />
									<line x1="0" y1="50" x2="100" y2="50" stroke="#212121" stroke-width="10" />
								</pattern>

								<clipPath id="shape">
									<path
										fill="currentColor"
										d="M750,750Q500,1000,250,750Q0,500,250,250Q500,0,750,250Q1000,500,750,750Z"
									></path>
								</clipPath>
							</defs>

							<g clip-path="url(#shape)">
								<path
									fill="url(#pattern)"
									d="M750,750Q500,1000,250,750Q0,500,250,250Q500,0,750,250Q1000,500,750,750Z"
								/>
							</g>
						</svg>
					</div>
				</div>
				<section id="desktop-layer" className="d-none d-lg-block col-lg-4 bg-secondary"></section>
				<section id="loginForm" className="col-12 col-lg-8">
					<div className="col-12 col-md-8 col-xl-6 m-auto h-100 d-flex flex-column justify-content-center">
						<div className="d-flex px-4 border rounded" id="loginWrapper">
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
