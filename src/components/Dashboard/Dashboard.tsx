// imports
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// context
import UseAuth from "../../context/Auth/UseAuth";
// components
import Header from "../_partials/Header/Header";
import Table from "./components/Table";
// styles
import "./User.scss";
import { UserType } from "../../types/Auth";

const Dashboard = () => {
	//context
	const auth = UseAuth();
	//States
	const [userTransactions, setUserTransactions] = useState([]);
	const [user, setUser] = useState(null);

	const updateUser = (data: UserType) => {
		console.log(data);
		auth && auth.login(data);
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
						console.log(error);
					});
			} catch (error) {
				console.log(error);
				auth?.logout();
			}
		};
		callData();
		return () => {};
	}, []);

	return (
		<>
			{user && <Header />}
			<div className="container w-75">
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
