import { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite'
import brightness, { vehicleMake, vehicleModel, currentFilter } from '../store';

const Filter = ({ filterCategory, setFilterQuery }) => {
	const [vehicleYears, setVehicleYears] = useState();
	const prices = ['$1 - $99,999', '$100,000 - $249,999', '$250,000 - $499,999', '$500,000 - $999,999'];

	useEffect(() => {
		if (!vehicleModel.collection) return
		const years = [];
		vehicleModel.collection.map(elem => !years.includes(parseInt(elem.year)) ? years.push(parseInt(elem.year)) : null);
		setVehicleYears(years);
	}, [vehicleModel.collection]);

	const settingCurrentFilter = (name) => {
		currentFilter.settingValue(name);
		if (filterCategory === 'Make') {
			setFilterQuery(`where make = '${name}'`);
		} else if (filterCategory === 'Year') {
			setFilterQuery(`where year = ${name}`);
		} else if (filterCategory === 'Price') {
			setFilterQuery(`where price > ${!name.split('-')[0].includes(',') ? 
			parseInt(name.split('-')[0].slice(1)) : 
			parseInt(name.split('-')[0].split(',').join('').slice(1))} and price < ${parseInt(name.split('-')[1].split(',').join('').slice(2))}`);
		}
	}

	const removingCurrentFilter = () => {
		currentFilter.removingValue();
		setFilterQuery();
	}

	const styling = (name) => {
		return {
			border: `${name === currentFilter.value && !brightness.darkMode ? '3px solid #ff008030' : name === currentFilter.value && brightness.darkMode ? '3px solid #8983f7' : ''}`,
			color: `${name === currentFilter.value && !brightness.darkMode ? '#ff008030' : name === currentFilter.value && brightness.darkMode ? '#8983f7' : ''}`,
			fontWeight: `${name === currentFilter.value ? '600' : ''}`,
			transition: `${name === currentFilter.value ? 'unset' : ''}`
		}
	}
	return (
		filterCategory === 'Make' ?
			vehicleMake.collection && vehicleMake.collection.map(elem => 
				<button 
					key={elem.id} 
					style={styling(elem.name)}
					onClick={() => 
						currentFilter.value !== elem.name ? 
						settingCurrentFilter(elem.name) : 
						removingCurrentFilter()
					} 
				>
					{elem.name}
				</button>) : 
		filterCategory === 'Year' ?
			vehicleYears.sort().map((elem, index) => 
				<button 
					key={index} 
					style={styling(elem)} 
					onClick={() => 
						currentFilter.value !== elem ? 
						settingCurrentFilter(elem) : 
						removingCurrentFilter()
					}
				>
					{elem}
				</button>) :
		filterCategory === 'Price' ?
			prices.map((elem, index) => 
				<button 
					key={index} 
					style={styling(elem)} 
					onClick={() => 
						currentFilter.value !== elem ? 
						settingCurrentFilter(elem) : 
						removingCurrentFilter()
					}
				>
					{elem}
				</button>) :
		null
	)
}

export default observer(Filter)