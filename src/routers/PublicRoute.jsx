//imports
import { Redirect } from "react-router-dom";

//context
const userLogged = false;

//TODO: Crear contexto de authenticación para manejar las rutas.
const PublicRoute = ({ component: Component, ...props }) => {
	return !userLogged ? <Component /> : <Redirect to="/dashboard" />;
};

export default PublicRoute;
