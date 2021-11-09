import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function UseAuth() {
	//Custom hook para consumir el contexto
	return useContext(AuthContext);
}
