import { Link } from "react-router-dom"

const CarInfoForm = ({ formType, heading, path, brightness, children }) => {
	return (
		<main id='car_info_form_main' className={!brightness ? 'all_color_white' : ''}>
			<p><Link to={path}>Go back</Link></p>

			<div id='form' className={brightness ? 'sun_color_bg sun_color_outline' : 'moon_color_bg moon_color_outline'}>
				<h1>{formType} <i>{heading}</i></h1>
				{children}
			</div>
		</main>
	)
}

export default CarInfoForm