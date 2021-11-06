import "./Header2.css";
import YodaProfilePicture from "../../static/yodabb.jpg";
import { Redirect } from "react-router";

const Header2 = ({ user }) => {
	return user ? (
		<nav className="navbar navbar-dark bg-dark my-2" role="navigation">
			<div className="container-fluid">
				<div className="row col-12 p-0">
					<div className="col-12 d-flex">
						<div id="userImgContainer">
							<a href="/user">
								<img
									src={YodaProfilePicture}
									className="rounded-circle border border-3 border-success"
									alt="[]"
									id="userProfileImg"
								/>
							</a>
						</div>
						<div className="pt-1 ps-3 col-10">
							<span className="fw-bold" id="userName">
								{user.username}
							</span>
							<br />
							<h2 className="text-success">
								{new Intl.NumberFormat("de-DE").format(
									parseInt(user.balance)
								)}
								$
							</h2>
						</div>
					</div>
				</div>
			</div>
		</nav>
	) : (
		<Redirect to="/" />
	);
};

export default Header2;
