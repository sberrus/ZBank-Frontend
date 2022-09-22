// imports
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
// assets
import Logo from "../../../assets/logo/logo.svg";
// context
import UseAuth from "../../../context/Auth/UseAuth";
// styles
import style from "./Header.module.scss";

const Header = () => {
	//Context
	const auth = UseAuth();

	const handleLogout = () => {
		auth?.logout();
	};

	return (
		<>
			<Navbar expand="lg" variant="dark" bg="dark" className={style.navbar}>
				<Container>
					<Navbar.Brand as={Link} to="/dashboard" className={style.brand}>
						<img alt="logo" src={Logo} width="30" height="30" className="d-inline-block align-top" />{" "}
						<span className={style.username}>{auth?.user?.username}</span>
					</Navbar.Brand>
					{/* config and settings */}
					<Dropdown align="end" className={style.dropdown}>
						<Dropdown.Toggle variant="outline-success" id="dropdown-basic" className={style.button}>
							<i className="bi bi-sliders"></i>
						</Dropdown.Toggle>
						<Dropdown.Menu className={style.menu}>
							<Dropdown.Item as={Link} to="/dashboard">
								Home
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item href="#/action-3" onClick={handleLogout}>
								Log out <i className="bi bi-box-arrow-right"></i>
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
