import React from "react";
import "./Header2.css";
import YodaProfilePicture from "../../static/yodabb.jpg";

const Header2 = () => {
	return (
		<nav className="navbar navbar-dark bg-dark" role="navigation">
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
								Yoda Bebe
							</span>
							<br />
							<h2 className="text-success">2500 $</h2>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header2;
