import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../useAuth";
import CarInfoForm from "./CarInfoForm"
import Input from "./Input";

const CreateCar = ({ brightness, vehicleMake, vehicleModel }) => {
	const accessToken = useAuth();
	const [newMake, setNewMake] = useState('');
	const [newName, setNewName] = useState('');
	const [newYear, setNewYear] = useState('');
	const [newPrice, setNewPrice] = useState('');

	const creatingVehicle = () => {
		// if (vehicleMake && vehicleMake.find(elem => elem.name === newMake.toLowerCase().trim().split(' ').join('-'))) {
		// 	axios({
		// 		method: "post",
		// 		url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake`,
		// 		headers: {
		// 			Authorization: `bearer ${accessToken}`,
		// 			"Content-Type": "application/json"
		// 		},
		// 		data: {
		// 			description: 'Manufacturer',
		// 			name: newMake.includes(' ') ? 
		// 				newMake.toLowerCase().trim().split(' ').join('-') : 
		// 				newMake.toLowerCase().trim()
		// 		}
		// 	}).then(res => console.log(res.data))
		// 	.catch(err => console.error(err))
		// }
	}
	return (
		<CarInfoForm 
			heading={`a new car`} 
			path={'/car-search'} 
			brightness={brightness} 
			formType={'Create'}
			>
			<Input
				label={"Manufacturer"}
				data={newMake}
				setData={setNewMake}
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
				id='create' 
				className={
					newMake.trim().replace(/\s+/g, '-').length > 0 && 
					newName.trim().replace(/\s+/g, '-').length > 0 && 
					newYear.toString().length > 0 && 
					newMake.toString().length > 0 ? '' : 'pointer_events_none'
				}
			>
				<Link to={'/car-search'} onClick={creatingVehicle}>Create</Link>
			</button>
			<button id='cancle'>
				<Link to={'/car-search'}>Cancle</Link>
			</button>
		</CarInfoForm>
	)
}

export default CreateCar