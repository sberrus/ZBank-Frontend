// imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
// components
import axios from "axios";
// context
import useAuth from "../../context/Auth/UseAuth";
import ErrorAlert from "../../components/_partials/ErrorAlert";
// style
import style from "./RegisterForm.module.scss";
// assets
import Form from "../../assets/decoration/form.svg";
type FormValues = {
	username: string;
	password: string;
	passwordConfirm: string;
};
const RegisterForm = () => {
	// context
	const auth = useAuth();
	//error logic states
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	//react-form-hook
	const { register, handleSubmit } = useForm<FormValues>();

	useEffect(() => {
		const inputs = document.querySelectorAll("input");
		inputs.forEach((input) => {
			input.addEventListener("focus", () => {
				setErrorMsg(null);
			});
		});
		return () => {
			inputs.forEach((input) => input.removeEventListener("focus", () => {}));
		};
	}, []);

	/**
	 * Handle valid react-hook-form submit after pass the validations.
	 * @param {*} param0 registered and validated form fields
	 */
	const onSubmit: SubmitHandler<FormValues> = async ({ username, password, passwordConfirm }) => {
		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/users",
			data: {
				username: username.toLowerCase(),
				password,
				passwordConfirm,
			},
		})
			.then((res) => {
				const user = res.data.user;
				const token = res.data.token;
				auth?.login(user, token);
				setErrorMsg(null);
			})
			.catch((err) => {
				console.log(err.response);
				const error =
					err.response?.data?.error || err.response?.data[0]?.msg || "Error al registrar al usuario - any";
				setErrorMsg(error);
			});
	};

	/**
	 * Handle react-hook-form submit errors
	 * @param {*} error callback error object
	 */
	const onError = (error: any) => {
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
		if (error.type === "maxLength") {
			setErrorMsg("Username max lenght is 15");
		}
	};

	return (
		<div className={style.registerForm}>
			{/* back button */}
			<Link to="/login" className={style.backButton}>
				<i className="bi bi-arrow-left"></i> Back to login
			</Link>
			{/* decoration */}
			<div className={style.decoration}>
				<img src={Form} alt="login decoration" className={style.formImage} />
			</div>
			{/* copy */}
			<div className={style.copy}>
				<h3 className={style.title}>Register</h3>
				<p className={style.text}>Create an account to unlock all features</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit, onError)} className={style.form}>
				<div className="mb-3 d-flex justify-content-center flex-column">
					<label htmlFor="" className="d-block fw-light">
						Username
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
						Password
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
						Password Confirm
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
				<button className={style.buttonPrimary}>Register</button>
			</form>
		</div>
	);
};

export default RegisterForm;
