import { observer } from 'mobx-react-lite'
import brightness, { sort, order } from '../store';

const TableHead = ({ name }) => {
	const settingOrder = () => {
		if (sort.value !== name.toLowerCase()) {
			sort.settingValue(name);
			order.ascending();
		} else if (sort.value === name.toLowerCase() && order.direction === 'asc') {
			order.descending();
		} else {
			sort.removingValue();
			order.none();
		}
	}

	return (
		<div>
			<div onClick={settingOrder}>
				<p>{name}</p>
				<div className={`arrows ${name.toLowerCase()}`} >
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 5 25 15">
						<path 
							d="m12.5 18-10-9.95h20Z"
							className={
								sort.value === name.toLowerCase() && order.direction === 'asc' ? 
									!brightness.darkMode ?
									'fill_white' :
									''
								:
									brightness.darkMode ?
									'fill_white' :
									''
							}
						/>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 5 25 15">
						<path 
							d="m12.5 18-10-9.95h20Z"
							className={
								sort.value === name.toLowerCase() && order.direction === 'desc' ? 
									!brightness.darkMode ?
									'fill_white' :
									''
								:
									brightness.darkMode ?
									'fill_white' :
									''
							}
						/>
					</svg>
				</div>
			</div>
		</div>
	)
}

export default observer(TableHead)