import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="position-sticky top-0">
			<nav className="navbar navbar-dark bg-dark">
				<div className="container">
					<Link to="/" className="navbar-brand" >
						ZBank
					</Link>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
							<li class="nav-item">
								<Link
									class="nav-link active"
									aria-current="page"
									href="#"
								></Link>
							</li>
							<li class="nav-item">
								<Link class="nav-link" to="/user-panel">
									User Panel
								</Link>
							</li>
							<li class="nav-item">
								<Link class="nav-link" to="/transactions">
									Transactions
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
