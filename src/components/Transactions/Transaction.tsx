//Imports
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//Context
import UseAuth from "../../context/Auth/UseAuth";
//Components
import Header from "../_partials/Header/Header";

const Transaction = () => {
	//contexto
	const auth = UseAuth();
	//states
	const [info, setInfo] = useState(null);
	//history
	const navigate = useNavigate();
	const { search } = useLocation();
	const query = new URLSearchParams(search);
	const transactionID = query.get("transactionID");
	useEffect(() => {
		const callData = async () => {
			await axios
				.get(`https://zbank.samdev.es/v1/transactions?transactionID=${transactionID}`, {
					headers: { "x-token": localStorage.getItem("x-token") || "token_error" },
				})
				.then(({ data }) => {
					setInfo(data);
				})
				.catch((err) => {
					console.log(err.response);
				});
		};
		callData();
	}, [transactionID]);

	return (
		<>
			{auth?.user && <Header />}
			{info && (
				<>
					<small className="text-secondary">
						{info.date.split("T")[0]} - {info.date.split("T")[1].split(".")[0]}
					</small>
					<h1>Monto: {info.ammount}</h1>
					<hr />
					<div className="d-flex justify-content-between border-bottom">
						<div className="col-6">
							<span>
								Emisor: <span>{info.sender.username}</span>
							</span>{" "}
						</div>
						<div className="col-6 text-end">
							<span>Receptor:</span> <span>{info.receiver.username}</span>
						</div>
					</div>
					{info.concept ? (
						<div className="mt-4">
							<h4>Concepto:</h4>
							<p className="text-secondary">{info.concept}</p>
						</div>
					) : (
						"Sin Concepto"
					)}
					<div className="position-absolute bottom-0 d-flex justify-content-center w-100 pb-3">
						{info.sender.uid === auth.user.userID ? (
							<>
								<button
									className="btn btn-success"
									onClick={() => {
										navigate.push(`/transactions?receiverID=${info.receiver.uid}`);
									}}
								>
									Enviar dinero a {info.receiver.username}
									<i className="bi bi-send"></i>
								</button>
							</>
						) : (
							<>
								<button
									className="btn btn-success"
									onClick={() => {
										navigate.push(`/transactions?receiverID=${info.sender.uid}`);
									}}
								>
									Enviar dinero a {info.sender.username}
									<i className="bi bi-send"></i>
								</button>
							</>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Transaction;
