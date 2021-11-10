//Imports
import { Redirect, Link } from "react-router-dom";

//Estilos
import "./Header.css";

//TODO: Crear funcionalidad para avatares.
import YodaProfilePicture from "../../static/yodabb.jpg";

//Contexto
import UseAuth from "../../Contexts/Auth/UseAuth";

const Header = ({ user }) => {
	//Context
	const auth = UseAuth();

	const handleLogout = () => {
		auth.logout();
	};
	return user ? (
		<nav className="navbar navbar-dark bg-dark my-2" role="navigation">
			<div className="container-fluid">
				<div className="d-flex justify-content-between col-12">
					<div className="col-2" id="imgContainer">
						<Link to="/dashboard">
							<img
								src={YodaProfilePicture}
								className="rounded-circle border border-3 border-success"
								alt="[]"
								id="userProfileImg"
							/>
						</Link>
					</div>
					<div className="pt-1 ps-3 col-9" id="uernameContainer">
						<h5 className="fw-bold p-0 m-0" id="username">
							{user.username}
						</h5>
						<small id="userID" className="d-block">
							ID: {user.userID}
						</small>
						<h2 className="text-success" id="account-balance">
							{new Intl.NumberFormat("de-DE").format(
								parseInt(user.balance)
							)}
							$
						</h2>
					</div>
					<div
						id="logOut"
						className="d-flex justify-content-center align-content-center col-1 m-auto"
					>
						<button
							className="btn btn-danger"
							onClick={() => {
								handleLogout();
							}}
						>
							<i className="bi bi-box-arrow-right fs-5"></i>
						</button>
					</div>
				</div>
			</div>
		</nav>
	) : (
		<Redirect to="/" />
	);
};

export default Header;
