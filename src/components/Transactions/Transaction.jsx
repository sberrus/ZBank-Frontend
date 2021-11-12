import React from "react";
import { useLocation } from "react-router-dom";

const Transaction = () => {
	const { search } = useLocation();
	const query = new URLSearchParams(search);
	const transactionID = query.get("transactionID");

	//TODO: A partir de esta query, buscar la información de esta transferencia
	//TODO: Crear boton para "Repetir transferencia usando estos datos"
	//TODO: VER SI ES FACTIBLE HACER UNA VISTA CON TODAS LAS TRASNFERENCIAS DEL RECEIVER DE ESA TRANSFERENCIA O DEL SENDER. TOMANDO EN CUENTA SI ES UN INGRESO O EGRESO.
	console.log(transactionID);

	return (
		<div>
			<h2>query: </h2>
			<p>
				Hacer que se muestre la información de la transferencia en esta
				vista para poder hacer cosas y ver en detalle la transacción
			</p>
		</div>
	);
};

export default Transaction;
