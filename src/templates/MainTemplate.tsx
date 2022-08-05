import { Outlet } from "react-router-dom";
import style from "./MainTemplate.module.scss";
const MainTemplate = () => {
	return (
		<div className={style.mainBackground}>
			<div className={style.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default MainTemplate;
