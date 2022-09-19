// styles
import "./Header.css";
// assets
import Logo from "../../../assets/logo/logo.svg";
// context
import UseAuth from "../../../context/Auth/UseAuth";
import { Container, Navbar } from "react-bootstrap";

const Header = () => {
	//Context
	const auth = UseAuth();

	const handleLogout = () => {
		auth?.logout();
	};
	return (
		<>
			<Navbar expand="lg" variant="dark" bg="dark">
				<Container>
					<Navbar.Brand href="#">
						<img alt="logo" src={Logo} width="30" height="30" className="d-inline-block align-top" />{" "}
						{auth?.user?.username}
					</Navbar.Brand>
					<button
						className="btn btn-outline-danger"
						onClick={() => {
							handleLogout();
						}}
					>
						<i className="bi bi-box-arrow-right fs-5"></i>
					</button>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
