//imports
import { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import axios from "axios";
import { Link } from "react-router-dom";

//Context
import UseAuth from "../../Contexts/Auth/UseAuth";

//_partials
import Header from "../_partials/Header/Header";
import "./User.css";
import Table from "./components/Table";
import NewTransaction from "./components/NewTransaction";

const User = () => {
	//Contexto
	const auth = UseAuth();

	//Component Data
	//TODO: mejorar comportamiento para nuevos usuarios sin transferencias para evitar que se vea feo el grafico
	const [userTransactions, setUserTransactions] = useState(
		[].fill(null, 0, 6)
	);
	const [user, setUser] = useState(null);
	const [render, setRender] = useState(false);

	useEffect(() => {
		const { userID } = JSON.parse(localStorage.getItem("currentUser"));

		const callData = async () => {
			await axios
				.get(`https://zbank.samdev.es/v1/users?userID=${userID}`, {
					headers: { "x-token": localStorage.getItem("x-token") },
				})
				.then(({ data }) => {
					setUser(data);
					auth.login(data);
				});
			await axios
				.get(
					`https://zbank.samdev.es/v1/transactions?accountID=${userID}`,
					{
						headers: { "x-token": localStorage.getItem("x-token") },
					}
				)
				.then(({ data }) => {
					setUserTransactions(data.reversedArr);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		callData();
		return () => {};
		// eslint-disable-next-line
	}, [render]);

	return (
		<div className="container p-0">
			{user && <Header user={user} />}
			<nav className="d-flex justify-content-between">
				<NewTransaction setRender={setRender} render={render} cashout />
				{/* <NewTransaction
					setRender={setRender}
					render={render}
					btnTitle={"Transferir"}
				/> */}
				<Link to="/transactions" className="btn btn-primary">
					Transferencias
				</Link>
			</nav>

			{userTransactions && (
				<>
					<div id="canva-grafico">
						<BarChart
							userTransactions={userTransactions}
							user={auth.user}
						/>
					</div>
					<Table userTransactions={userTransactions} />
				</>
			)}
		</div>
	);
};

export default User;
