import UseAuth from "../../../../Contexts/Auth/UseAuth";
import { Link } from "react-router-dom";

const OffsetNavBar = () => {
	//Context
	const auth = UseAuth();

	//Handle Logout
	const handleLogout = () => {
		auth.logout();
	};
	return (
		<div>
			<button
				className="btn btn-dark border-secondary"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#offcanvasRight"
				aria-controls="offcanvasRight"
			>
				<i className="bi bi-list"></i>
			</button>

			<div
				className="offcanvas offcanvas-end bg-dark"
				tabIndex="-1"
				id="offcanvasRight"
				aria-labelledby="offcanvasRightLabel"
			>
				<div className="offcanvas-header">
					<h5 id="offcanvasRightLabel">Menú de Navegación</h5>
					<button
						type="button"
						className="btn-close text-reset"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div className="offcanvas-body d-flex align-content-between flex-column h-100">
					<div id="menuContainer">
						<ul>
							<li>
								<Link to="/dashboard">Transferencias</Link>
							</li>
						</ul>
					</div>
					<div>
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
		</div>
	);
};

export default OffsetNavBar;
