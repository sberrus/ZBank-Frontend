import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ userTransactions, user }) => {
	const data = userTransactions.map((transaction) => {
		return transaction.ammount;
	});
	const labels = userTransactions.map((transaction) => {
		return user.userID === transaction.sender ? "enviado" : "recibido";
	});
	const backgroundColor = userTransactions.map((transaction) => {
		return user.userID === transaction.sender ? "#6e2921" : "#1d4f2b";
	});
	const borderColor = userTransactions.map((transaction) => {
		return user.userID === transaction.sender ? "#ff1900" : "#00ff47";
	});

	return (
		<div>
			<Bar
				id="barchart"
				data={{
					labels,
					datasets: [
						{
							label: "Montos",
							data,
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
		</div>
	);
};

export default BarChart;
