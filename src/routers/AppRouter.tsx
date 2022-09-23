//Imports
import { Navigate, Route, Routes } from "react-router-dom";

//Routes
import Transactions from "../pages/Transactions/Transactions";
// TODO: work in transaction page
// import Transaction from "../components/Transactions/Transaction";
import Dashboard from "../pages/Dashboard/Dashboard";

//404 handler
import Index from "../pages/Index";
import MainTemplate from "../templates/MainTemplate";
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import OnlyPublicRoute from "./OnlyPublicRoute";
import OnlyPrivateRoute from "./OnlyPrivateRoute";

export default function AppRouter() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<MainTemplate />}>
				<Route index element={<Index />} />
				{/* only public routes */}
				<Route path="auth" element={<OnlyPublicRoute />}>
					<Route path="login" element={<LoginForm />} />
					<Route path="register" element={<RegisterForm />} />
					<Route path="forgot-password" element={<ForgotPassword />} />
				</Route>

				{/* Private Routes */}
				<Route path="app" element={<OnlyPrivateRoute />}>
					<Route index element={<Dashboard />} />
					<Route path="transactions" element={<Transactions />} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Route>
		</Routes>
	);
}
