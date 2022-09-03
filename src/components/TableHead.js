import { useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import brightness, { sort, order } from '../store';

const TableHead = ({ name }) => {
	useEffect(() => {
		if (document.querySelector(`.${sort.value} #${order.direction} path`) !== null) {
			if (!brightness.darkMode) {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.remove('fill_white'));
				document.querySelector(`.${sort.value} #${order.direction} path`).classList.add('fill_white');
			} else {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.add('fill_white'));
				document.querySelector(`.${sort.value} #${order.direction} path`).classList.remove('fill_white');
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
		if (document.querySelector(`.${sort.value} #${order.direction} path`) !== null) {
			if (!brightness.darkMode) {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.remove('fill_white'));
				document.querySelector(`.${sort.value} #${order.direction} path`).classList.add('fill_white');
			} else {
				[...document.querySelectorAll('#thead path')].map(elem => elem.classList.add('fill_white'));
				document.querySelector(`.${sort.value} #${order.direction} path`).classList.remove('fill_white');
			}
		}
	}, [sort.value, order.direction])

	const settingOrder = () => {
		if (sort.value !== name.toLowerCase()) {
			sort.settingValue(name);
			order.ascending();
		} else if (sort.value === name.toLowerCase() && order.direction === 'asc') {
			order.descending();
		} else {
			sort.removingValue();
			order.none();
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