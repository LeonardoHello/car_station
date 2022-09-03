import { useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { observer } from 'mobx-react-lite'
import brightness from '../store';

const AppLayout = () => {
	useEffect(() => {
		if (!brightness.darkMode) {
			document.getElementById('root').classList.remove('dark_bg');
		} else {
			document.getElementById('root').classList.add('dark_bg');
		}
	}, [!brightness.darkMode]);
	return (
		<>
			<header>
				<h1 id='logo' ><Link to={"/"} className={!brightness.darkMode ? 'sun_color' : 'moon_color'}>Car Search</Link></h1>
				<div id='brightness' onClick={() => brightness.toggleDarkMode()}>
					<span className={`material-symbols-outlined left sun_color ${!brightness.darkMode ? 'left' : 'right opacity_0'}`}>radio_button_unchecked</span>
					<span className={`material-symbols-outlined left moon_color ${!brightness.darkMode ? 'left opacity_0' : 'right'}`}>dark_mode</span>
				</div>
			</header>
			<Outlet />
		</>
	)
}

export default observer(AppLayout)