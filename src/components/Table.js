import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import axios from "axios";
import brightness, { sort, order, currentFilter, vehicleModel } from '../store';
import TableHead from './TableHead';
import Filter from './Filter';

const info = ["Make", "Name", "Year", "Price"];
const filterCategories = [info[0], ...info.slice(2)];
const rppList = [10, 25, 50, 100];

const filterStyling = (name) => {
	if (!name) return
	return {
		border: `${!brightness.darkMode ? '3px solid #ff008030' : '3px solid #8983f7'}`,
		color: `${!brightness.darkMode ? '#ff008030' : '#8983f7'}`,
		fontWeight: '600',
	}
}
const rppStyling = (name) => {
	if (!name) return
	return {
		opacity: '.4'
	}
}

const Table = () => {
	const [vehicles, setVehicles] = useState();
	const [rpp, setRpp] = useState(10);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [displayFilterBtns, setDisplayFilterBtns] = useState(false);
	const [filterCategory, setFilterCategory] = useState();
	const [filterQuery, setFilterQuery] = useState();
	const [searchQuery, setSearchQuery] = useState();
	const [vehicleYears, setVehicleYears] = useState();
	const [rootWidth, setRootWidth] = useState();


	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => setRootWidth(entries[0].contentRect.width))
		resizeObserver.observe(document.querySelector('body'));
		return () => resizeObserver.disconnect();
	}, [rootWidth]);

	useEffect(() => setPage(1), [filterQuery, searchQuery, totalPages]);

 	useEffect(() => {
		const cancelRequest = axios.CancelToken.source();
		axios({
			cancelToken: cancelRequest.token,
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
			params: {
				rpp: rpp,
				page: page,
				sort: sort.value !== 'year' && sort.value !== 'price' && `${sort.value}|${order.direction}`,
				searchQuery: 
					sort.value === 'year' || sort.value === 'price' ?
						filterQuery && !searchQuery ? 
						`${filterQuery} order by cast(${sort.value} as int) ${order.direction}` : 
						!filterQuery && searchQuery ? 
						`${searchQuery} order by cast(${sort.value} as int) ${order.direction}` :
						filterQuery && searchQuery ?
						`${filterQuery} and (${searchQuery.replace('where ', '')}) order by cast(${sort.value} as int) ${order.direction}` :
						`order by cast(${sort.value} as int) ${order.direction}` 
				  : 
						filterQuery && !searchQuery ? 
						filterQuery : 
						!filterQuery && searchQuery ? 
						searchQuery :
						filterQuery && searchQuery ?
						`${filterQuery} and (${searchQuery.replace('where ', '')})` :
						null
			}
		})
		.then(res => {
			setVehicles(res.data.item); 
			setTotalPages(Math.ceil(res.data.totalRecords/res.data.recordsPerPage))
		})
		.catch(err => console.error(err));
		return () => cancelRequest.cancel();
	}, [rpp, page, sort.value, order.direction, filterQuery, searchQuery]);

	const updatingSearchQuery = (e) => {
		if (e.currentTarget.value.trim().replace(/\s+/g, '-').length < 1) return setSearchQuery();
	
		setSearchQuery(`where name like '%${e.currentTarget.value.trim().replace(/\s+/g, '-')}%' or make like '%${e.currentTarget.value.trim().replace(/\s+/g, '-')}%' or year like '%${e.currentTarget.value.trim().replace(/\s+/g, '-')}%' or price like '%${e.currentTarget.value.trim().replace(/\s+/g, '-')}%'`);
	}

	const displayFilterCategories = (name) => {
		if (filterCategory !== name) return setFilterCategory(name)
			
		currentFilter.removingValue();
		setFilterCategory(); 
		setFilterQuery();
	}

	const settingVehicleYears = () => {
		if (!vehicleModel.collection) return
		
		const years = [];
		vehicleModel.collection.map(elem => !years.includes(parseInt(elem.year)) ? years.push(parseInt(elem.year)) : null);
		setVehicleYears(years);
	}

	const closeFilterBtn = () => {
		setDisplayFilterBtns(prev => !prev);
		setFilterCategory();
		currentFilter.removingValue();
		setFilterQuery();
	}

	return (
		<main className={brightness.darkMode ? 'all_color_white' : ''}>
			<div id='filter'>
				<div>
					<button onClick={closeFilterBtn} style={filterStyling(displayFilterBtns)}>Filter</button>
					<button id='create_btn'>
						<Link to={'create'}>Create new car</Link>
					</button>
				</div>
				{displayFilterBtns && (
					<div>
						{filterCategories.map((elem, index) => 
							<button 
								key={index} 
								style={filterStyling(elem === filterCategory)}
								onClick={() => {
										displayFilterCategories(elem)
										if (!vehicleYears && elem === 'Year') settingVehicleYears()
									}
								}
							>
								{elem}
							</button>
						)}
					</div>
				)}
				<div id='filter_type' className={!filterCategory ? 'display_none' : ''}>
					<Filter 
						filterCategory={filterCategory} 
						setFilterQuery={setFilterQuery}
						vehicleYears={vehicleYears}
					/>
				</div>
			</div>

			<div id='search'>
				<input 
					id='search_input' 
					className={!brightness.darkMode ? 'sun_color_full_border' : 'moon_color_full_border'} 
					type="text" 
					placeholder='Search' 
					onInput={updatingSearchQuery} 
				/>
				<div id='rpp' className={!brightness.darkMode ? 'sun_color_full_border' : 'moon_color_full_border'}>
					{rppList.map((elem, index) => 
						<p 
							key={index}
							style={rppStyling(parseInt(elem) === rpp)}
							onClick={() => setRpp(parseInt(elem))} 
						>
							{elem}
						</p>)}
				</div>
			</div>
			
			<div id='table'>
				<div id='thead' className={!brightness.darkMode ? 'sun_color_bg' : 'moon_color_bg'}>
					{info.map((elem, index) => <TableHead key={index} name={elem}/>)}
				</div>
				{vehicles?.map(elem => (
					rootWidth >= 600 ?
					<div key={elem.id} className={`list ${!brightness.darkMode ? 'sun_color_border sun_color_hover' : 'moon_color_border moon_color_hover'}`}>
						<p>{elem.make.replace(/-+/g, ' ')}</p>
						<p>{elem.name.replace(/-+/g, ' ')}</p>
						<p>{elem.year}</p>
						<p>{`$${Intl.NumberFormat('en', {notation: 'compact'}).format(elem.price)}`}</p>
						<p><Link to={`${elem.id}`}>details</Link></p>
					</div> :
					<Link key={elem.id} to={`${elem.id}`} style={{transition: 'unset'}}>
						<div className={`list ${!brightness.darkMode ? 'sun_color_border sun_color_hover' : 'moon_color_border moon_color_hover'}`}>
							<p>{elem.make.replace(/-+/g, ' ')}</p>
							<p>{elem.name.replace(/-+/g, ' ')}</p>
							<p>{elem.year}</p>
							<p>{`$${Intl.NumberFormat('en', {notation: 'compact'}).format(elem.price)}`}</p>
						</div> 
					</Link>
				))}
			</div>

			<div id='paging'>
				<button 
					className={page <= 1 ? 'color_gray' : brightness.darkMode ? 'color_white' : ''} 
					onClick={() => page > 1 ? setPage(prev => prev-1) : null}
				>
					PREVIOUS
				</button>
				<p>{`${totalPages > 0 ? page : 0}/${totalPages}`}</p>
				<button 
					className={page >= totalPages  ? 'color_gray' : brightness.darkMode ? 'color_white' : ''} 
					onClick={() => page < totalPages ? setPage(prev => prev+1) : null}
				>
					NEXT
				</button>
			</div>
		</main>
	)
}

export default observer(Table)