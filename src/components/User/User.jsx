import React from "react";
import Header2 from "../_partials/Header2";
import { Link } from "react-router-dom";
import "./User.css";
import BarChart from "./components/BarChart";
const User = () => {
	return (
		<div className="container p-0">
			<Header2 />
			<hr />

			<div id="canva-grafico">
				<BarChart />
			</div>
			<hr />
			<div className="w-100">
				<h2>Últimos registros</h2>
				<table className="table text-light">
					<thead>
						<tr>
							<th scope="col">ID Transacción</th>
							<th scope="col">ID Emisor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1s21</th>
							<td>123s</td>
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
							<th scope="row">2</th>
							<td>Jacob</td>
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
							<th scope="row">3</th>
							<td>Larry the Bird</td>
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
	);
};

export default User;
