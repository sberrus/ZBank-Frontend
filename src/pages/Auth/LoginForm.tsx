//imports
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { login } from "@utils/auth.util";
//context
import UseAuth from "@context/Auth/UseAuth";
// components
import { Link } from "react-router-dom";
import ErrorAlert from "@components/_partials/ErrorAlert";
// styles
import style from "./Login.module.scss";
// assets
import fingerPrint from "@assets/decoration/fingerPrint.svg";

//
const LoginForm = () => {
	//History hook
	const navigate = useNavigate();

	//Context
	const auth = UseAuth();

	//Form Inputs
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const res = await login(username, password);
			console.log(res.token, res.usuario);
			auth?.login(res.usuario, res.token);
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
			setErrorMsg("Error al iniciar sesión");
		}
	};
	useEffect(() => {
		const inputs = document.querySelectorAll("input");
		inputs.forEach((input) => {
			input.addEventListener("change", () => {
				setErrorMsg("");
			});
		});
		return () => {};
	}, []);

	return (
		<div className={style.login}>
			{/* decoration */}
			<div className={style.decoration}>
				<img src={fingerPrint} alt="login decoration" className={style.fingerPrint} />
			</div>
			{/* copy */}
			<div className={style.copy}>
				<h5 className={style.title}>Welcome back</h5>
				<p className={style.text}>Glad to see you again.</p>
			</div>
			{/* form */}
			<form onSubmit={handleSubmit} className={style.form}>
				<div className="mb-3 d-flex justify-content-center flex-column">
					<label htmlFor="" className="d-block fw-light">
						User
					</label>
					<input
						type="text"
						name="username"
						id="userID"
						autoComplete="off"
						className="rounded"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</div>
				<div className="mb-4 d-flex justify-content-center flex-column">
					<label htmlFor="" className="d-block fw-light">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						className="rounded"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				{errorMsg && <ErrorAlert msg={errorMsg} type={"danger"} />}

				<div className={style.buttonContainer}>
					<button className={style.buttonPrimary}>Entrar</button>
				</div>
				<div className={style.notAccountContainer}>
					<p>
						Don't have an account{" "}
						<Link to="register" className={style.link}>
							Register
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
