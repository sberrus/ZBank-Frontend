//imports
import { FormEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
//context
import UseAuth from "../../context/Auth/UseAuth";
import ErrorAlert from "./Register/components/ErrorAlert";

const LoginForm = () => {
	//History hook
	const history = useHistory();

	//Context
	const auth = UseAuth();

	//Form Inputs
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// useFetch hook
		const authAPIEndpoint = "https://zbank.samdev.es/v1/auth";
		//
		const config: AxiosRequestConfig = {
			method: "POST",
			url: "https://zbank.samdev.es/v1/auth",
			data: {
				username: username.toLowerCase(),
				password,
			},
		};
		await axios(config)
			.then(({ data }) => {
				// save data locally
				localStorage.setItem("x-token", data.token);
				localStorage.setItem("currentUser", JSON.stringify(data.usuario));
				// context
				auth.login(data.usuario);
				auth.registerToken(data.token);
				// redirect
				history.push("/dashboard");
			})
			.catch((err) => {
				const error =
					err.response?.data?.error ||
					err.response?.data[0]?.msg ||
					err.response?.data?.msg ||
					"Error al iniciar Sesión - FrontEnd";
				setErrorMsg(error);
			});
	};
	useEffect(() => {
		const inputs = document.querySelectorAll("input");
		inputs.forEach((input) => {
			input.addEventListener("change", () => {
				setErrorMsg(null);
			});
		});
		return () => {};
	}, []);

	return (
		<div className="container-fluid p-3 login-form-container">
			<div className="blur-bg"></div>
			<div className="login-form-body">
				<h3 className="text-center mb-5">Bienvenido</h3>
				{/* ERROR MSG BADGET */}
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

					<div className="d-flex flex-column w-75 m-auto">
						<button className="btn btn-dark float-end mb-1 float-end">Entrar</button>

						<Link to="/register" className="text-center mt-3">
							¿No tienes cuenta? Registrate
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
