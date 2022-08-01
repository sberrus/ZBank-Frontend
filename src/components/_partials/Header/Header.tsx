//Imports
import { Link } from "react-router-dom";

//Estilos
import "./Header.css";

//TODO: Crear funcionalidad para avatares.
import YodaProfilePicture from "../../../static/yodabb.jpg";

//Contexto
import UseAuth from "../../../context/Auth/UseAuth";

const Header = () => {
	//Context
	const auth = UseAuth();

	const handleLogout = () => {
		auth && auth.logout();
	};
	return (
		<>
			<nav
				className="navbar navbar-light mb-3 border-bottom shadow container-fluid position-sticky top-0 bg-light"
				role="navigation"
			>
				<div className="d-flex justify-content-between w-100 container">
					<div className="pt-1 col-10" id="uernameContainer">
						<div className="d-flex">
							<div className="me-3">
								<Link to="/dashboard">
									<img
										src={YodaProfilePicture}
										className="rounded-circle border border-3"
										alt="[]"
										id="userProfileImg"
									/>
								</Link>
							</div>
							<div className="me-5">
								<h5 className="fw-bold p-0 m-0" id="username">
									{auth?.user?.username}
								</h5>
								<small id="userID" className="d-block">
									ID: {auth?.user?.userID}
								</small>
							</div>
							<div className="d-flex flex-column">
								<h2 className="text-success m-auto pb-3" id="account-balance">
									{new Intl.NumberFormat("de-DE").format(parseInt(`${auth?.user?.balance}`))}[$]
								</h2>
							</div>
						</div>
					</div>
					<div id="logOut" className="d-flex justify-content-end col-2">
						<button
							className="btn btn-outline-danger"
							onClick={() => {
								handleLogout();
							}}
						>
							<i className="bi bi-box-arrow-right fs-5"></i>
						</button>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
