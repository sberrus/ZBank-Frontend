import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
	//todo: llamar las últimas 5 transacciones y de los datos extraer los siguientes parametros:
	//todo: 	Nombre Contraparte: (receptor en el caso de enviar dinero, y emisor de lo contrario).
	//todo:		saldo a favor: BOOL (para pintar en la gráfica las transferencias de manera más ordenada).

	const last5Trans = [
		"Tran 1",
		"Tran 2",
		"Tran 3",
		"Tran 4",
		"Tran 5",
		"Tran 6",
	];
	const colorStatusBG = [
		"#1d4f2b",
		"#1d4f2b",
		"#6e2921",
		"#6e2921",
		"#1d4f2b",
		"#6e2921",
	];
	const colorStatusBorder = [
		"#00ff47",
		"#00ff47",
		"#ff1900",
		"#ff1900",
		"#00ff47",
		"#ff1900",
	];

	return (
		<div>
			<Bar
				id="barchart"
				data={{
					labels: last5Trans,
					datasets: [
						{
							label: "Montos",
							data: [120, 300, -500, -500, 2000, -300],
							//Fondos: verde saldo a favor (#1d4f2b), rojo saldo en contra
							backgroundColor: colorStatusBG,
							borderColor: colorStatusBorder,
							borderWidth: 1,
						},
					],
				}}
				options={{
					responsive: true,

					plugins: {
						title: {
							display: true,
							text: "Hola",
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
