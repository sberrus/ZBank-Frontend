// imports
import UseAuth from "@context/Auth/UseAuth";
import { ListGroup } from "react-bootstrap";
// styles
import style from "./TransactionItem.module.scss";
// types
import { TransactionType } from "types/Transactions";
import { useEffect, useState } from "react";

type TransactionItemProps = {
	transaction: TransactionType;
};
const TransactionItem = ({ transaction }: TransactionItemProps) => {
	const [type, setType] = useState("outcome");
	const [date, setDate] = useState<Date | null>(null);
	// hooks
	const auth = UseAuth();

	useEffect(() => {
		const _type = auth?.user?.username === transaction.sender.username ? "outcome" : "income";
		setType(_type);

		const date = new Date(transaction.date);
		setDate(date);
		return () => {};
	}, []);

	return (
		<ListGroup.Item className={style.transaction}>
			{/* Transaction Info */}
			<div className={style.info}>
				{/* transaction type */}
				<div className={`${style.deliver} ${style[`${type}`]}`}>
					<span>
						{type === "income" ? (
							<i className="bi bi-arrow-right-circle"></i>
						) : (
							<i className="bi bi-arrow-left-circle"></i>
						)}
					</span>{" "}
					<span className={style.sender}>
						{type === "outcome" ? transaction.receiver.username : transaction.sender.username}
					</span>
				</div>
				{/* date */}
				<div className={style.date}>
					{date?.getDate()}/{`${date?.getMonth()! + 1}`}/{date?.getUTCFullYear()} - {date?.getHours()}:
					{date?.getMinutes()}
				</div>{" "}
			</div>
			{/* transaction ammount */}
			<div className={`${style.ammount} ${style[`${type}`]}`}>
				{type === "income" ? "+" : "-"}
				{transaction.ammount}
			</div>
		</ListGroup.Item>
	);
};

export default TransactionItem;
