//Imports
import React, { useEffect, useState } from "react";
import axios from "axios";
//Context
import UseAuth from "../../../../Contexts/Auth/UseAuth";
//Components
import ErrorAlert from "../../../_partials/ErrorAlert";
import { useRef } from "react/cjs/react.development";

const Transfer = ({ btnTitle, setRender, render }) => {
	//Context
	const auth = UseAuth();

	//states handleSubmit (normal)
	const [receiver, setReceiver] = useState("");
	const [ammount, setAmmount] = useState("");

	//states handle error
	const [error, setError] = useState(null);

	//ref
	const exitButton = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(ammount);
		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/transactions",
			data: {
				sender: auth.user.userID,
				receiver: receiver,
				ammount,
			},
			headers: { "x-token": localStorage.getItem("x-token") },
		})
			.then(({ data }) => {
				//enviar token a componente padre para renderizar
				console.log("Transferencia enviada con exito", data);
				setRender(!render);
				setAmmount("");
				setReceiver("");
				exitButton.current.click();
			})
			.catch((err) => {
				console.log(err.response.data);
				setError(err.response.data[0].msg);
			});
	};

	return (
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
								className="btn-close btn-close-white"
								data-bs-dismiss="modal"
								aria-label="Close"
								ref={exitButton}
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit} id="transactionForm" className="my-3">
								<div className="d-flex flex-column">
									<input
										id="receptorID"
										className="transfer-input bg-dark border-bottom"
										autoComplete="off"
										placeholder="Indique ID del receptor"
										value={receiver}
										onChange={(e) => {
											setReceiver(e.target.value);
										}}
									/>
								</div>
								<div className="d-flex flex-column">
									<input
										type="number"
										id="ammount"
										className="bg-dark border-bottom transfer-input"
										min="0"
										inputMode="numeric"
										autoComplete="off"
										placeholder="Monto a Transferir"
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
								form="transactionForm"
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

export default Transfer;
