//imports
import React, { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

//_partials
import Header from "../_partials/Header";
import "./User.css";
import UseAuth from "../../Contexts/Auth/UseAuth";
const User = () => {
	//Contexto
	const auth = UseAuth();

	//Component Data
	const [user, setUser] = useState(null);
	const [userTransactions, setUserTransactions] = useState(null);
	useEffect(() => {
		let _userID = "4f62";
		const callData = async () => {
			await axios
				.get(
					`https://zbank.samdev.es/v1/transactions?accountID=${_userID}`
				)
				.then(({ data }) => {
					const last6Transactions = data.slice(-6).reverse();
					setUserTransactions(last6Transactions);
				});
		};
		callData();
		return () => {
			setUser({});
		};
	}, [setUser, setUserTransactions]);

	return auth.isLogged() ? (
		<div className="container p-0">
			{auth.user && <Header user={auth.user} />}

			{userTransactions && (
				<>
					<div id="canva-grafico">
						<BarChart
							userTransactions={userTransactions}
							user={auth.user}
						/>
					</div>

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
									<tr key={transaction.transactionID}>
										<th scope="row ">
											{auth.user.userID ===
											transaction.sender ? (
												<span className="text-danger"></span>
											) : (
												<span className="text-success"></span>
											)}
										</th>
										{auth.user.userID === transaction.sender ? (
											<td className="fw-bold text-danger">
												<i class="bi bi-caret-down"></i>
												{transaction.ammount}
											</td>
										) : (
											<td className="fw-bold text-success">
												<i class="bi bi-caret-up"></i>
												{transaction.ammount}
											</td>
										)}

										<td>
											<Link
												to="/transaction"
												className="btn btn-outline-primary"
											>
												[...]
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<Link
							to="/transaction"
							className="link-primary text-center col-12 d-block my-2"
						>
							Ver todas las transacciones
						</Link>
					</div>
				</>
			)}
		</div>
	) : (
		<Redirect to="/" />
	);
};

export default User;
