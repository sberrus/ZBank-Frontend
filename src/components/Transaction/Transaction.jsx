import React, { useState } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import Header2 from "../_partials/Header2";
import "./Transaction.css";

const Transaction = () => {
	const [currentUser] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("form sent");
	};

	return currentUser ? (
		<div className="vh-100 container p-0">
			<Header2 user={currentUser} />
			<section id="transactionHeader">
				<hr />
				<div className="d-flex flex-row-reverse">
					<button
						class="btn btn-primary"
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
			<div class="collapse mt-2 " id="collapseExample">
				<div class="card card-body bg-dark border">
					<section>
						<form action="" onSubmit={handleSubmit}>
							<div className="d-flex flex-column">
								<label htmlFor="">ID Receptor</label>
								<input
									type="number"
									id="receptorID"
									inputMode="numeric"
								/>
							</div>
							<div className="d-flex flex-column">
								<label htmlFor="">Monto</label>
								<input
									type="number"
									id="receptorID"
									inputMode="numeric"
								/>
							</div>
							<div className="d-flex flex-row-reverse">
								<button className="btn btn-success col-4 mt-4">
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
				<table className="table text-light">
					<thead>
						<tr>
							<th scope="col">Emisor</th>
							<th scope="col">Ingreso/Egreso</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1s21</th>
							<td>123s</td>
							<td>
								<button
									to="/transaction"
									className="btn btn-outline-primary"
								>
									...
								</button>
							</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>
								<button
									to="/transaction"
									className="btn btn-outline-primary"
								>
									...
								</button>
							</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Larry the Bird</td>
							<td>
								<button
									to="/transaction"
									className="btn btn-outline-primary"
								>
									...
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			{/**Fin Lista de Transacciones */}
		</div>
	) : (
		<Redirect to="/" />
	);
};

export default withRouter(Transaction);
