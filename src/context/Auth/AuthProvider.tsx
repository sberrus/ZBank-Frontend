import React, { createContext, useState } from "react";
type AuthProviderProps = {
	children: JSX.Element;
};
type UserType = {
	userID: string;
	username: string;
	role: "USER_ROLE" | "ADMIN_ROLE";
	balance: number;
	status: boolean;
	uid: string;
};
//Instancia del contexto
export const AuthContext = createContext({});

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<UserType | null>(() => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
		return currentUser;
	});

	let contextValue = {
		user,
		login(currentUser: any) {
			setUser(currentUser);
			localStorage.setItem("currentUser", JSON.stringify(currentUser));
		},
		logout() {
			localStorage.removeItem("currentUser");
			localStorage.removeItem("x-token");
			setUser(null);
		},
		isLogged() {
			return !!user;
		},
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

//Exportamos el provider del contexto para que este sea un componente de alto orden y el contexto pueda ser accedido desde cualquier parte del programa.
export default AuthProvider;
