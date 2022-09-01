import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import brightness from '../store';
import axios from 'axios';
import low from '../car-images/low.jpg'
import mediumLow from '../car-images/medium-low.jpg'
import mediumHigh from '../car-images/medium-high.jpg'
import high from '../car-images/high.jpg'

const CarInfo = () => {
	const { id } = useParams();
	const [carInfo, setCarInfo] = useState();

	useEffect(() => {
		axios({
			method: "get",
			url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${id}`,
		})
		.then(res => setCarInfo(res.data))
		.catch(err => console.error(err));
	}, [])
	
	return (
		carInfo && (
			<main id='car_info_main' className={brightness.darkMode ? 'all_color_white' : ''}>
				<div id='edit_btns'>
					<p><Link to={'../'}>Go back</Link></p>
					<p><Link to={'edit'}>Edit</Link></p>
				</div>
				<img 
					src={
						carInfo.price < 100000 ? 
						low : 
						carInfo.price < 250000 ? 
						mediumLow : 
						carInfo.price < 500000 ? 
						mediumHigh : high
						} 
					alt="car" 
					width="1000"
					height="1000"
				/>
				<h1>{carInfo.make.replace(/-+/g, ' ')}, {carInfo.name.replace(/-+/g, ' ')} {carInfo.year}</h1>
				<h2>${carInfo.price.toLocaleString('en-US')}</h2>
				<p>Design work of the first generation {carInfo.name.replace(/-+/g, ' ')} Series began in 1984, with final design phase and production development starting in 1986. The car debuted at the 1989 Frankfurt Motor Show, and was produced until 1999. {carInfo.name.replace(/-+/g, ' ')} was designed to move beyond the market of the original E24 {carInfo.name.replace(/-+/g, ' ')}, featuring greater performance and an increased price. {carInfo.name.replace(/-+/g, ' ')} was the first road car to offer a V12 engine mated to a 6-speed manual transmission and was one of the first vehicles to be fitted with electronic drive-by-wire throttle. {carInfo.name.replace(/-+/g, ' ')} was also one of BMW's first cars to use a multi-link rear axle.</p>
			</main>
		)
	)
}

export default observer(CarInfo)