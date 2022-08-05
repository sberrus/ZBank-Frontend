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
		<div className={style.wrapper}>
			<div className={style.imgContainer}>
				<img src="" alt="login decoration" className={style.imgResponsive} />
			</div>
			<form action="" onSubmit={handleSubmit}>
				<div className="mb-3 d-flex justify-content-center flex-column">
					<label htmlFor="" className="d-block fw-light">
						ID Usuario
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
						Contraseña
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

				<div className="d-flex flex-column w-100 m-auto">
					<button className="btn btn-dark float-end mb-1 float-end">Entrar</button>

					<Link to="register" className="text-center mt-3">
						¿No tienes cuenta? Registrate
					</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
