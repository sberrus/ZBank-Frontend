import React from "react";
import { Link } from "react-router-dom";
const LoginForm = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Relajate vale ¿Porqué eres así?");
	};

	return (
		<div className="container-fluid w-75 py-4 login-form-container">
			<div className="blur-bg"></div>
			<div className="login-form-body">
				<h3 className="text-center mb-5">Bienvenido</h3>
				<form action="" onSubmit={handleSubmit}>
					<div className="mb-3 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							ID Usuario
						</label>
						<input
							type="text"
							name=""
							id="userID"
							className="rounded"
						/>
					</div>
					<div className="mb-4 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Contraseña
						</label>
						<input
							type="password"
							name=""
							id="password"
							className="rounded"
						/>
						<Link
							to="/forgot-password"
							className="text-end mt-1"
							title="La mariguana empeora la memoria a corto plazo ¿sabias?"
						>
							¿Olvidaste tu contraseña?
						</Link>
					</div>
					<div className="d-flex flex-column w-75 m-auto">
						<button className="btn btn-primary float-end mb-1 float-end">
							Entrar
						</button>

						<Link to="/register" className="text-center">
							¿No tienes cuenta menor? Registrate
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
