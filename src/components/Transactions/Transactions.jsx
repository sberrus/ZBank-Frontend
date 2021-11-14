import { useEffect, useState } from "react";
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
	const [receiver, setReceiver] = useState((receiver) => {
		//params
		console.log(search);
		const query = new URLSearchParams(search);
		return query.get("receiverID") ? query.get("receiverID") : "";
	});

	const [ammount, setAmmount] = useState("");
	const [error, setError] = useState(null);

	//useHistory
	const history = useHistory();

	//Component Data
	// const [transactions, setTransactions] = useState([].fill(null, 0, 6));

	// useEffect(() => {
	// 	// const { userID } = JSON.parse(localStorage.getItem("currentUser"));
	// 	// setSender(userID);
	// 	// const callData = async () => {
	// 	// 	try {
	// 	// 		await axios
	// 	// 			.get(
	// 	// 				`https://zbank.samdev.es/v1/transactions?accountID=${userID}`,
	// 	// 				{
	// 	// 					headers: {
	// 	// 						"x-token": localStorage.getItem("x-token"),
	// 	// 					},
	// 	// 				}
	// 	// 			)
	// 	// 			.then(({ data }) => {
	// 	// 				setTransactions(data.reversedArr);
	// 	// 			});
	// 	// 	} catch (error) {
	// 	// 		console.log(error);
	// 	// 	}
	// 	// };
	// 	// callData();
	// 	return () => {};
	// }, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/transactions",
			data: {
				sender: auth.user.userID,
				receiver,
				ammount,
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
		<div className="vh-100 container p-0">
			<Header user={auth.user} />
			{/* Formulario de transacciones */}
			<section id="tableTransaction" className="mt-1">
				<form action="" onSubmit={handleSubmit}>
					<div className="d-flex flex-column">
						<label htmlFor="">ID Receptor</label>
						<input
							id="receptorID"
							value={receiver}
							autoComplete="false"
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
							autoComplete="false"
							onChange={(e) => {
								setAmmount(e.target.value);
							}}
						/>
					</div>
					{error && <ErrorAlert msg={error} type="danger" />}
					<div className="d-flex flex-row-reverse">
						<button
							className="btn btn-success col-4 mt-4"
							type="submit"
						>
							Enviar
						</button>
					</div>
				</form>
			</section>
			{/**Fin Lista de Transacciones */}
		</div>
	);
};
export default withRouter(Transaction);
