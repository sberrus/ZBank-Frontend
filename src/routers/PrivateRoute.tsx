import React from "react";
import { Redirect } from "react-router-dom";
import UseAuth from "../context/Auth/UseAuth";

const PrivateRoute = ({ component: Component, ...props }) => {
	const auth = UseAuth();
	return auth.isLogged() ? <Component /> : <Redirect to="/" />;
};

export default PrivateRoute;
