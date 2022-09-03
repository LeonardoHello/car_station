import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import axios from "axios";
import brightness from '../store';
import TableHead from './TableHead';
import Filter from './Filter';

const Table = () => {
	const [vehicles, setVehicles] = useState();
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [sort, setSort] = useState();
	const [order, setOrder] = useState();
	const [displayFilterBtns, setDisplayFilterBtns] = useState(false);
	const [filterBy, setFilterBy] = useState();
	const [currentFilter, setCurrentFilter] = useState();
	const [filterQuery, setFilterQuery] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const edit = ["Make", "Name", "Year", "Price"];
	const filterEdit = [edit[0], ...edit.slice(2)];

 	useEffect(() => {
		const cancelRequest = axios.CancelToken.source();
		axios({
			cancelToken: cancelRequest.token,
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
			params: {
				rpp: 10,
				page: page,
				sort: sort && `${sort}|${order}`,
				searchQuery: 
					filterQuery && !searchQuery ? 
					filterQuery : 
					!filterQuery && searchQuery ? 
					searchQuery :
					filterQuery && searchQuery ?
					`${filterQuery} and (${searchQuery.split(' ').slice(1).join(' ')})` :
					null
			}
		})
		.then(res => {
			setVehicles(res.data.item); 
			setTotalPages(Math.ceil(res.data.totalRecords/res.data.recordsPerPage))
		})
		.catch(err => console.error(err));

		return () => cancelRequest.cancel();
	}, [page, sort, order, filterQuery, searchQuery]);

	useEffect(() => {
		setPage(1);
	}, [filterQuery]);

	const closeFilter = () => {
		setDisplayFilterBtns(prev => !prev);
		setFilterBy();
		setFilterBy()
		setFilterQuery();
		setCurrentFilter();
	}

	const updatingQuery = (e) => {
		if (e.currentTarget.value.trim().replace(/\s+/g, '-').length < 1) return setSearchQuery();

		setSearchQuery(`where name like '%${e.currentTarget.value.trim().replace(/\s+/g, '-')}%' or make like '%${e.currentTarget.value.trim().replace(/\s+/g, '-')}%' or year like '%${e.currentTarget.value.trim().replace(/\s+/g, '-')}%' or price like '%${e.currentTarget.value.trim().replace(/\s+/g, '-')}%'`);
	}

	const styling = (name) => {
		return	{
			border: `${name && !brightness.darkMode ? '3px solid #ff008030' : name && brightness.darkMode ? '3px solid #8983f7' : ''}`,
			color: `${name && !brightness.darkMode ? '#ff008030' : name && brightness.darkMode ? '#8983f7' : ''}`,
			fontWeight: `${name ? '600' : ''}`,
			transition: `${name ? 'unset' : ''}`
		}
	}
	return (
		<main className={brightness.darkMode ? 'all_color_white' : ''}>
			<div id='filter'>
				<div>
					<button 
						onClick={closeFilter}
						style={styling(displayFilterBtns)} 
					>
						Filter
					</button>
					<button id='create_btn'><Link to={'create'}>Create new car</Link></button>
				</div>
				{displayFilterBtns && (
					<div>
						{filterEdit.map((elem, index) => 
							<button 
								key={index} 
								onClick={() => setFilterBy(elem)}
								style={styling(elem === filterBy)} 
							>
								{elem}
							</button>
						)}
					</div>
				)}
				<Filter 
					filterName={filterBy} 
					setFilterQuery={setFilterQuery} 
					currentFilter={currentFilter} 
					setCurrentFilter={setCurrentFilter} 
				/>
			</div>
			<input id='search_input' className={!brightness.darkMode ? 'sun_color_full_border' : 'moon_color_full_border'} type="text" placeholder='Search' onInput={updatingQuery} />
			<div id='thead' className={!brightness.darkMode ? 'sun_color_bg' : 'moon_color_bg'}>
				{edit.map((elem, index) => 
					<TableHead 
						key={index}
						name={elem}
						order={order}
						setOrder={setOrder}
						sort={sort}
						setSort={setSort}
					/>)}
			</div>
			{vehicles && vehicles.map(elem => (
				<div key={elem.id} className={`list ${!brightness.darkMode ? 'sun_color_border sun_color_hover' : 'moon_color_border moon_color_hover'}`}>
					<p>{elem.make.replace(/-+/g, ' ')}</p>
					<p>{elem.name.replace(/-+/g, ' ')}</p>
					<p>{elem.year}</p>
					<p>{`$${elem.price.toLocaleString('en-US')}`}</p>
					<p><Link to={`${elem.id}`}>details</Link></p>
				</div>
			))}
			<div id='paging'>
				<button className={page <= 1 ? 'color_gray' : brightness.darkMode ? 'color_white' : ''} onClick={() => page > 1 ? setPage(prev => prev-1) : null}>PREVIOUS</button>

				<p>{`${totalPages > 0 ? page : 0}/${totalPages}`}</p>
				
				<button className={page >= totalPages  ? 'color_gray' : brightness.darkMode ? 'color_white' : ''} onClick={() => page < totalPages ? setPage(prev => prev+1) : null}>NEXT</button>
			</div>
		</main>
	)
}

export default observer(Table)