//Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

//Components
import ErrorPopUp from "../_partials/ErrorPopUp/ErrorPopUp";

const RegisterForm = () => {
	const [errorMsg, setErrorMsg] = useState(null);
	const { register, handleSubmit } = useForm();

	const onSubmit = (data, e) => {
		console.log(data, e);
		setErrorMsg(null);
	};
	const onError = (error, e) => {
		const errorStack = Object.keys(error).reverse();
		if (errorStack.includes("username")) {
			setErrorMsg("Nombre de Usuario Obligatorio");
		}
		if (errorStack.includes("password")) {
			setErrorMsg("Contraseña Obligatori");
		}
		if (errorStack.includes("passwordConfirm")) {
			setErrorMsg("Debe introducir una confirmación");
		}
		if (errorStack.includes("invitationCode")) {
			setErrorMsg("ID Code de partida Obligatoria");
		}
		var toastLiveExample = document.getElementById("liveToast");
		var toast = new bootstrap.Toast(toastLiveExample);
		toast.show();
	};

	return (
		<div className="container w-75 py-4 login-form-container">
			<div className="login-form-body">
				<Link to="/" className="text-start mb-1 d-block">
					Volver a Login
				</Link>
				<h3 className="text-center mb-5">Registrarse</h3>
				<form action="" onSubmit={handleSubmit(onSubmit, onError)}>
					<div className="mb-3 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Nombre de usuario
						</label>
						<input
							type="text"
							{...register("username", {
								required: true,
								maxLength: 15,
							})}
							className="rounded"
						/>
					</div>
					<div className="mb-4 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Contraseña
						</label>
						<input
							type="password"
							{...register("password", {
								required: true,
								maxLength: 20,
								minLength: 5,
							})}
							className="rounded"
						/>
					</div>
					<div className="mb-4 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Confirmar contraseña
						</label>
						<input
							type="password"
							{...register("passwordConfirm", {
								required: true,
								maxLength: 20,
								minLength: 5,
							})}
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
							{...register("invitationCode", {
								required: true,
								minLength: 4,
								maxLength: 4,
							})}
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
			{errorMsg && <ErrorPopUp msg={{ body: errorMsg }} />}
		</div>
	);
};

export default RegisterForm;
