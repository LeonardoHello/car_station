import { Link } from 'react-router-dom';
import low from '../car-images/low.jpg'
import mediumLow from '../car-images/medium-low.jpg'
import mediumHigh from '../car-images/medium-high.jpg'
import high from '../car-images/high.jpg'

const CarInfo = ({ name, make, year, price, brightness }) => {
	return (
		<main id='car_info_main' className={!brightness ? 'all_color_white' : ''}>
			<div id='edit_btns'>
				<p><Link to={'../'}>Go back</Link></p>
				<p><Link to={'edit'}>Edit</Link></p>
			</div>
			<img src={price < 100000 ? low : price < 250000 ? mediumLow : price < 500000 ? mediumHigh : high} alt="car" />
			<h1>{make}, {name} {year}</h1>
			<h2>${price.toLocaleString('en-US')}</h2>
			<p>Design work of the first generation {name} Series began in 1984, with final design phase and production development starting in 1986. The car debuted at the 1989 Frankfurt Motor Show, and was produced until 1999. {name} was designed to move beyond the market of the original E24 6 Series, featuring greater performance and an increased price. {name} was the first road car to offer a V12 engine mated to a 6-speed manual transmission and was one of the first vehicles to be fitted with electronic drive-by-wire throttle. {name} was also one of BMW's first cars to use a multi-link rear axle.</p>
		</main>
	)
}

export default CarInfo