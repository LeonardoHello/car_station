import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const AppLayout = () => {
	const [darkTheme, setDarkTheme] = useState(true);

	return (
		<div className={`app ${darkTheme ? "dark" : "light"}`}>
			<header className="header">
				<Link to={"/"} className="header__titleContainer">
					<div className="header__title">CAR_STAT</div>
					<span className="header__cursor" />
				</Link>
				<div
					className="theme"
					onClick={() => setDarkTheme((prev) => !prev)}
				>
					<div className="theme__iconContainer">
						{darkTheme ? (
							<span className={"material-symbols-outlined theme__icon "}>
								dark_mode
							</span>
						) : (
							<span className={"material-symbols-outlined  theme__icon"}>
								light_mode
							</span>
						)}
					</div>
				</div>
			</header>
			<Outlet />
		</div>
	);
};

export default AppLayout;
