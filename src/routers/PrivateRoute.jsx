import React from "react";
import { Redirect } from "react-router-dom";

const userLogged = false;

const PrivateRoute = ({ component: Component, ...props }) => {
	return userLogged ? <Component /> : <Redirect to="/login" />;
};

export default PrivateRoute;
