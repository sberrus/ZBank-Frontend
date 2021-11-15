import { useHistory } from "react-router-dom";
import UseAuth from "../../../Contexts/Auth/UseAuth";

const Table = ({ userTransactions }) => {
	//Context
	const auth = UseAuth();
	//history
	const history = useHistory();

	//transactions details
	const goToTransaction = (e) => {
		const transactionID = e.currentTarget.id;
		const route = `transaction?transactionID=${transactionID}`;
		console.log(transactionID, route);
	};
	return (
		<div>
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
														transaction.sender
															.username
													}
												</span>
											</span>
											<small className="d-block">
												<i className="bi bi-arrow-return-right text-success"></i>
												<span className="d-inline-block ms-1">
													{
														transaction.receiver
															.username
													}
												</span>
											</small>
											<small className="text-secondary">
												{transaction.date
													.split("T")[0]
													.replaceAll("-", "/")}
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
														transaction.sender
															.username
													}
												</span>
											</span>
											<small className="d-block">
												<i className="bi bi-arrow-return-right text-success"></i>
												<span className="d-inline-block ms-1 text-success">
													{
														transaction.receiver
															.username
													}
												</span>
											</small>
											<small className="text-secondary">
												{transaction.date
													.split("T")[0]
													.replaceAll("-", "/")}
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
								{auth.user.userID === transaction.sender.uid ? (
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
		</div>
	);
};

export default Table;
