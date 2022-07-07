//Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

//Components
import axios from "axios";
import ErrorAlert from "./components/ErrorAlert";

const RegisterForm = () => {
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

	const onSubmit = async ({ username, password, passwordConfirm }) => {
		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/users",
			data: {
				username: username.toLowerCase(),
				password,
				passwordConfirm,
			},
		})
			.then(() => {
				setErrorMsg(null);
			})
			.catch((err) => {
				console.log(err.response);
				const error =
					err.response?.data?.error || err.response?.data[0]?.msg || "Error al registrar al usuario - any";
				setErrorMsg(error);
			});
	};

	//handle errors
	const onError = (error) => {
		console.log(error);
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
							max="15"
							autoComplete="off"
							{...register("username", {
								required: true,
								maxLength: 15,
							})}
						/>
					</div>
					<div className="mb-4 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Contraseña
						</label>
						<input
							type="password"
							min="5"
							max="20"
							autoComplete="off"
							{...register("password", {
								required: true,
								maxLength: 20,
								minLength: 5,
							})}
						/>
					</div>
					<div className="mb-4 d-flex justify-content-center flex-column">
						<label htmlFor="" className="d-block fw-light">
							Confirmar contraseña
						</label>
						<input
							type="password"
							min="5"
							max="20"
							autoComplete="off"
							{...register("passwordConfirm", {
								required: true,
								maxLength: 20,
								minLength: 5,
							})}
						/>
					</div>
					{errorMsg && <ErrorAlert msg={errorMsg} type={"danger"} />}
					<div className="d-flex flex-column w-50 m-auto">
						<button className="btn btn-primary float-end mb-1 float-end">Registrarse</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
