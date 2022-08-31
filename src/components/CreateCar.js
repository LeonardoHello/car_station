import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../useAuth";
import Form from "./Form"
import Input from "./Input";

const CreateCar = ({ brightness, vehicleMake, setVehicleMake, setVehicleModel }) => {
	const accessToken = useAuth();
	const [newCarId, setNewCarId] = useState();
	const [newMake, setNewMake] = useState('');
	const [newName, setNewName] = useState('');
	const [newYear, setNewYear] = useState('');
	const [newPrice, setNewPrice] = useState('');

	const creatingVehicle = async () => {
		const existingMake = vehicleMake.find(elem => elem.name === newMake.toLowerCase().trim().replace(/\s+/g, '-'));
		if (!existingMake) {
			console.log("doesn't exist");
			try {
				const creatingMake = await axios({
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
					const newModel = await axios({
						method: "post",
						url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel`,
						headers: {
							Authorization: `bearer ${accessToken}`,
						},
						data: {
							description: 'Model',
							name: newName.toLowerCase().trim().replace(/\s+/g, '-'),
							make: creatingMake.data.name,
							make_id: creatingMake.data.id,
							year: parseInt(newYear),
							price: parseInt(newPrice)
						}
					})
					setNewCarId(newModel.data)
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
				const newModel = await axios({
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
				setNewCarId(newModel.data)
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
		<Form 
			heading={`a new car`} 
			path={'../'} 
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
				<Link to={`/${newCarId && newCarId}`} onClick={creatingVehicle}>Create</Link>
			</button>
			<button id='cancle'>
				<Link to={'/'}>Cancle</Link>
			</button>
		</Form>
	)
}

export default CreateCar