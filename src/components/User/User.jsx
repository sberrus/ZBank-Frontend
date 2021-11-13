//imports
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BarChart from "./components/BarChart";
import axios from "axios";

//Context
import UseAuth from "../../Contexts/Auth/UseAuth";

//_partials
import Header from "../_partials/Header/Header";
import "./User.css";
import CashOut from "./components/CashOut";

const User = () => {
	//Contexto
	const auth = UseAuth();
	const history = useHistory();

	//Component Data
	const [userTransactions, setUserTransactions] = useState(
		[].fill(null, 0, 6)
	);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const { userID } = JSON.parse(localStorage.getItem("currentUser"));

		const callData = async () => {
			await axios
				.get(`https://zbank.samdev.es/v1/users?userID=${userID}`, {
					headers: { "x-token": localStorage.getItem("x-token") },
				})
				.then(({ data }) => {
					setUser(data);
					auth.login(data);
				});
			await axios
				.get(
					`https://zbank.samdev.es/v1/transactions?accountID=${userID}`,
					{
						headers: { "x-token": localStorage.getItem("x-token") },
					}
				)
				.then(({ data }) => {
					setUserTransactions(data.reversedArr);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		callData();
		return () => {};
		// eslint-disable-next-line
	}, []);

	const goToTransaction = (e) => {
		const transactionID = e.currentTarget.id;
		const route = `transaction?transactionID=${transactionID}`;
		console.log(transactionID, route);
		history.push(route);
	};

	return (
		<div className="container p-0">
			{user && <Header user={user} />}
			<nav className="d-flex justify-content-between">
				<Link to="/transactions" className="btn btn-success">
					Enviar Dinero [icon]
				</Link>
				<CashOut />
			</nav>

			{userTransactions && (
				<>
					<div id="canva-grafico">
						<BarChart
							userTransactions={userTransactions}
							user={auth.user}
						/>
					</div>
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
								{userTransactions.map((transaction) => (
									<tr
										key={transaction._id}
										id={transaction._id}
										onClick={(e) => {
											goToTransaction(e);
										}}
									>
										<td>
											{auth.user.userID ===
											transaction.sender.uid ? (
												<>
													<span className="d-block">
														{/* Usuario envia dinero */}
														<i className="bi bi-arrow-90deg-down text-danger"></i>
														<span className="d-inline-block ms-1 text-danger fw-bold">
															{
																transaction
																	.sender
																	.username
															}
														</span>
													</span>
													<small className="d-block">
														<i className="bi bi-arrow-return-right text-success"></i>
														<span className="d-inline-block ms-1">
															{
																transaction
																	.receiver
																	.username
															}
														</span>
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
																.split("T")[1]
																.split(".")[0]
														}
													</small>
												</>
											) : (
												<>
													{/* Usuario recive dinero */}
													<span className="d-block">
														<i className="bi bi-arrow-90deg-down text-danger"></i>
														<span className="d-inline-block ms-1">
															{
																transaction
																	.sender
																	.username
															}
														</span>
													</span>
													<small className="d-block">
														<i className="bi bi-arrow-return-right text-success"></i>
														<span className="d-inline-block ms-1 text-success">
															{
																transaction
																	.receiver
																	.username
															}
														</span>
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
																.split("T")[1]
																.split(".")[0]
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
		</div>
	);
};

export default User;
