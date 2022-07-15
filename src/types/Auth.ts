export type UserType = {
	userID: string;
	username: string;
	role: "USER_ROLE" | "ADMIN_ROLE";
	balance: number;
	status: boolean;
	uid: string;
};

export interface AuthContextType {
	user: UserType | null;
	login: (user: UserType) => void;
	logout: () => void;
	isLogged: () => boolean;
}
