/**
 * Global context object
 */
export interface AuthContextType {
	user: UserType | null;
	login: ({ username, password }: LoginRawData) => void;
	logout: () => void;
	isLogged: () => boolean;
}

/**
 * global user object
 */
export type UserType = {
	userID: string;
	username: string;
	role: "USER_ROLE" | "ADMIN_ROLE";
	balance: number;
	status: boolean;
	uid: string;
};

/**
 * Data retrived in login form
 */
export type LoginRawData = {
	username: string;
	password: string;
};

/**
 * auth-login succesfully response
 */
export type LoginResponse = {
	usuario: UserType;
	token: string;
};
