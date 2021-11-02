//imports
import React, { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

//_partials
import Header2 from "../_partials/Header2";
import "./User.css";
const User = () => {
	const [tokenExists] = useState(() => {
		const token = localStorage.token;
		if (!token) return null;
		return token;
	});
	const [user, setUser] = useState(null);
	const [userTransactions, setUserTransactions] = useState(null);
	useEffect(() => {
		let _userID = "4f62";
		const callData = async () => {
			await axios
				.get(`https://zbank.samdev.es/v1/users?userID=${_userID}`)
				.then(({ data }) => setUser(data));
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
	}, [setUser, setUserTransactions]);

	return tokenExists ? (
		<div className="container p-0">
			<Header2 user={user} />
			<hr />

			{userTransactions && (
				<div id="canva-grafico">
					<BarChart userTransactions={userTransactions} user={user} />
				</div>
			)}
			<hr />
			{userTransactions && (
				<div className="w-100">
					<h2>Últimos registros</h2>
					<table className="table text-light">
						<thead>
							<tr>
								<th scope="col">Concepto</th>
								<th scope="col">Monto</th>
							</tr>
						</thead>
						<tbody>
							{userTransactions.map((transaction) => (
								<tr key={transaction.transactionID}>
									<th scope="row ">
										{user.userID === transaction.sender ? (
											<span className="text-danger">
												Enviado
											</span>
										) : (
											<span className="text-success">
												Recibido
											</span>
										)}
									</th>
									{user.userID === transaction.sender ? (
										<td className="fw-bold text-danger">
											{transaction.ammount}
										</td>
									) : (
										<td className="fw-bold text-success">
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
					<Link to="/" className="link-primary text-center col-12 d-block my-2">
						Ver todas las transacciones
					</Link>
				</div>
			)}
		</div>
	) : (
		<Redirect to="/login" />
	);
};

export default User;
