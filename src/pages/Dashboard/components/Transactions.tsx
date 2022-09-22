import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TransactionType } from "types/Transactions";
import UseAuth from "../../../context/Auth/UseAuth";
// style
import style from "./Transactions.module.scss";

const Table = () => {
	//Context
	const auth = UseAuth();
	// states
	const [transactions, setTransactions] = useState<TransactionType[]>([]);

	// methods
	const getTransactions = async () => {
		const userID = auth?.user?.userID;
		await axios
			.get(`https://zbank.samdev.es/v1/transactions?accountID=${userID}`, {
				headers: { "x-token": localStorage.getItem("x-token") || "" },
			})
			.then(({ data }) => {
				console.log(data);
			})
			.catch((error) => {
				console.log("🚀 ~ file: Dashboard.tsx ~ line 57 ~ callData ~ error", error);
			});
	};

	// effect
	useEffect(() => {
		getTransactions();
		return () => {};
	}, []);

	//
	return (
		<div className={style.transactions}>
			<h3 className={style.title}>Transactions</h3>
			{/* table */}
			<div className={style.table}>
				{transactions.length > 0 ? (
					<>transacciones</>
				) : (
					<div className={style.noTransactions}>
						<h5 className={style.title}>It seems like you have no transactions yet</h5>
						<Link to="/transactions" className={style.buttonSecondary}>
							Make first transaction
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Table;
