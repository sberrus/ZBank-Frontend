import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
	return (
		<div className="container w-75 py-4 login-form-container">
			<div className="login-form-body">
				<Link to="/" className="text-start mb-1 d-block">
					Volver a Login
				</Link>
				<h3 className="text-center mb-5">Registrarse</h3>
				<form action="">
					<div className="mb-3 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Nombre de usuario
						</label>
						<input type="text" name="" id="" className="rounded" />
					</div>
					<div className="mb-4 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Contraseña
						</label>
						<input
							type="password"
							name=""
							id=""
							className="rounded"
						/>
					</div>
					<div className="mb-4 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Confirmar contraseña
						</label>
						<input
							type="password"
							name=""
							id=""
							className="rounded"
						/>
					</div>
					<div className="mb-4 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Código de invitación
						</label>
						<input
							type="number"
							inputMode="numeric"
							name=""
							id=""
							className="rounded"
						/>
					</div>
					<div className="d-flex flex-column w-50 m-auto">
						<button className="btn btn-primary float-end mb-1 float-end">
							Registrarse
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
