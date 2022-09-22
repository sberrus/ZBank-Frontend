import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import UseAuth from "../../context/Auth/UseAuth";
import Header from "../../components/_partials/Header/Header";
import ErrorAlert from "../../components/_partials/ErrorAlert";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Transactions.module.scss";

const Transaction = () => {
	//Contexto de loggeo
	const auth = UseAuth();

	//location
	const { search } = useLocation();

	//Transaference Input Data
	const [ammount, setAmmount] = useState("");
	const [error, setError] = useState(null);
	const [concept, setConcept] = useState("");
	const [receiver, setReceiver] = useState("");

	//useHistory
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const config: AxiosRequestConfig = {
			method: "post",
			url: "https://zbank.samdev.es/v1/transactions",
			data: {
				sender: auth?.user?.userID,
				receiver,
				ammount,
				concept,
			},
			headers: { "x-token": localStorage?.getItem("x-token") || "Token_Error" },
		};
		await axios(config)
			.then(({ data }) => {
				//enviar token a componente padre para renderizar
				console.log("Transferencia enviada con exito", data);
				navigate("/dashboard");
			})
			.catch((err) => {
				const error =
					err.response.data[0]?.msg ||
					err.response.data.error ||
					"Erro al realizar la consulta, seguro estas pelando bolas - esto no deberia verse lol";
				setError(error);
				console.log(err.response.data);
			});
	};

	const catchReceiver = () => {
		const query = new URLSearchParams(search);
		const receiver = query.get("receiverID");
		if (receiver) setReceiver(receiver);
	};
	// effect
	useEffect(() => {
		catchReceiver();
		return () => {};
	}, []);

	return (
		<div className={`${style.transactions} vh-100 container-fluid p-0`}>
			<Header />
			{/* Formulario de transacciones */}
			<div className="container">
				<section id="tableTransaction" className="mt-1">
					<form onSubmit={handleSubmit} className={style.form}>
						<div className="d-flex flex-column">
							<label htmlFor="">ID Receptor</label>
							<input
								id="receptorID"
								value={receiver}
								autoComplete="off"
								onChange={(e) => {
									setReceiver(e.target.value);
								}}
							/>
						</div>
						<div className="d-flex flex-column">
							<label htmlFor="">Monto</label>
							<input
								type="number"
								id="receptorID"
								inputMode="numeric"
								value={ammount}
								autoComplete="off"
								onChange={(e) => {
									setAmmount(e.target.value);
								}}
							/>
						</div>
						<div className="d-flex flex-column">
							<label htmlFor="">Concepto</label>
							<textarea
								id="concept"
								value={concept}
								rows={5}
								autoComplete="off"
								onChange={(e) => {
									setConcept(e.target.value);
								}}
							/>
						</div>
						{error && <ErrorAlert msg={error} type="danger" />}
						<button className={style.buttonPrimary} type="submit">
							Enviar
						</button>
					</form>
				</section>
			</div>
			{/**Fin Lista de Transacciones */}
		</div>
	);
};
export default Transaction;
