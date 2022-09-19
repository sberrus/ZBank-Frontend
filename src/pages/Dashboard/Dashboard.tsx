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
import { UserType } from "../../types/Auth";

// TODO: Crear hooks para realizar los fetch
const Dashboard = () => {
	//context
	const auth = UseAuth();
	//States
	const [userTransactions, setUserTransactions] = useState([]);
	const [user, setUser] = useState(null);

	const updateUser = (data: UserType) => {
		auth?.login(data);
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
			<div className="container">
				{userTransactions && (
					<>
						<nav className="d-flex justify-content-end">
							<Link to="/transactions" className="btn btn-primary">
								Operaciones
							</Link>
						</nav>
						<Table userTransactions={userTransactions} />
					</>
				)}
			</div>
		</>
	);
};

export default Dashboard;
