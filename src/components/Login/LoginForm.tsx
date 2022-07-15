//imports
import { FormEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//context
import UseAuth from "../../context/Auth/UseAuth";
import ErrorAlert from "./Register/components/ErrorAlert";
import { login } from "../../utils/auth.util";

const LoginForm = () => {
	//History hook
	const history = useHistory();

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
			console.log(res.usuario);
			auth?.login(res.usuario);
			// history.push("/dashboard");
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
