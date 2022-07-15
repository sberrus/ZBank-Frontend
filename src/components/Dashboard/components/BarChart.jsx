import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ userTransactions, user }) => {
	const reversedTrasactions = Object.assign([], userTransactions).reverse();

	const transactionAmmounts = reversedTrasactions.map((transaction) => {
		return transaction.ammount;
	});
	const labels = reversedTrasactions.map((transaction) => {
		return user.userID === transaction.sender.uid ? "enviado" : "recibido";
	});
	const backgroundColor = reversedTrasactions.map((transaction) => {
		return user.userID === transaction.sender.uid ? "#6e2921" : "#1d4f2b";
	});
	const borderColor = reversedTrasactions.map((transaction) => {
		return user.userID === transaction.sender.uid ? "#ff1900" : "#00ff47";
	});

	return (
		<>
			<Bar
				id="barchart"
				data={{
					labels,
					datasets: [
						{
							label: "Montos",
							data: transactionAmmounts,
							backgroundColor,
							borderColor,
							borderWidth: 1,
						},
					],
				}}
				options={{
					responsive: true,
					plugins: {
						title: {
							display: false,
						},
						legend: {
							display: false,
						},
					},
				}}
			/>
		</>
	);
};

export default BarChart;
