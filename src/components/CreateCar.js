import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from 'mobx-react-lite'
import { vehicleMake, vehicleModel } from '../store';
import axios from "axios";
import useAuth from "../useAuth";
import Form from "./Form"
import Input from "./Input";

const CreateCar = () => {
	const navigate = useNavigate();
	const [newMake, setNewMake] = useState('');
	const [newName, setNewName] = useState('');
	const [newYear, setNewYear] = useState('');
	const [newPrice, setNewPrice] = useState('');
	const accessToken = useAuth();

	const creatingVehicle = async () => {
		const existingMake = vehicleMake.collection.find(elem => elem.name === newMake.toLowerCase().trim().replace(/\s+/g, '-'));
		if (!existingMake) {
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
					
					navigate(`/${newModel.data.id}`, { replace: false });
					vehicleMake.updateCollection();
					vehicleModel.updateCollection();
					
				} catch(err) {
					console.error(err);
				}
			} catch (err) {
				console.error(err);
			}
		} else {
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

				navigate(`/${newModel.data.id}`, { replace: false });
				vehicleModel.updateCollection();

			} catch (err) {
				console.error(err);
			}
		}
	}

	return (
		<Form 
			heading={`a new car`} 
			path={'../'} 
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
				onClick={creatingVehicle}
			>
				Create
			</button>
			<button id='cancle'>
				<Link to={'/'}>Cancle</Link>
			</button>
		</Form>
	)
}

export default observer(CreateCar)