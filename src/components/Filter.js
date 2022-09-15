import { observer } from 'mobx-react-lite'
import brightness, { vehicleMake, currentFilter } from '../store';

const prices = ['$1 - $99,999', '$100,000 - $249,999', '$250,000 - $499,999', '$500,000 -'];
const styling = (name) => {
	if (!name) return
	return {
		border: `${!brightness.darkMode ? '3px solid #ff008030' : '3px solid #8983f7'}`,
		color: `${!brightness.darkMode ? '#ff008030' : '#8983f7'}`,
		fontWeight: '600',
	}
}

const Filter = ({ filterCategory, setFilterQuery, vehicleYears }) => {
	const settingCurrentFilter = (name) => {
		currentFilter.settingValue(name);
		if (filterCategory === 'Make') {
			setFilterQuery(`where make = '${name}'`);
		} else if (filterCategory === 'Year') {
			setFilterQuery(`where year = ${name}`);
		} else if (filterCategory === 'Price') {
			if (parseInt(name.split('-')[0].replace(/[^0-9]/g, "")) === 500000) {
				setFilterQuery(`where price > ${name.split('-')[0].replace(/[^0-9]/g, "")}`);
			} else {
				setFilterQuery(`where price > ${name.split('-')[0].replace(/[^0-9]/g, "")} and price < ${name.split('-')[1].replace(/[^0-9]/g, "")}`);
			}
		}
	}

	const removingCurrentFilter = () => {
		currentFilter.removingValue();
		setFilterQuery();
	}

	return (
		filterCategory === 'Make' ?
		vehicleMake.collection?.map(elem => 
			<button 
				key={elem.id} 
				style={styling(elem.name === currentFilter.value)}
				onClick={() => 
					currentFilter.value !== elem.name ? 
					settingCurrentFilter(elem.name) : 
					removingCurrentFilter()
				} 
			>
				{elem.name}
			</button>) : 
		filterCategory === 'Year' ?
		vehicleYears?.sort().map((elem, index) => 
			<button 
				key={index} 
				style={styling(elem === currentFilter.value)} 
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
				style={styling(elem === currentFilter.value)} 
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