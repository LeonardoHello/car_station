import { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite'
import { vehicleMake, vehicleModel } from '../store';

const Filter = ({ filterName, setSearch }) => {
	const [vehicleYears, setVehicleYears] = useState();

	useEffect(() => {
		if (!vehicleModel.collection) return
		const years = [];
		vehicleModel.collection.map(elem => !years.includes(elem.year) ? years.push(elem.year) : null);
		setVehicleYears(years);
	}, [vehicleModel.collection]);

	return (
		filterName === 'Make' ?
			<div className='MYP'>
				{vehicleMake.collection && vehicleMake.collection.map((elem, index) => <button key={index} onClick={() => setSearch(`where make = '${elem.name}'`)}>{elem.name}</button>)}
			</div> : 
		filterName === 'Year' ?
			<div className='MYP filter_year'>
				{vehicleYears.sort().map((elem, index) => <button key={index} onClick={() => setSearch(`where year = ${elem}`)}>{elem}</button>)}
			</div> :
		filterName === 'Price' ?
			<div className='MYP'>
				{['$1 - $99,999', '$100,000 - $249,999', '$250,000 - $499,999', '$500,000 - $999,999'].map((elem, index) => <button key={index} onClick={() => (
					setSearch(`where price > ${
					!elem.split('-')[0].includes(',') ? 
					parseInt(elem.split('-')[0].slice(1)) : 
					parseInt(elem.split('-')[0].split(',').join('').slice(1))} and price < ${parseInt(elem.split('-')[1].split(',').join('').slice(2))}`))
				}>{elem}</button>)}
			</div> :
		null
	)
}

export default observer(Filter)