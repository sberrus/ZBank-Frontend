import "./App.css";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<div>
			<Router>
				<AppRouter />
			</Router>
		</div>
	);
}

export default App;
