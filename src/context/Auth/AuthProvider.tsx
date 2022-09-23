// imports
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// helpers
import { loginUser } from "helpers/auth.helper";
// types
import { AuthContextType, UserType } from "../../types/Auth";
import { ProviderPropsWithChildren } from "../../types/Utils";

// context
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: ProviderPropsWithChildren) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserType | null>(() => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
		return currentUser;
	});

	let contextValue: AuthContextType = {
		user,
		async login({ username, password }) {
			try {
				const userResponse = await loginUser({ username, password });
				console.log(userResponse);
				// set global user
				setUser(userResponse.usuario);
				// persist data in localstorage
				localStorage.setItem("currentUser", JSON.stringify(userResponse.usuario));
				localStorage.setItem("x-token", userResponse.token);
				// navigate
				navigate("/dashboard");
			} catch (error) {
				console.log("🚀 ~ file: AuthProvider.tsx ~ line 26 ~ login ~ error", error);
				// use notifier
			}
		},
		logout() {
			localStorage.removeItem("currentUser");
			localStorage.removeItem("x-token");
			setUser(null);
			navigate("/");
		},
		isLogged() {
			return !!user;
		},
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

//Exportamos el provider del contexto para que este sea un componente de alto orden y el contexto pueda ser accedido desde cualquier parte del programa.
export default AuthProvider;
