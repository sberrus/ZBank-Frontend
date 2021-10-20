import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="position-sticky top-0">
			<nav className="navbar navbar-dark bg-dark">
				<div className="container">
					<Link className="navbar-brand" to="/">
						ZBank
					</Link>
				</div>
			</nav>
		</div>
	);
};

export default Header;
