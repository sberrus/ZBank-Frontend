// imports
import { Container } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
// context
import UseAuth from "../../context/Auth/UseAuth";
// components
import Header from "../../components/_partials/Header/Header";
import TransactionList from "./components/TransactionsList";
// styles
import style from "./Dashboard.module.scss";

//
const Dashboard = () => {
	//context
	const auth = UseAuth();
	//States
	const [isCopy, setIsCopy] = useState(false);

	const handleCopyText = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(auth?.user?.userID || "");
			setIsCopy(true);
		}
	};

	return (
		<>
			<Header />
			<div className={style.dashboard}>
				<Container>
					{/* tabs */}
					<div className={style.tabs}>
						<div className={style.tab}>
							<Link to="/app/transactions" className={style.buttonPrimary}>
								Transactions
							</Link>
						</div>
					</div>
					{/* client information */}
					<div className={style.clientInfo}>
						<span className={style.copyButton} onClick={handleCopyText}>
							<span className={style.icon}>
								{isCopy ? <i className="bi bi-clipboard-check"></i> : <i className="bi bi-clipboard"></i>}
							</span>
						</span>
						<span className={style.username}>
							<small>id: </small>
							{auth?.user?.userID}
						</span>
						<span className={style.balance}>{auth?.user?.balance} zym</span>
					</div>
					{/* table */}
					<TransactionList />
				</Container>
			</div>
		</>
	);
};

export default Dashboard;
