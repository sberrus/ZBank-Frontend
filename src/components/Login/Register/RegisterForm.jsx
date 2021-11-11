//Imports
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

//Components
import axios from "axios";
import UseAuth from "../../../Contexts/Auth/UseAuth";
import ErrorAlert from "./_Partials/ErrorAlert";

const RegisterForm = () => {
	//Contexto
	const auth = UseAuth();

	//useHistory
	const history = useHistory();

	//error logic states
	const [errorMsg, setErrorMsg] = useState(null);

	//react-form-hook
	const { register, handleSubmit } = useForm();

	useEffect(() => {
		const inputs = document.querySelectorAll("input");
		inputs.forEach((input) => {
			input.addEventListener("focus", () => {
				setErrorMsg(null);
			});
		});
		return () => {};
	}, []);

	const onSubmit = async ({
		username,
		password,
		passwordConfirm,
		invitationCode,
	}) => {
		console.log({ username, password, passwordConfirm, invitationCode });

		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/users",
			data: {
				username,
				password,
				passwordConfirm,
				invitationCode,
			},
		})
			.then(({ data }, e) => {
				e.preventDefault();
				console.log(data);
				//Enviar datos a auth y a localstorage
				// localStorage.setItem("token", data.token);
				localStorage.setItem("currentUser", JSON.stringify(data.user));
				auth.login(data.user);
				history.push("/dashboard");
				setErrorMsg(null);
			})
			.catch((err) => {
				const error =
					err.response?.data?.error ||
					err.response?.data[0]?.msg ||
					"Error al registrar al usuario - any";
				setErrorMsg(error);
			});
	};

	//handle errors
	const onError = (error) => {
		const errorStack = Object.keys(error);
		if (errorStack.includes("username")) {
			setErrorMsg("Nombre de Usuario Obligatorio");
		}
		if (errorStack.includes("password")) {
			setErrorMsg("Contraseña Obligatoria");
		}
		if (errorStack.includes("passwordConfirm")) {
			setErrorMsg("La contraseñas introducidas no coinciden");
		}
		if (errorStack.includes("invitationCode")) {
			setErrorMsg("ID Code de partida Obligatoria");
		}
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
							})}
							className="rounded"
						/>
					</div>
					{errorMsg && <ErrorAlert msg={errorMsg} type={"danger"} />}
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
