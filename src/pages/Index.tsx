// styles
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UseAuth from "../context/Auth/UseAuth";
import style from "./Index.module.scss";

const Index = () => {
	const auth = UseAuth();
	const navigate = useNavigate();
	useEffect(() => {
		auth && auth.isLogged() && navigate("/dashboard");
		return () => {};
	}, []);
	return (
		<div className={style.mainBackground}>
			{/* content */}
			<div className={style.content}>
				{/* top decoration */}
				<div className={style.animationContainer}>
					<div>animation</div>
				</div>

				{/* cta */}
				<div className={style.ctaContainer}>
					{/* copy */}
					<div className={style.copy}>
						<h1>Put any awesome copy here</h1>
						<p>Lets talk about money</p>

						{/* cta button */}
						<Link to="/login" className={style.ctaButton}>
							Get Started
						</Link>
					</div>
				</div>
			</div>

			{/* background decoration */}
			<div className={style.blobTop}></div>
			<div className={style.blobBottom}></div>
		</div>
	);
};

export default Index;
