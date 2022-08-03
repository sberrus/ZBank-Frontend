import { Outlet } from "react-router-dom";
import style from "./MainTemplate.module.scss";
const MainTemplate = () => {
	return (
		<div className={style.mainBackground}>
			<Outlet />

			{/* background decoration */}
			<div className={style.blobTop}></div>
			<div className={style.blobBottom}></div>
		</div>
	);
};

export default MainTemplate;
