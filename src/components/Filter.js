import { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite'
import brightness, { vehicleMake, vehicleModel } from '../store';

const Filter = ({ filterName, setFilterQuery, currentFilter, setCurrentFilter }) => {
	const [vehicleYears, setVehicleYears] = useState();
	const prices = ['$1 - $99,999', '$100,000 - $249,999', '$250,000 - $499,999', '$500,000 - $999,999'];

	useEffect(() => {
		if (!vehicleModel.collection) return
		const years = [];
		vehicleModel.collection.map(elem => !years.includes(parseInt(elem.year)) ? years.push(parseInt(elem.year)) : null);
		setVehicleYears(years);
	}, [vehicleModel.collection]);

	const settingCurrentFilter = (name) => {
		setCurrentFilter(name);
		if (filterName === 'Make') {
			setFilterQuery(`where make = '${name}'`);
		} else if (filterName === 'Year') {
			setFilterQuery(`where year = ${name}`);
		} else if (filterName === 'Price') {
			setFilterQuery(`where price > ${!name.split('-')[0].includes(',') ? 
			parseInt(name.split('-')[0].slice(1)) : 
			parseInt(name.split('-')[0].split(',').join('').slice(1))} and price < ${parseInt(name.split('-')[1].split(',').join('').slice(2))}`);
		}
	}

	const styling = (name) => {
		return	{
			border: `${name === currentFilter && !brightness.darkMode ? '3px solid #ff008030' : name === currentFilter && brightness.darkMode ? '3px solid #8983f7' : ''}`,
			color: `${name === currentFilter && !brightness.darkMode ? '#ff008030' : name === currentFilter && brightness.darkMode ? '#8983f7' : ''}`,
			fontWeight: `${name === currentFilter ? '600' : ''}`,
			transition: `${name === currentFilter ? 'unset' : ''}`
		}
	}
	return (
		<div id='filter_type'>
			{filterName === 'Make' ?
				vehicleMake.collection && vehicleMake.collection.map(elem => 
					<button 
						key={elem.id} 
						onClick={() => settingCurrentFilter(elem.name)} 
						style={styling(elem.name)}
					>
						{elem.name}
					</button>) : 
			filterName === 'Year' ?
				vehicleYears.sort().map((elem, index) => 
					<button 
						key={index} 
						onClick={() => settingCurrentFilter(elem)}
						style={styling(elem)} 
					>
						{elem}
					</button>) :
			filterName === 'Price' ?
				prices.map((elem, index) => 
					<button 
						key={index} 
						onClick={() => settingCurrentFilter(elem)}
						style={styling(elem)} 
					>
						{elem}
					</button>) :
			null}
		</div>
	)
}

export default observer(Filter)