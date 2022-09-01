import { useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import brightness from '../store';

const TableHead = ({ name, sort, setSort, order, setOrder }) => {
	useEffect(() => {
		if (document.querySelector(`.${sort} #${order} path`) !== null) {
			if (!brightness.darkMode) {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.remove('fill_white'));
				document.querySelector(`.${sort} #${order} path`).classList.add('fill_white');
			} else {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.add('fill_white'));
				document.querySelector(`.${sort} #${order} path`).classList.remove('fill_white');
			}
		} else {
			if (!brightness.darkMode) {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.remove('fill_white'));
			} else {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.add('fill_white'));
			}
		}
	}, [!brightness.darkMode]);

	useEffect(() => {
		if (document.querySelector(`.${sort} #${order} path`) !== null) {
			if (!brightness.darkMode) {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.remove('fill_white'));
				document.querySelector(`.${sort} #${order} path`).classList.add('fill_white');
			} else {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.add('fill_white'));
				document.querySelector(`.${sort} #${order} path`).classList.remove('fill_white');
			}
		}
	}, [sort, order])

	const settingOrder = () => {
		if (sort !== name.toLowerCase()) {
			setSort(name.toLowerCase());
			setOrder('asc');
		} else if (sort === name.toLowerCase() && order === 'asc') {
			setOrder('desc');
		} else {
			setSort();
			setOrder();
			if (!brightness.darkMode) {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.remove('fill_white'));
			} else {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.add('fill_white'));
			}
		}
	}
	return (
		<div>
			<div onClick={settingOrder}>
				<p>{name}</p>
				<div className={`arrows ${name.toLowerCase()}`} >
					<svg id='asc' xmlns="http://www.w3.org/2000/svg" viewBox="0 5 25 15">
						<path d="m12.5 18-10-9.95h20Z"/>
					</svg>
					<svg id='desc' xmlns="http://www.w3.org/2000/svg" viewBox="0 5 25 15">
						<path d="m12.5 18-10-9.95h20Z"/>
					</svg>
				</div>
			</div>
		</div>
	)
}

export default observer(TableHead)