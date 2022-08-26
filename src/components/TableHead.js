import React from 'react'

const TableHead = ({ name, brightness, sort, setSort, order, setOrder }) => {
	return (
		<div>
			<div onClick={(e) => {
					brightness ? 
					[...document.querySelectorAll('#thead path')].map(elem => elem.classList.replace('fill_white', 'fill_black')) : 
					[...document.querySelectorAll('#thead path')].map(elem => elem.classList.replace('fill_black', 'fill_white'));

					if (sort !== name.toLowerCase()) {
						setSort(name.toLowerCase());
						setOrder('asc');
						brightness ? e.currentTarget.querySelector('#asc path').classList.replace('fill_black', 'fill_white') : e.currentTarget.querySelector('#asc path').classList.replace('fill_white', 'fill_black');
					} else if (sort === name.toLowerCase() && order === 'asc') {
						setOrder('desc');
						brightness ? e.currentTarget.querySelector('#desc path').classList.replace('fill_black', 'fill_white') : e.currentTarget.querySelector('#desc path').classList.replace('fill_white', 'fill_black');
					} else {
						setSort();
						setOrder();
					}
				}}>
				<p>{name}</p>
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
	)
}

export default TableHead