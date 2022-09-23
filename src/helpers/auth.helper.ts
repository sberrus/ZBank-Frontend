import { LoginRawData, LoginResponse, RegisterRawData, RegisterResponse } from "types/Auth";
// consts
const ENDPOINT = "https://zbank.samdev.es/v1/auth";
/**
 * Log in user and get credentials from backend
 * @param param0
 */
export const loginUser = async ({ username, password }: LoginRawData): Promise<LoginResponse> => {
	// configs
	const config: RequestInit = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			username: username.toLowerCase(),
			password,
		}),
	};

	try {
		const res = await fetch(ENDPOINT, config);
		const loginResponse = await res.json();
		if (res.status !== 200) {
			throw new Error(loginResponse);
		}
		return loginResponse;
	} catch (error) {
		throw new Error("Error when login in user");
	}
};

export const registerUser = async ({
	username,
	password,
	passwordConfirm,
}: RegisterRawData): Promise<RegisterResponse> => {
	const _ENDPOINT = "https://zbank.samdev.es/v1/users";
	const config: RequestInit = {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			username: username.toLowerCase(),
			password,
			passwordConfirm,
		}),
	};
	const res = await fetch(_ENDPOINT, config);
	const resgisterResponse = await res.json();

	return resgisterResponse;
};
