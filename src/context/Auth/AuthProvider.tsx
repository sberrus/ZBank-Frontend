// imports
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// helpers
import { loginUser, registerUser } from "helpers/auth.helper";
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
				const loginResponse = await loginUser({ username, password });
				// set global user
				setUser(loginResponse.usuario);
				// persist data in localstorage
				localStorage.setItem("currentUser", JSON.stringify(loginResponse.usuario));
				localStorage.setItem("x-token", loginResponse.token);
				// navigate
				navigate("/dashboard");
			} catch (error) {
				console.log("🚀 ~ file: AuthProvider.tsx ~ line 33 ~ login ~ error", error);
				// use notifier
			}
		},
		async register({ username, password, passwordConfirm }) {
			try {
				const registerResponse = await registerUser({ username, password, passwordConfirm });
				// set global user
				setUser(registerResponse.user);
				// persist data in localstorage
				localStorage.setItem("currentUser", JSON.stringify(registerResponse.user));
				localStorage.setItem("x-token", registerResponse.token);
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
