import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import useAuth from "../useAuth";
import TableHead from './TableHead';
import Filter from './Filter';

const Table = ({ brightness }) => {
	const accessToken = useAuth();
	const [vehicleMake, setVehicleMake] = useState();
	const [vehicles, setVehicles] = useState();
	const [search, setSearch] = useState();
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [sort, setSort] = useState();
	const [order, setOrder] = useState();
	const [displayFilter, setDisplayFilter] = useState(false);
	const [filter, setFilter] = useState();
	
	const edit = ["Make", "Name", "Year", "Price"];
	const filterEdit = [edit[0], ...edit.slice(2)];
	
	useEffect(() => {
		if (filter === "Make") {
			axios({
				method: "get",
				url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake",
				params: {
					rpp: 50
				},
				headers: {
					"Content-Type": "application/json"
				}
			}).then(res => setVehicleMake(res.data.item))
			.catch(err => console.error(err));
		}
	}, [filter])

 	useEffect(() => {
		axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
			params: {
				rpp: 10,
				page: page,
				sort: sort && `${sort}|${order}`,
				searchQuery: search
			},
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => {
			setVehicles(res.data.item); 
			setTotalPages(Math.ceil(res.data.totalRecords/res.data.recordsPerPage))
		})
		.catch(err => console.error(err));
	}, [page, totalPages, sort, order, search]);

	useEffect(() => {
		setPage(1);
	}, [search]);

	const closeFilter = () => {
		setDisplayFilter(prev => !prev);
		setFilter();
		setSearch();
	}

	/* const send = () => {
		if (!vehicleModel) return
		vehicleModel.map(elemA => {
			vehicleMake.map(elemB => {
				if (elemA.make === elemB.name) {
					axios({
						method: "post",
						url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel`,
						headers: {
							Authorization: `bearer ${accessToken}`,
							"Content-Type": "application/json"
						},
						data: {
							description: 'Model',
							name: elemA.model,
							make: elemA.make,
							make_id: elemB.id,
							price: elemA.price,
							year: elemA.year,
							image: elemA.img_url
						}
					}).then(res => console.log(res.data))
					.catch(err => console.error(err))
				}
			})
		})
	} */
	return (
		<main id='table' className={!brightness ? 'all_color_white' : ''}>
			<div id='filter'>
				<button onClick={closeFilter}>Filter</button>
				{displayFilter && (
					<div>
						{filterEdit.map((elem, index) => <button key={index} onClick={() => setFilter(elem)}>{elem}</button>)}
					</div>
				)}
				{filterEdit.map((elem, index) => elem === filter ?
					<Filter 
						key={index} 
						filterName={elem}
						vehicleMake={vehicleMake}
						setSearch={setSearch}
					/> 
				: null)}
			</div>
			<div id='thead' className={brightness ? 'sun_color_bg' : 'moon_color_bg'}>
				{edit.map((elem, index) => 
					<TableHead 
						key={index}
						name={elem}
						brightness={brightness}
						order={order}
						setOrder={setOrder}
						sort={sort}
						setSort={setSort}
					/>)}
			</div>
			{vehicles && vehicles.map((elem, index) => (
				<div key={index} className={`list ${brightness ? 'sun_color_border' : 'moon_color_border'}`}>
					<p>{elem.make.split('-').join(' ')}</p>
					<p>{elem.name.split('-').join(' ')}</p>
					<p>{elem.year}</p>
					<p>{`$${elem.price.toLocaleString('en-US')}`}</p>
					<p><Link to={`/car-search/${elem.make}/${elem.name}`}>details</Link></p>
				</div>
			))}
			<div id='paging'>
				<button className={page <= 1 ? 'color_gray' : !brightness ? 'color_white' : ''} onClick={() => page > 1 ? setPage(prev => prev-1) : null}>PREVIOUS</button>
				<p>{`${page}/${totalPages}`}</p>
				<button className={page >= totalPages  ? 'color_gray' : !brightness ? 'color_white' : ''} onClick={() => page < totalPages ? setPage(prev => prev+1) : null}>NEXT</button>
			</div>
		</main>
	)
}

export default Table