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
	// hooks
	const auth = UseAuth();

	useEffect(() => {
		const _type = auth?.user?.username === transaction.sender.username ? "outcome" : "income";
		setType(_type);
		return () => {};
	}, []);

	return (
		<ListGroup.Item className={style.transaction}>
			<div>[icon income outcome]</div> <div>[detail/date]</div> <div>[ammount]</div>
		</ListGroup.Item>
	);
};

export default TransactionItem;
