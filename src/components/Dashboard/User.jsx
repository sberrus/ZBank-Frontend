//imports
import { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import axios from "axios";
import { Link } from "react-router-dom";

//Context
import UseAuth from "../../context/Auth/UseAuth";

//_partials
import Header from "../_partials/Header/Header";
import "./User.css";
import Table from "./components/Table";
// import NewTransaction from "./components/NewTransaction/NewTransactionHOC";

const User = () => {
	//Contexto
	const auth = UseAuth();

	//Component Data
	//TODO: Mejorar despliegue de información del gráfico para que no se cargue una sola barra si solo hay una transacción. Que tenga 6 lementos y que vayan acoplandose el resto uno detras del otro
	const [userTransactions, setUserTransactions] = useState([].fill(null, 0, 6));

	//States
	const [user, setUser] = useState(null);

	const updateUser = (data) => {
		auth.login(data);
	};

	useEffect(() => {
		const { userID } = JSON.parse(localStorage.getItem("currentUser"));

		const callData = async () => {
			await axios
				.get(`https://zbank.samdev.es/v1/users?userID=${userID}`, {
					headers: { "x-token": localStorage.getItem("x-token") },
				})
				.then(({ data }) => {
					setUser(data);
					updateUser(data);
				});
			await axios
				.get(`https://zbank.samdev.es/v1/transactions?accountID=${userID}`, {
					headers: { "x-token": localStorage.getItem("x-token") },
				})
				.then(({ data }) => {
					setUserTransactions(data.reversedArr);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		callData();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{user && <Header user={user} />}
			<div className="container w-75">
				{userTransactions && (
					<>
						<div id="canva-grafico">
							<BarChart userTransactions={userTransactions} user={auth.user} heigth="35vh" />
						</div>
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

export default User;
