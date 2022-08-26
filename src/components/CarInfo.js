import { Link } from 'react-router-dom';

const CarInfo = ({ name, year, image, price, id, make, makeId }) => {
	return (
		<main id='car_info'>
			<button><Link to={'/car-search'}>Go Back</Link></button>
			<div>
				<h1>name</h1>
			</div>
		</main>
	)
}

export default CarInfo