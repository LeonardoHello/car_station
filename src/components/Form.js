import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import brightness from '../store';

const Form = ({ formType, heading, path, children }) => {
	return (
		<main id='car_info_form_main' className={brightness.darkMode ? 'all_color_white' : ''}>
			<p><Link to={path}>Go back</Link></p>
			<div id='form' className={!brightness.darkMode ? 'sun_color_bg sun_color_outline' : 'moon_color_bg moon_color_outline'}>
				<h1>{formType} <i>{heading}</i></h1>
				{children}
			</div>
		</main>
	)
}

export default observer(Form)