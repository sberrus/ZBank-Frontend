import axios, { AxiosRequestConfig } from "axios";

export const login = async (username: string, password: string) => {
	// configs
	const authAPIEndpoint = "https://zbank.samdev.es/v1/auth";
	const config: AxiosRequestConfig = {
		method: "POST",
		url: authAPIEndpoint,
		data: {
			username: username.toLowerCase(),
			password,
		},
	};
	try {
		const res = await axios(config);
		// save data locally
		const data = await res.data;
		return data;
	} catch (err) {
		const error =
			err.response?.data?.error ||
			err.response?.data[0]?.msg ||
			err.response?.data?.msg ||
			"Error al iniciar Sesión - FrontEnd";
		throw new Error(error);
	}
};
