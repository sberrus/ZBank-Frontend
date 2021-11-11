import { useEffect, useState } from "react";
import axios from "axios";
import { withRouter, useHistory } from "react-router-dom";
import UseAuth from "../../Contexts/Auth/UseAuth";
import Header from "../_partials/Header";
import "./Transaction.css";

const Transaction = () => {
	//Contexto de loggeo
	const auth = UseAuth();

	//useHistory
	const history = useHistory();

	//Component Data
	const [transactions, setTransactions] = useState([].fill(null, 0, 6));

	//Transaference Input Data
	const [receiver, setReceiver] = useState("");
	const [sender, setSender] = useState("");
	const [ammount, setAmmount] = useState("");

	useEffect(() => {
		const { userID } = JSON.parse(localStorage.getItem("currentUser"));
		setSender(userID);

		const callData = async () => {
			await axios
				.get(
					`https://zbank.samdev.es/v1/transactions?accountID=${userID}`,
					{ headers: { "x-token": localStorage.getItem("x-token") } }
				)
				.then(({ data }) => {
					setTransactions(data.reversedArr);
				});
		};
		callData();
		return () => {};
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios({
			method: "post",
			url: "https://zbank.samdev.es/v1/transactions",
			data: {
				sender,
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
				console.log(err);
			});
	};

	return (
		<div className="vh-100 container p-0">
			<Header user={auth.user} />
			<section id="transactionHeader">
				<hr />
				<div className="d-flex flex-row-reverse">
					<button
						className="btn btn-primary"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseExample"
						aria-expanded="false"
						aria-controls="collapseExample"
					>
						Nueva Transferencia
					</button>
				</div>
			</section>
			{/** Login Form */}
			<div className="collapse mt-2 " id="collapseExample">
				<div className="card card-body bg-dark border">
					<section>
						<form action="" onSubmit={handleSubmit}>
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
									id="receptorID"
									inputMode="numeric"
									value={ammount}
									onChange={(e) => {
										setAmmount(e.target.value);
									}}
								/>
							</div>
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
				</div>
			</div>

			{/**Fin Login Form */}
			<hr />
			{/**Lista de Transacciones */}
			<section id="tableTransaction" className="mt-1">
				<h2>Historial de Transacciones</h2>
				{transactions && (
					<>
						{/* TABLE */}
						<div className="w-100">
							<h2>Últimos registros</h2>
							<table className="table table-dark text-light">
								<thead>
									<tr>
										<th scope="col">Emisor/Receptor</th>
										<th scope="col">Monto</th>
									</tr>
								</thead>
								<tbody>
									{transactions.map((transaction) => (
										<tr key={transaction._id}>
											<td>
												{auth.user.userID ===
												transaction.sender.uid ? (
													<>
														<span className="d-block fw-bold">
															{
																transaction
																	.sender
																	.username
															}
														</span>
														<small className="d-block">
															[concepto]
														</small>
														<small className="text-secondary">
															{transaction.date
																.split("T")[0]
																.replaceAll(
																	"-",
																	"/"
																)}
															{"  "}
															{
																transaction.date
																	.split(
																		"T"
																	)[1]
																	.split(
																		"."
																	)[0]
															}
														</small>
													</>
												) : (
													<>
														<span className="d-block fw-bold">
															{
																transaction
																	.sender
																	.username
															}
														</span>
														<small className="d-block">
															[concepto]
														</small>
														<small className="text-secondary">
															{transaction.date
																.split("T")[0]
																.replaceAll(
																	"-",
																	"/"
																)}
															{"  "}
															{
																transaction.date
																	.split(
																		"T"
																	)[1]
																	.split(
																		"."
																	)[0]
															}
														</small>
													</>
												)}
											</td>
											{auth.user.userID ===
											transaction.sender.uid ? (
												<td className="fw-bold text-danger">
													-{transaction.ammount}
													&nbsp;
													<i className="bi bi-caret-down"></i>
												</td>
											) : (
												<td className="fw-bold text-success">
													{transaction.ammount}
													&nbsp;&nbsp;
													<i className="bi bi-caret-up"></i>
												</td>
											)}
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* TABLE END */}
					</>
				)}
			</section>
			{/**Fin Lista de Transacciones */}
		</div>
	);
};
export default withRouter(Transaction);
