import React from "react";
import "./Header2.css";
import YodaProfilePicture from "../../static/yodabb.jpg";

const Header2 = () => {
	return (
		<nav className="navbar navbar-dark bg-dark" role="navigation">
			<div className="container-fluid">
				<div className="row col-12 p-0">
					<div className="col-12 d-flex">
						<div
							className="rounded-circle border"
							id="userImgContainer"
						>
							<a href="/user">
								<img
									src={YodaProfilePicture}
									class="rounded-circle border border-3 border-success"
									alt="[]"
									id="userProfileImg"
								/>
							</a>
						</div>
						<div className="pt-1 ps-3 col-10">
							<span className="text-success">2500 $</span>
							<br />
							<span className="fw-bold" id="userName">
								Yoda Bebe
							</span>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header2;
