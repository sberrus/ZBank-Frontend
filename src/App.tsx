import AppRouter from "./routers/AppRouter";
import "./styles/global.scss";

import AuthProvider from "./context/Auth/AuthProvider";

function App() {
	return (
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	);
}

export default App;
