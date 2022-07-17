import { createContext, useState } from "react";
import { AuthContextType, UserType } from "../../types/Auth";
import { ProviderPropsWithChildren } from "../../types/Utils";

//Instancia del contexto
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: ProviderPropsWithChildren) => {
	const [user, setUser] = useState<UserType | null>(() => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
		return currentUser;
	});

	let contextValue: AuthContextType = {
		user,
		login(currentUser, token = "") {
			setUser(currentUser);
			localStorage.setItem("currentUser", JSON.stringify(currentUser));

			if (token) {
				localStorage.setItem("x-token", token);
			}
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
