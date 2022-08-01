import UseAuth from "../../../context/Auth/UseAuth";
import { DashboardTableProps } from "../../../types/Transactions";

const Table = ({ userTransactions }: DashboardTableProps) => {
	//Context
	const auth = UseAuth();
	return (
		<div>
			{/* TABLE */}
			<div className="w-100">
				<h2>Últimos registros</h2>
				<table className="table">
					<thead>
						<tr>
							<th scope="col" className="col-6">
								Emisor/Receptor
							</th>
							<th scope="col" className="col-6">
								Monto
							</th>
							{/* <th scope="col" className="col-1">
								Opciones
							</th> */}
						</tr>
					</thead>
					<tbody>
						{userTransactions.map((transaction) => (
							<tr key={transaction._id} id={transaction._id}>
								<td>
									{auth?.user?.userID === transaction.sender.uid ? (
										<>
											<span className="d-block">
												{/* Usuario envia dinero */}
												<i className="bi bi-arrow-90deg-down text-danger"></i>
												<span className="d-inline-block ms-1 text-danger fw-bold">
													{transaction.sender.username}
												</span>
											</span>
											<small className="d-block">
												<i className="bi bi-arrow-return-right text-success"></i>
												<span className="d-inline-block ms-1">{transaction.receiver.username}</span>
											</small>
											<small className="text-secondary">
												{transaction.date.split("T")[0]}
												{"  "}
												{transaction.date.split("T")[1].split(".")[0]}
											</small>
										</>
									) : (
										<>
											{/* Usuario recive dinero */}
											<span className="d-block">
												<i className="bi bi-arrow-90deg-down text-danger"></i>
												<span className="d-inline-block ms-1">{transaction.sender.username}</span>
											</span>
											<small className="d-block">
												<i className="bi bi-arrow-return-right text-success"></i>
												<span className="d-inline-block ms-1 text-success">
													{transaction.receiver.username}
												</span>
											</small>
											<small className="text-secondary">
												{transaction.date.split("T")[0]}
												{"  "}
												{transaction.date.split("T")[1].split(".")[0]}
											</small>
										</>
									)}
								</td>
								<td className="fw-bold text-danger">
									-{transaction.ammount}
									&nbsp;
									<i className="bi bi-caret-down"></i>
								</td>
								{/* {auth?.user?.userID === transaction.sender.uid && (
									<>
										<td className="w-25">
											<div className="dropdown m-auto">
												<button
													className="btn btn-secondary btn-sm dropdown-toggle"
													type="button"
													id="opcionesTransaccion"
													data-bs-toggle="dropdown"
													aria-expanded="false"
												>
													<i className="bi bi-list"></i>
												</button>
												<ul className="dropdown-menu p-0" aria-labelledby="opcionesTransaccion">
													<li>
														<a className="dropdown-item" href="/">
															<i className="bi bi-arrow-repeat"></i> Repetir transacción
														</a>
													</li>
												</ul>
											</div>
										</td>
									</>
								)} */}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* TABLE END */}
		</div>
	);
};

export default Table;
