import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import useAuth from '../useAuth';
import Input from './Input';
import CarInfoForm from "./CarInfoForm";

const EditCarInfo = ({ id, name, make, year, price, brightness }) => {
	const accessToken = useAuth();
	const [newName, setNewName] = useState(name.split('-').join(' '));
	const [newYear, setNewYear] = useState(year);
	const [newPrice, setNewPrice] = useState(price);

	const editingVehicle = () => {
		if (newName && newYear && newPrice) {
			axios({
				method: "patch",
				url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${id}`,
				headers: {
					Authorization: `bearer ${accessToken}`,
					"Content-Type": "application/json"
				},
				data: {
					name: newName.trim().split(' ').join('-'),
					price: newPrice,
					year: newYear,
				}
			}).res()
			.catch(err => console.error(err))
		}
	}

	const deletingVehicle = () => {
		axios({
			method: "delete",
			url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${id}`,
			headers: {
				Authorization: `bearer ${accessToken}`,
			}
		}).res()
		.catch(err => console.error(err))
	}

	return (
		<CarInfoForm 
			heading={`'${make.split('-').join(' ')}, ${name.trim().split('-').join(' ')}'`} 
			path={`../${make}/${name}`} 
			brightness={brightness} 
			formType={'Edit'}
		>
			<Input
				label={"Manufacturer"}
				data={make.split('-').join(' ')}
			/>
			<Input
				label={"Model"}
				data={newName}
				setData={setNewName}
			/>
			<Input
				label={"Year"}
				data={newYear}
				setData={setNewYear}
				type="number"
			/>
			<Input
				label={"Price"}
				data={newPrice}
				setData={setNewPrice}
				type="number"
			/>
			<button id='save'>
				<Link 
					to={"/car-search"} 
					onClick={editingVehicle}
				>Save
				</Link></button>
			<button id='delete'>
				<Link
					to={"/car-search"} 
					onClick={deletingVehicle}
				>Delete
				</Link>
			</button>
			<button id='cancle'>
				<Link to={`../${make}/${name}`}>Cancle</Link>
			</button>
		</CarInfoForm>
	)
}

export default EditCarInfo