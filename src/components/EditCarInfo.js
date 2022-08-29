import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import useAuth from '../useAuth';
import Input from './Input';
import CarInfoForm from "./CarInfoForm";

const EditCarInfo = ({ id, name, make, year, price, brightness, setVehicleModel }) => {
	const accessToken = useAuth();
	const [newName, setNewName] = useState(name.replace(/-+/g, ' '));
	const [newYear, setNewYear] = useState(year);
	const [newPrice, setNewPrice] = useState(price);

	const editingVehicle = async () => {
		try {
			await axios({
				method: "patch",
				url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${id}`,
				headers: {
					Authorization: `bearer ${accessToken}`,
				},
				data: {
					name: newName.toLowerCase().trim().replace(/\s+/g, '-'),
					price: newPrice,
					year: newYear,
				}
			})
		} catch (err) {
			console.error(err)
		} finally {
			const gettingModels = await axios({
				method: "get",
				url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel`,
				params: {
					rpp: 1000,
				}
			})
			setVehicleModel(gettingModels.data.item);
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
			heading={`'${make.replace(/-+/g, ' ')}, ${name.trim().replace(/-+/g, ' ')}'`} 
			path={`../${make}/${name}`} 
			brightness={brightness} 
			formType={'Edit'}
		>
			<Input
				label={"Manufacturer"}
				data={make.replace(/-+/g, ' ')}
				styles={'pointer_events_none'}
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
			<button 
				id='save' 
				className={
					newName.trim().replace(/\s+/g, '-').length > 0 && 
					newYear.toString().length > 0 && 
					newPrice.toString().length > 0 ? '' : 'pointer_events_none'
				}
			>
				<Link to={`../${make}/${newName.toLowerCase().trim().replace(/\s+/g, '-')}`} onClick={editingVehicle}>Save</Link>
			</button>
			<button id='delete'>
				<Link to={"/car-search"} onClick={deletingVehicle}>Delete</Link>
			</button>
			<button id='cancle'>
				<Link to={"/car-search"}>Cancle</Link>
			</button>
		</CarInfoForm>
	)
}

export default EditCarInfo