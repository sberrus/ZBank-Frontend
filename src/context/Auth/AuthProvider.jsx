import React, { createContext, useEffect, useState } from "react";

//Instancia del contexto
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	//inicializamos un state para comprobar que haya un usuario existente en el localstorage. De lo contrario el contexto devolverá null.
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);
	useEffect(() => {
		//Handle localstorage compatibility
		try {
			localStorage.setItem("currentUser", JSON.stringify(user));
		} catch (error) {
			localStorage.removeItem("currentUser");
			//Manejamos el error como sea conveniente.
			console.log(error);
		}
	}, [user]);

	let contextValue = {
		user,
		login(currentUser) {
			setUser(currentUser);
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
