import { useEffect } from 'react';

const TableHead = ({ name, brightness, sort, setSort, order, setOrder }) => {
	useEffect(() => {
		if (brightness) {
			[...document.querySelectorAll('#thead path')].map(elem => elem.classList.remove('fill_white'));
			if (document.querySelector(`#${sort} #${order} path`) !== null) {
				document.querySelector(`#${sort} #${order} path`).classList.add('fill_white');
			}
		} else if (!brightness) {
			[...document.querySelectorAll('#thead path')].map(elem => elem.classList.add('fill_white'));
			if (document.querySelector(`#${sort} #${order} path`) !== null) {
				document.querySelector(`#${sort} #${order} path`).classList.remove('fill_white');
			}
		}
	}, [brightness])

	const settingOrder = (e) => {
		brightness ? 
		[...document.querySelectorAll('#thead path')].map(elem => elem.classList.remove('fill_white')) : 
		[...document.querySelectorAll('#thead path')].map(elem => elem.classList.add('fill_white'));

		if (sort !== name.toLowerCase()) {
			setSort(name.toLowerCase());
			setOrder('asc');
			brightness ? e.currentTarget.querySelector('#asc path').classList.add('fill_white') : e.currentTarget.querySelector('#asc path').classList.remove('fill_white');
		} else if (sort === name.toLowerCase() && order === 'asc') {
			setOrder('desc');
			brightness ? e.currentTarget.querySelector('#desc path').classList.add('fill_white') : e.currentTarget.querySelector('#desc path').classList.remove('fill_white');
		} else {
			setSort();
			setOrder();
		}
	}
	return (
		<div id={name.toLowerCase()}>
			<div onClick={settingOrder}>
				<p>{name}</p>
				<div className='arrows' >
					<svg id='asc' xmlns="http://www.w3.org/2000/svg" viewBox="0 5 25 15">
						<path d="m12.5 18-10-9.95h20Z"/>
					</svg>
					<svg id='desc' xmlns="http://www.w3.org/2000/svg" viewBox="0 5 25 15">
						<path d="m12.5 18-10-9.95h20Z" />
					</svg>
				</div>
			</div>
		</div>
	)
}

export default TableHead