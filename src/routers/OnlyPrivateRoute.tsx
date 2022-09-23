// imports
import UseAuth from "@context/Auth/UseAuth";
// context
import { Navigate, Outlet } from "react-router-dom";

const OnlyPrivateRoute = () => {
	const auth = UseAuth();
	return auth?.isLogged() ? <Outlet /> : <Navigate to="/" />;
};

export default OnlyPrivateRoute;
