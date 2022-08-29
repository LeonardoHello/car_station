import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../useAuth";
import CarInfoForm from "./CarInfoForm"
import Input from "./Input";

const CreateCar = ({ brightness, vehicleMake, setVehicleMake, setVehicleModel }) => {
	const accessToken = useAuth();
	const [newMake, setNewMake] = useState('');
	const [newName, setNewName] = useState('');
	const [newYear, setNewYear] = useState('');
	const [newPrice, setNewPrice] = useState('');

	const creatingVehicle = async () => {
		const existingMake = vehicleMake.find(elem => elem.name === newMake.toLowerCase().trim().replace(/\s+/g, '-'));
		if (!existingMake) {
			console.log("doesn't exist");
			try {
				const addingMake = await axios({
					method: "post",
					url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake`,
					headers: {
						Authorization: `bearer ${accessToken}`,
					},
					data: {
						description: 'Manufacturer',
						name: newMake.toLowerCase().trim().replace(/\s+/g, '-'),
					}
				})
				try {
					await axios({
						method: "post",
						url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel`,
						headers: {
							Authorization: `bearer ${accessToken}`,
						},
						data: {
							description: 'Model',
							name: newName.toLowerCase().trim().replace(/\s+/g, '-'),
							make: addingMake.data.name,
							make_id: addingMake.data.id,
							year: parseInt(newYear),
							price: parseInt(newPrice)
						}
					})
				} finally {
					const gettingMakes = await axios({
						method: "get",
						url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake`,
						params: {
							rpp: 1000,
						}
					})
					const settingModels = await axios({
						method: "get",
						url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel`,
						params: {
							rpp: 1000,
						}
					})
					setVehicleMake(gettingMakes.data.item); 
					setVehicleModel(settingModels.data.item);
				}
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log("It exists");
			try {
				await axios({
					method: "post",
					url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel`,
					headers: {
						Authorization: `bearer ${accessToken}`,
					},
					data: {
						description: 'Model',
						name: newName.toLowerCase().trim().replace(/\s+/g, '-'),
						make: existingMake.name,
						make_id: existingMake.id,
						year: parseInt(newYear),
						price: parseInt(newPrice)
					}
				})
			} catch (err) {
				console.error(err);
			} finally {
				const settingModels = await axios({
					method: "get",
					url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel`,
					params: {
						rpp: 1000,
					}
				})
				setVehicleModel(settingModels.data.item);
			}
		}
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
					newPrice.toString().length > 0 ? '' : 'pointer_events_none'
				}
			>
				<Link to={`../${newMake.toLowerCase().trim().replace(/\s+/g, '-')}/${newName.toLowerCase().trim().replace(/\s+/g, '-')}`} onClick={creatingVehicle}>Create</Link>
			</button>
			<button id='cancle'>
				<Link to={'/car-search'}>Cancle</Link>
			</button>
		</CarInfoForm>
	)
}

export default CreateCar