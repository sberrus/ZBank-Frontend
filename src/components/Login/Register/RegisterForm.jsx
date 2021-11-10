//Imports
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

//Components
import ErrorPopUp from "../../_partials/ErrorPopUp/ErrorPopUp";
import axios from "axios";
import UseAuth from "../../../Contexts/Auth/UseAuth";

const RegisterForm = () => {
	//Contexto
	const auth = UseAuth();

	//useHistory
	const history = useHistory();

	//error logic states
	const [errorMsg, setErrorMsg] = useState(null);

	//react-form-hook
	const { register, handleSubmit } = useForm();

	const onSubmit = async ({ username, password }) => {
		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/users",
			data: {
				username,
				password,
			},
		})
			.then(({ data }) => {
				console.log(data);
				//Enviar datos a auth y a localstorage
				// localStorage.setItem("token", data.token);
				localStorage.setItem("currentUser", JSON.stringify(data.user));
				auth.login(data.user);
				history.push("/dashboard");
			})
			.catch((err) => {
				console.log(err);
				setErrorMsg("Algun error del servidor");
			});
		console.log(username, password);
		setErrorMsg(null);
	};

	//handle errors
	const onError = (error, e) => {
		const errorStack = Object.keys(error).reverse();
		if (errorStack.includes("username")) {
			setErrorMsg("Nombre de Usuario Obligatorio");
		}
		if (errorStack.includes("password")) {
			setErrorMsg("Contraseña Obligatori");
		}
		if (errorStack.includes("passwordConfirm")) {
			setErrorMsg("La contraseñas introducidas no coinciden");
		}
		if (errorStack.includes("invitationCode")) {
			console.log(error);
			setErrorMsg("ID Code de partida Obligatoria");
		}
		var toastLiveExample = document.getElementById("liveToast");
		var toast = new bootstrap.Toast(toastLiveExample);
		toast.show();
	};

	useEffect(() => {
		return () => {};
	}, []);

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
