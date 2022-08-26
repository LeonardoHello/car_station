import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

const Header = ({ brightness, setBrightness }) => {

	useEffect(() => {
		if (brightness) {
			document.querySelector('#brightness span:first-of-type').classList.remove('opacity_0');
			document.querySelector('#brightness span:first-of-type').classList.replace('right', 'left');
			document.querySelector('#brightness span:last-of-type').classList.add('opacity_0');
			document.querySelector('#brightness span:last-of-type').classList.replace('right', 'left');
			document.getElementById('logo').classList.replace('moon_color', 'sun_color');
			document.getElementById('thead').classList.replace('moon_color_bg', 'sun_color_bg');

			[...document.querySelectorAll('#thead path')].map(elem => elem.classList.contains('fill_white') ? elem.classList.replace('fill_white', 'fill_black') : elem.classList.replace('fill_black', 'fill_white'));
			[...document.querySelectorAll('.list')].map(elem => elem.classList.replace('moon_color_border', 'sun_color_border'));
			[...document.querySelectorAll('main p, #paging button')].map(elem => elem.classList.remove('color_white'));
			document.getElementById('root').classList.remove('dark_bg');

		} else {
			document.querySelector('#brightness span:last-of-type').classList.remove('opacity_0');
			document.querySelector('#brightness span:last-of-type').classList.replace('left', 'right');
			document.querySelector('#brightness span:first-of-type').classList.add('opacity_0');
			document.querySelector('#brightness span:first-of-type').classList.replace('left', 'right');
			document.getElementById('logo').classList.replace('sun_color', 'moon_color');
			document.getElementById('thead').classList.replace('sun_color_bg', 'moon_color_bg');
			[...document.querySelectorAll('#thead path')].map(elem => elem.classList.contains('fill_white') ? elem.classList.replace('fill_white', 'fill_black') : elem.classList.replace('fill_black', 'fill_white'));
			[...document.querySelectorAll('.list')].map(elem => elem.classList.replace('sun_color_border', 'moon_color_border'));
			[...document.querySelectorAll('main p, #paging button')].map(elem => elem.classList.add('color_white'));
				document.getElementById('root').classList.add('dark_bg');
		}
	}, [brightness]);
	return (
		<>
			<header>
				<h1 id='logo' className='sun_color'>Car Search</h1>
				<div id='brightness' onClick={() => setBrightness(prev => !prev)}>
					<span className="material-symbols-outlined left sun_color">radio_button_unchecked</span>
					<span className="material-symbols-outlined left moon_color">dark_mode</span>
				</div>
			</header>
			<Outlet />
		</>
	)
}

export default Header