import { LoginRawData, LoginResponse, RefreshUserType, RegisterRawData, RegisterResponse, UserType } from "types/Auth";
// consts
const ENDPOINT = window.location.hostname === "localhost" ? "https://zbank.samdev.es/v1/auth" : "https://zbank.samdev.es/v1/auth";


/**
 * Log in user and get credentials from backend
 * @param param0 
 * @returns 
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
    throw new Error("Error when login user");
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

  try {
    const res = await fetch(_ENDPOINT, config);
    const resgisterResponse = await res.json();

    return resgisterResponse;
  } catch (error) {
    throw new Error("Error when login in user");
  }
};

export const refreshUser = async ({ userID, token }: RefreshUserType): Promise<UserType> => {
  const _ENDPOINT = `https://zbank.samdev.es/v1/users?userID=${ userID }`;
  const config: RequestInit = {
    headers: { "x-token": token },
  };
  try {
    const res = await fetch(_ENDPOINT, config);
    const refreshedData = await res.json();
    return refreshedData;
  } catch (error) {
    throw new Error("Error when login in user");
  }
};
