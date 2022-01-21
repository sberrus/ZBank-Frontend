import { useState } from "react";
import axios from "axios";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import UseAuth from "../../Contexts/Auth/UseAuth";
import Header from "../_partials/Header/Header";
import "./Transactions.css";
import ErrorAlert from "../_partials/ErrorAlert";

const Transaction = () => {
	//Contexto de loggeo
	const auth = UseAuth();

	//location
	const { search } = useLocation();

	//Transaference Input Data
	const [ammount, setAmmount] = useState("");
	const [error, setError] = useState(null);
	const [concept, setConcept] = useState("");
	const [receiver, setReceiver] = useState((receiver) => {
		//params
		const query = new URLSearchParams(search);
		return query.get("receiverID") ? query.get("receiverID") : "";
	});

	//useHistory
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/transactions",
			data: {
				sender: auth.user.userID,
				receiver,
				ammount,
				concept,
			},
			headers: { "x-token": localStorage.getItem("x-token") },
		})
			.then(({ data }) => {
				//enviar token a componente padre para renderizar
				console.log("Transferencia enviada con exito", data);
				history.push("/dashboard");
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

	return (
		<div className="vh-100 container-fluid p-0">
			<Header user={auth.user} />
			{/* Formulario de transacciones */}
			<div className="container">
				<section id="tableTransaction" className="mt-1">
					<form action="" onSubmit={handleSubmit}>
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
								rows="5"
								autoComplete="off"
								onChange={(e) => {
									setConcept(e.target.value);
								}}
							/>
						</div>
						{error && <ErrorAlert msg={error} type="danger" />}
						<div className="d-flex flex-row-reverse">
							<button className="btn btn-success col-4 mt-4" type="submit">
								Enviar
							</button>
						</div>
					</form>
				</section>
			</div>
			{/**Fin Lista de Transacciones */}
		</div>
	);
};
export default withRouter(Transaction);
