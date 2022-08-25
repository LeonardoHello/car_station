import { useState, useEffect } from 'react'
import axios from "axios";
import useAuth from "../useAuth";

const Table = ({ brightness }) => {
	const accessToken = useAuth();
	const [vehicleMake, setVehicleMake] = useState();
	const [vehicles, setVehicles] = useState();
	const [search, setSearch] = useState();
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [sort, setSort] = useState();
	const [order, setOrder] = useState();
	const [displayFilter, setDisplayFilter] = useState(false);
	const [filter, setFilter] = useState();
	const filtering = ["Make", "Name", "Year", "price"];

	useEffect(() => {
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
		console.log('$1 - $99,999'.split('-')[1].slice(2));
	}, []);

 	useEffect(() => {
		axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
			params: {
				rpp: limit,
				page: page,
				sort: sort && `${sort}|${order}`,
				searchQuery: search
			},
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => {
			console.log(res.data);
			setVehicles(res.data.item); 
			setTotalPages(Math.ceil(res.data.totalRecords/res.data.recordsPerPage))
		})
		.catch(err => console.error(err));

		if (page === 1) {
			document.getElementById('prev').classList.add('color_gray');
		} else {
			document.getElementById('prev').classList.remove('color_gray');
		}
		if (page === totalPages) {
			document.getElementById('next').classList.add('color_gray');
		} else {
			document.getElementById('next').classList.remove('color_gray');
		}
	}, [limit, page, totalPages, sort, order, search]);

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
		<main>
			<div id='filter'>
				<button onClick={() => {setDisplayFilter(prev => !prev); setFilter(); setSearch()}}>Filter</button>
				{displayFilter && 
				<div>
					{["Make", "Year", "Price"].map((elem, index) => <button key={index} onClick={() => setFilter(elem)}>{elem}</button>)}
				</div>}
				{filter === 'Make' ?
					<div className='MYP'>
						{vehicleMake.map((elem, index) => <button key={index} onClick={() => setSearch(`where make = '${elem.name}'`)}>{elem.name}</button>)}
					</div> : 
				filter === 'Year' ?
					<div className='MYP'>
						{['2015', '2016', '2017'].map((elem, index) => <button key={index} onClick={() => setSearch(`where year = ${elem}`)}>{elem}</button>)}
					</div> :
				filter === 'Price' ?
					<div className='MYP'>
						{['$1 - $99,999', '$100,000 - $249,999', '$250,000 - $499,999', '$500,000 - $999,999'].map((elem, index) => <button key={index} onClick={() => (
							setSearch(`where price > ${!elem.split('-')[0].includes(',') ? 
							parseInt(elem.split('-')[0].slice(1)) : 
							parseInt(elem.split('-')[0].split(',').join('').slice(1))} and price < ${parseInt(elem.split('-')[1].split(',').join('').slice(2))}`))
						}>{elem}</button>)}
					</div> : null}
			</div>
			<div id='thead' className='sun_color_bg'>
				{filtering.map((elem, index) => (
					<div key={index}>
						<div onClick={(e) => {
								brightness ? [...document.querySelectorAll('#thead path')].map(elem => elem.classList.replace('fill_white', 'fill_black')) : [...document.querySelectorAll('#thead path')].map(elem => elem.classList.replace('fill_black', 'fill_white'));
								if (sort !== elem.toLowerCase()) {
									setSort(elem.toLowerCase());
									setOrder('asc');
									brightness ? e.currentTarget.querySelector('#asc path').classList.replace('fill_black', 'fill_white') : e.currentTarget.querySelector('#asc path').classList.replace('fill_white', 'fill_black');
								} else if (sort === elem.toLowerCase() && order === 'asc') {
									setOrder('desc');
									brightness ? e.currentTarget.querySelector('#desc path').classList.replace('fill_black', 'fill_white') : e.currentTarget.querySelector('#desc path').classList.replace('fill_white', 'fill_black');
								} else {
									setSort();
									setOrder();
								}
							}}>
							<p>{elem}</p>
							<div className='arrows' >
								<svg id='asc' xmlns="http://www.w3.org/2000/svg" viewBox="0 5 25 15">
									<path className='fill_white' d="m12.5 18-10-9.95h20Z"/>
								</svg>
								<svg id='desc' xmlns="http://www.w3.org/2000/svg" viewBox="0 5 25 15">
									<path className='fill_white' d="m12.5 18-10-9.95h20Z" />
								</svg>
							</div>
						</div>
					</div>
				))}
			</div>
			{vehicles && vehicles.map((elem, index) => (
				<div key={index} className="list sun_color_border" >
					<p>{elem.make.split('-').join(' ')}</p>
					<p>{elem.name.split('-').join(' ')}</p>
					<p>{elem.year}</p>
					<p>{`$${elem.price.toLocaleString('en-US')}`}</p>
				</div>
			))}
			<div id='paging'>
				<button id='prev' onClick={() => page > 1 ? setPage(prev => prev-1) : null}>PREVIOUS</button>
				<p>{`${page}/${totalPages}`}</p>
				<button id='next' onClick={() => page < totalPages ? setPage(prev => prev+1) : null}>NEXT</button>
			</div>
		</main>
	)
}

export default Table