//imports
import { Route, Routes } from "react-router-dom";
//Components
import LoginForm from "./LoginForm";
//Styles
import "./Login.scss";
//assets
import RegisterForm from "../Register/RegisterForm";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import LoginTemplate from "../../templates/LoginTemplate";

const Login = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginTemplate />}>
				<Route index element={<LoginForm />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Route>
		</Routes>
	);
};

export default Login;
