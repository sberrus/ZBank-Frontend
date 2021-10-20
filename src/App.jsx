import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Header from "./components/_partials/Header";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Login />
		</BrowserRouter>
	);
}

export default App;
