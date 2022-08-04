//imports
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	return (
		<div className="container-fluid p-3 login-form-container">
			<div className="blur-bg"></div>
			<div className="login-form-body">
				<h3 className="text-center mb-5">Recuperar contraseña</h3>
				{/* ERROR MSG BADGET */}
				<form action="">
					<div className="mb-3 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							ID Usuario
						</label>
						<input type="text" name="username" id="userID" autoComplete="off" className="rounded" />
					</div>
					<div className="mb-4 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							ID Cuenta
						</label>
						<input type="password" name="password" id="password" className="rounded" />
					</div>

					<div className="d-flex flex-column w-75 m-auto">
						<button className="btn btn-dark float-end mb-1 float-end">Recuperar contraseña</button>

						<Link to="/register" className="text-center mt-3">
							¿No tienes cuenta? Registrate
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
