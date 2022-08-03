//Imports

//Routes
import Transactions from "../components/Transactions/Transactions";
import RegisterForm from "../pages/Register/RegisterForm";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Transaction from "../components/Transactions/Transaction";
import Dashboard from "../components/Dashboard/Dashboard";

//Rutes Conditioning
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

//404 handler
import Error404 from "../components/404/Error404";
import Index from "../pages/Index";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";

export default function AppRouter() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<Outlet />}>
				<Route index element={<Index />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<RegisterForm />} />
				<Route path="forgot-password" element={<ForgotPassword />} />

				{/* Private Routes */}
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/transactions" element={<Transactions />} />
				{/* <Route path="/transaction" element={<Transaction />} /> */}
			</Route>

			{/* 404 handlers */}
			<Route path="*">
				<Route element={<Error404 />} />
			</Route>
		</Routes>
	);
}
