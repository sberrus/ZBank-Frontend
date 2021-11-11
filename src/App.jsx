import "./App.css";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

import AuthProvider from "./Contexts/Auth/AuthProvider";

function App() {
	return (
		<AuthProvider>
			<Router>
				<AppRouter />
			</Router>
		</AuthProvider>
	);
}

export default App;
