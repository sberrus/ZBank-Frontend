// imports
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// context
import UseAuth from "../context/Auth/UseAuth";
// styles
import style from "./Index.module.scss";

const Index = () => {
	const auth = UseAuth();
	const navigate = useNavigate();
	useEffect(() => {
		auth && auth.isLogged() && navigate("/app");
		return () => {};
	}, []);
	return (
		<Container className={style.landing}>
			<section className={style.topDecoration}>
				<div className={style.circle}></div>
				<div className={style.circleTransparent}></div>
			</section>
			<section className={style.copy}>
				<h1 className={style.title}>ZBank</h1>
				<p className={style.text}>Welcome to the next generation bank concept</p>
				<div className={style.buttonContainer}>
					<Link to="/auth/login" className={style.buttonPrimary}>
						Get Started <i className="bi bi-arrow-right"></i>
					</Link>
				</div>
			</section>
		</Container>
	);
};

export default Index;
