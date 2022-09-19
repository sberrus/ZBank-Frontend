//imports
import React, { useRef, useState } from "react";
import UseAuth from "../../../../context/Auth/UseAuth";
import axios from "axios";
//components
import ErrorAlert from "../../../../components/_partials/ErrorAlert";
//context

const CashOut = ({ setRender, render }) => {
	//Context
	const auth = UseAuth();

	//states handleSubmitCashout
	const [ammount, setAmmount] = useState("");

	//states handle error
	const [error, setError] = useState(null);

	//ref
	const exitButton = useRef(null);

	//Enviar Transferencia
	const handleSubmitCashout = async (e) => {
		e.preventDefault();
		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/transactions",
			data: {
				sender: auth.user.userID,
				receiver: "admi",
				ammount,
			},
			headers: { "x-token": localStorage.getItem("x-token") },
		})
			.then(({ data }) => {
				//enviar token a componente padre para renderizar
				console.log("Transferencia enviada con exito", data);
				setRender(!render);
				setAmmount("");
				exitButton.current.click();
			})
			.catch((err) => {
				console.log(err.response.data);
				setError(err.response.data[0].msg);
			});
	};
	return (
		<>
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cashoutModal">
				Retirar Efectivo <i className="bi bi-cash"></i>
			</button>

			<div
				className="modal fade"
				id="cashoutModal"
				yboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog ">
					<div className="modal-content bg-dark">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">
								Retirar Efectivo
							</h5>
							<button
								type="button"
								className="btn-close btn-close-white"
								data-bs-dismiss="modal"
								aria-label="Close"
								ref={exitButton}
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmitCashout} id="cashoutForm">
								<div className="d-flex flex-column" id="cashout">
									<input
										type="number"
										id="ammount"
										className="bg-dark border-bottom transfer-input"
										min="0"
										inputMode="numeric"
										autoComplete="off"
										placeholder="Indique Cantidad a Retirar"
										value={ammount}
										onChange={(e) => {
											setAmmount(e.target.value);
										}}
									/>
								</div>
								{error && <ErrorAlert msg={error} type="danger" />}
							</form>
						</div>
						<div className="modal-footer">
							<button type="submit" form="cashoutForm" className="btn btn-success">
								Transferir efectivo <i className="bi bi-cash"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CashOut;
