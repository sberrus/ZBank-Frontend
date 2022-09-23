// imports
import { Navigate, Outlet } from "react-router-dom";
// context
import UseAuth from "@context/Auth/UseAuth";

//
const OnlyPublicRoute = () => {
	const auth = UseAuth();
	return auth?.isLogged() ? <Navigate to="/app" /> : <Outlet />;
};

export default OnlyPublicRoute;
