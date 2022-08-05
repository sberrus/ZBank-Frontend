// imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// context
import UseAuth from "../context/Auth/UseAuth";
// styles
import style from "./Index.module.scss";
// assets
import Blob from "../assets/decoration/blob.svg";

const Index = () => {
	const auth = UseAuth();
	const navigate = useNavigate();
	useEffect(() => {
		auth && auth.isLogged() && navigate("/dashboard");
		return () => {};
	}, []);
	return (
		<div className={style.wrapper}>
			{/* cta */}
			<div className={style.ctaContainer}>
				{/* copy */}
				<div className={style.copy}>
					<h1>AWESOME COPY TEXT HERE</h1>
					<p>A place for smart investors and awesome traders</p>

					{/* cta button */}
					<Link to="/login" className={style.buttonPrimary}>
						Get Started
					</Link>
				</div>
			</div>
			<div className={style.blobContainer}>
				<img src={Blob} alt="blob decoration" className={style.blob} />
			</div>
		</div>
	);
};

export default Index;
