import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import UseAuth from "../../Contexts/Auth/UseAuth";
import Header from "../_partials/Header";

const Transaction = () => {
	//contexto
	const auth = UseAuth();

	const { search } = useLocation();
	const query = new URLSearchParams(search);
	const transactionID = query.get("transactionID");
	const [info, setInfo] = useState(null);
	useEffect(() => {
		const callData = async () => {
			await axios
				.get(
					`https://zbank.samdev.es/v1/transactions?transactionID=${transactionID}`,
					{
						headers: { "x-token": localStorage.getItem("x-token") },
					}
				)
				.then(({ data }) => {
					setInfo(data);
				})
				.catch((err) => {
					console.log(err.response);
				});
		};
		callData();
	}, [transactionID]);
	//TODO: A partir de esta query, buscar la información de esta transferencia
	//TODO: Crear boton para "Repetir transferencia usando estos datos"
	//TODO: VER SI ES FACTIBLE HACER UNA VISTA CON TODAS LAS TRASNFERENCIAS DEL RECEIVER DE ESA TRANSFERENCIA O DEL SENDER. TOMANDO EN CUENTA SI ES UN INGRESO O EGRESO.

	return (
		<div>
			<Header />
			{info && (
				<>
					<small className="text-secondary">
						{info.date.split("T")[0]} -{" "}
						{info.date.split("T")[1].split(".")[0]}
					</small>
					<h1>Monto: {info.ammount}</h1>
					<hr />
					<div className="row border-bottom">
						<div className="col-6 py-2 ">
							<span>
								Emisor: <span>{info.sender.username}</span>
							</span>{" "}
						</div>
						<div className="col-6 py-2">
							<span>Receptor:</span>{" "}
							<span>{info.receiver.username}</span>
						</div>
					</div>
					{info.concept ? (
						<div className="mt-4">
							<h4>Concepto:</h4>
							<p className="text-secondary">{info.concept}</p>
						</div>
					) : (
						"Sin Concepto"
					)}
					<div className="position-fixed bottom-0 w-100 d-flex justify-content-center">
						<button className="btn btn-success">
							Enviar dinero a{" "}
							{info.sender.uid === auth.user.userID
								? info.receiver.username
								: info.sender.username}
							<i className="bi bi-send"></i>
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Transaction;
