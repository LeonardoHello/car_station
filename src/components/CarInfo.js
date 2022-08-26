import { Link } from 'react-router-dom'

const CarInfo = ({ name, year, image, price, id, make, makeId }) => {
	return (
		<main>
			<button><Link to={'/car-search'}>Go Back</Link></button>
		</main>
	)
}

export default CarInfo