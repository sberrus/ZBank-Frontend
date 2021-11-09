//imports
import { Redirect } from "react-router-dom";
import UseAuth from "../Contexts/Auth/UseAuth";

//context

const PublicRoute = ({ component: Component }) => {
	const auth = UseAuth();
	return !auth.isLogged() ? <Component /> : <Redirect to="/dashboard" />;
};

export default PublicRoute;
