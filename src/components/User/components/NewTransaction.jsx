//imports
import { useState } from "react";
import axios from "axios";
import UseAuth from "../../../Contexts/Auth/UseAuth";

//partials
import ErrorAlert from "../../_partials/ErrorAlert";

const NewTransaction = ({
	btnTitle,
	cashout,
	setRender,
	render,
	receiverID,
}) => {
	//states
	const [receiver, setReceiver] = useState("");
	const [ammount, setAmmount] = useState("");
	const [error, setError] = useState(null);

	//Contexto
	const auth = UseAuth();

	//Enviar Transferencia
	const handleSubmit = async (e) => {
		console.log(ammount);
		e.preventDefault();
		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/transactions",
			data: {
				sender: auth.user.userID,
				receiver: receiver || "admi",
				ammount,
			},
			headers: { "x-token": localStorage.getItem("x-token") },
		})
			.then(({ data }) => {
				//enviar token a componente padre para renderizar
				console.log("Transferencia enviada con exito", data);
				setRender(!render);
				setAmmount(0);
			})
			.catch((err) => {
				console.log(err.response);
				setError(err.response.data[0].msg);
			});
	};

	return cashout === true ? (
		<>
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#cashoutModal"
			>
				Retirar Efectivo <i className="bi bi-cash"></i>
			</button>

			<div
				className="modal fade"
				id="cashoutModal"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content bg-dark">
						<div className="modal-header">
							<h5
								className="modal-title"
								id="staticBackdropLabel"
							>
								Retirar Efectivo
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit} id="newTransaction">
								<div
									className="d-flex flex-column"
									id="cashout"
								>
									<label htmlFor="">
										Seleccione Monto a Retirar
									</label>
									<input
										type="number"
										id="ammount"
										className="bg-dark border-bottom"
										min="0"
										inputMode="numeric"
										autoComplete="false"
										placeholder="Indique Cantidad"
										value={ammount}
										onChange={(e) => {
											setAmmount(e.target.value);
										}}
									/>
								</div>
								{error && (
									<ErrorAlert msg={error} type="danger" />
								)}
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="submit"
								form="newTransaction"
								className="btn btn-success"
							>
								Transferir efectivo{" "}
								<i className="bi bi-cash"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	) : (
		<>
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#transferModal"
			>
				{btnTitle} <i className="bi bi-send"></i>
			</button>

			<div
				className="modal fade"
				id="transferModal"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content bg-dark">
						<div className="modal-header">
							<h5
								className="modal-title"
								id="staticBackdropLabel"
							>
								{btnTitle}
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit} id="newTransaction">
								<div className="d-flex flex-column">
									<label htmlFor="">ID Receptor</label>
									<input
										id="receptorID"
										value={receiver}
										onChange={(e) => {
											setReceiver(e.target.value);
										}}
									/>
								</div>
								<div className="d-flex flex-column">
									<label htmlFor="">Monto</label>
									<input
										type="number"
										id="ammount"
										inputMode="numeric"
										min="0"
										value={ammount}
										onChange={(e) => {
											setAmmount(e.target.value);
										}}
									/>
								</div>
								{error && (
									<ErrorAlert msg={error} type="danger" />
								)}
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="submit"
								form="newTransaction"
								className="btn btn-success"
							>
								Realizar Transferencia{" "}
								<i className="bi bi-send"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewTransaction;
