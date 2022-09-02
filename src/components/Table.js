import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import axios from "axios";
import brightness from '../store';
import TableHead from './TableHead';
import Filter from './Filter';

const Table = () => {
	const [vehicles, setVehicles] = useState();
	const [input, setInput] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [sort, setSort] = useState();
	const [order, setOrder] = useState();
	const [displayFilterBtns, setDisplayFilterBtns] = useState(false);
	const [filterBy, setFilterBy] = useState();
	const [filterQuery, setFilterQuery] = useState();
	const [searchQuery, setSearchQuery] = useState();
	const edit = ["Make", "Name", "Year", "Price"];
	const filterEdit = [edit[0], ...edit.slice(2)];

	useEffect(() => {
		if (!input.length < 1) {
			setSearchQuery(`${!filterQuery ? 'where ' : ''}name like '%${input}%' or make like '%${input}%' or year like '%${input}%' or price like '%${input}%'`);
		} else {
			setSearchQuery()
		}
	}, [input, searchQuery, filterQuery]);

 	useEffect(() => {
		if (filterQuery && !searchQuery) {
			console.log(filterQuery);
		} else if (!filterQuery && searchQuery) {
			console.log(searchQuery);
		} else if (filterQuery && searchQuery) {
			console.log(`${filterQuery} and ${searchQuery}`);
		}
		axios({
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
					`${filterQuery} and (${searchQuery})` :
					null
			}
		})
		.then(res => {
			setVehicles(res.data.item); 
			setTotalPages(Math.ceil(res.data.totalRecords/res.data.recordsPerPage))
		})
		.catch(err => console.error(err));
	}, [page, totalPages, sort, order, filterQuery, searchQuery]);

	useEffect(() => {
		setPage(1);
	}, [filterQuery]);

	const closeFilter = () => {
		setDisplayFilterBtns(prev => !prev);
		setFilterBy();
		setFilterQuery();
	}
	return (
		<main className={brightness.darkMode ? 'all_color_white' : ''}>
			<div id='filter'>
				<div>
					<button onClick={closeFilter}>Filter</button>
					<button id='create_btn'><Link to={'create'}>Create new car</Link></button>
				</div>
				{displayFilterBtns && (
					<div>
						{filterEdit.map((elem, index) => 
							<button key={index} onClick={() => setFilterBy(elem)}>{elem}</button>
						)}
					</div>
				)}
				<Filter filterName={filterBy} setFilterQuery={setFilterQuery} />
			</div>
			<input id='search_input' className={!brightness.darkMode ? 'sun_color_full_border' : 'moon_color_full_border'} type="text" placeholder='Search' value={input} onInput={(e) => setInput(e.currentTarget.value)} />
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
			{vehicles && vehicles.map((elem, index) => (
				<div key={index} className={`list ${!brightness.darkMode ? 'sun_color_border sun_color_hover' : 'moon_color_border moon_color_hover'}`}>
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