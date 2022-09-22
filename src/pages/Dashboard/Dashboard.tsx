// imports
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// context
import UseAuth from "../../context/Auth/UseAuth";
// components
import Header from "../../components/_partials/Header/Header";
import Table from "./components/Table";
// styles
import style from "./Dashboard.module.scss";
// types
import { UserType } from "../../types/Auth";
import { Container } from "react-bootstrap";

// TODO: Crear hooks para realizar los fetch
const Dashboard = () => {
	//context
	const auth = UseAuth();
	//States
	const [userTransactions, setUserTransactions] = useState([]);
	const [user, setUser] = useState(null);
	const [isCopy, setIsCopy] = useState(false);

	// methods
	const updateUser = (data: UserType) => {
		auth?.login(data);
	};

	const handleCopyText = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(auth?.user?.userID || "");
			setIsCopy(true);
		}
	};

	useEffect(() => {
		const { userID } = JSON.parse(localStorage.getItem("currentUser") || "");

		const callData = async () => {
			try {
				await axios
					.get(`https://zbank.samdev.es/v1/users?userID=${userID}`, {
						headers: { "x-token": localStorage.getItem("x-token") || "" },
					})
					.then((res) => {
						const data = res.data;
						setUser(data);
						updateUser(data);
					});
				await axios
					.get(`https://zbank.samdev.es/v1/transactions?accountID=${userID}`, {
						headers: { "x-token": localStorage.getItem("x-token") || "" },
					})
					.then(({ data }) => {
						setUserTransactions(data.reversedArr);
					})
					.catch((error) => {
						console.log("🚀 ~ file: Dashboard.tsx ~ line 57 ~ callData ~ error", error);
					});
			} catch (error) {
				console.log("🚀 ~ file: Dashboard.tsx ~ line 51 ~ callData ~ error", error);
				auth?.logout();
			}
		};
		callData();
		return () => {};
	}, []);

	return (
		<>
			<Header />
			<div className={style.dashboard}>
				<Container>
					{/* tabs */}
					<div className={style.tabs}>
						<div className={style.tab}>
							<Link to="/transactions" className={style.buttonPrimary}>
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
						<span className={style.balance}>{auth?.user?.balance} sym</span>
					</div>
					{/* table */}
					<Table />
				</Container>
			</div>
		</>
	);
};

export default Dashboard;
