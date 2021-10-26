import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
	return (
		<div className="position-sticky w-100 top-0" id="navBarHeader">
			<nav className="navbar navbar-dark bg-dark">
				<div className="container">
					<Link to="/" className="navbar-brand">
						ZBank
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item"></li>
							<li className="nav-item">
								<Link className="nav-link" to="/user">
									User
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/transaction">
									Transaction
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/transaction-forzed-error"
								>
									Forzed 404
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
