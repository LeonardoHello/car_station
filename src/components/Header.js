import { useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";

const Header = ({ brightness, setBrightness }) => {
	useEffect(() => {
		if (brightness) {
			document.getElementById('root').classList.remove('dark_bg');
		} else {
			document.getElementById('root').classList.add('dark_bg');
		}
	}, [brightness]);
	return (
		<>
			<header>
				<h1 id='logo' className={brightness ? 'sun_color' : 'moon_color'}><Link to={"/"}>Car Search</Link></h1>
				<div id='brightness' onClick={() => setBrightness(prev => !prev)}>
					<span className={`material-symbols-outlined left sun_color ${brightness ? 'left' : 'right opacity_0'}`}>radio_button_unchecked</span>
					<span className={`material-symbols-outlined left moon_color ${brightness ? 'left opacity_0' : 'right'}`}>dark_mode</span>
				</div>
			</header>
			<Outlet />
		</>
	)
}

export default Header