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
		axios
			.get("https://zbank.samdev.es/v1/users?userID=4f62")
			.then(({ data }) => setUser(data));
		axios
			.get("https://zbank.samdev.es/v1/transactions?accountID=4f62")
			.then(({ data }) => {
				setUserTransactions(data);
			});
	}, []);

	return tokenExists ? (
		<div className="container p-0">
			<Header2 user={user} />
			<hr />

			<div id="canva-grafico">
				<BarChart userTransactions={userTransactions} />
			</div>
			<hr />
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
						<tr>
							<th scope="row">Concepto 1</th>
							<td className="text-success fw-bold">+250</td>
							<td>
								<Link
									to="/transaction"
									className="btn btn-outline-primary"
								>
									Detalles[]
								</Link>
							</td>
						</tr>
						<tr>
							<th scope="row">Concepto 2</th>
							<td className="text-danger fw-bold">-500</td>
							<td>
								<Link
									to="/transaction"
									className="btn btn-outline-primary"
								>
									Detalles[]
								</Link>
							</td>
						</tr>
						<tr>
							<th scope="row">concepto 3</th>
							<td className="text-success fw-bold">+1500</td>
							<td>
								<Link
									to="/transaction"
									className="btn btn-outline-primary"
								>
									Detalles[]
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	) : (
		<Redirect to="/login" />
	);
};

export default User;
