//imports
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BarChart from "./components/BarChart";
import axios from "axios";

//Context
import UseAuth from "../../Contexts/Auth/UseAuth";

//_partials
import Header from "../_partials/Header";
import "./User.css";

const User = () => {
	//Contexto
	const auth = UseAuth();
	const history = useHistory();

	//Component Data
	const [userTransactions, setUserTransactions] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const { userID } = JSON.parse(localStorage.getItem("currentUser"));

		const callData = async () => {
			await axios
				.get(`https://zbank.samdev.es/v1/users?userID=${userID}`)
				.then(({ data }) => {
					setUser(data);
					auth.login(data);
				});
			await axios
				.get(
					`https://zbank.samdev.es/v1/transactions?accountID=${userID}`
				)
				.then(({ data }) => {
					const last6Transactions = data.slice(-6).reverse();
					setUserTransactions(last6Transactions);
				});
		};
		callData();
		return () => {};
	}, []);

	const goToTransaction = () => {
		history.push("/transaction");
	};

	return (
		<div className="container p-0">
			{user && <Header user={user} />}

			{userTransactions && (
				<>
					<div id="canva-grafico">
						<BarChart
							userTransactions={userTransactions}
							user={auth.user}
						/>
					</div>
					<nav>
						<Link to="/transaction" className="btn btn-success">
							Transaction
						</Link>
					</nav>
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
										key={transaction.transactionID}
										onClick={goToTransaction}
									>
										<td>
											{auth.user.userID ===
											transaction.sender ? (
												<>
													<span className="d-block fw-bold">
														[Username]
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
																.split("T")[1]
																.split(".")[0]
														}
													</small>
												</>
											) : (
												<>
													<span className="d-block fw-bold">
														[Username]
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
																.split("T")[1]
																.split(".")[0]
														}
													</small>
												</>
											)}
										</td>
										{auth.user.userID ===
										transaction.sender ? (
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
