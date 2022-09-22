import axios from "axios";
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TransactionType } from "types/Transactions";
import UseAuth from "../../../context/Auth/UseAuth";
import TransactionItem from "./TransactionItem";
// style
import style from "./TransactionsList.module.scss";

const TransactionList = () => {
	//Context
	const auth = UseAuth();
	// states
	const [transactions, setTransactions] = useState<TransactionType[]>([]);

	// TODO: MOVE THIS LOGIC TO ./HELPERS
	// methods
	const getTransactions = async () => {
		const userID = auth?.user?.userID;
		await axios
			.get(`https://zbank.samdev.es/v1/transactions?accountID=${userID}`, {
				headers: { "x-token": localStorage.getItem("x-token") || "" },
			})
			.then(({ data }) => {
				setTransactions(data.reversedArr);
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
					<ListGroup>
						{transactions.map((transaction) => (
							<TransactionItem key={transaction._id} transaction={transaction} />
						))}
					</ListGroup>
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

export default TransactionList;
