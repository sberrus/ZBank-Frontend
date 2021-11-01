import React, { useState } from "react";
import { Link } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/auth",
			data: {
				username,
				password,
			},
		})
			.then((data) => {
				//enviar token a componente padre para renderizar
				localStorage.setItem("token", data.token);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
				setErrorMsg("Algo ha petao xd");
				var toastLiveExample = document.getElementById("liveToast");
				var toast = new bootstrap.Toast(toastLiveExample);
				toast.show();
			});
	};

	return (
		<div className="container-fluid w-75 py-4 login-form-container">
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
						<Link
							to="/forgot-password"
							className="text-end mt-1"
							title="La mariguana empeora la memoria a corto plazo ¿sabias?"
						>
							¿Olvidaste tu contraseña?
						</Link>
					</div>
					<div className="d-flex flex-column w-75 m-auto">
						<button className="btn btn-primary float-end mb-1 float-end">
							Entrar
						</button>

						<Link to="/register" className="text-center">
							¿No tienes cuenta menor? Registrate
						</Link>
					</div>
					<div class="position-fixed bottom-0 end-0 col-12 bg-dark">
						<div
							id="liveToast"
							class="toast bg-dark"
							role="alert"
							aria-live="assertive"
							aria-atomic="true"
						>
							<div class="toast-header bg-danger text-dark">
								<strong class="me-auto">
									{"Error al iniciar sesión"}
								</strong>
							</div>
							<div class="toast-body">{"Mensaje del error"}</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
