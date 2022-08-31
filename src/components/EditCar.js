import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import useAuth from '../useAuth';
import Form from "./Form";
import Input from './Input';

const EditCar = ({ brightness, setVehicleModel }) => {
	const accessToken = useAuth();
	const { id } = useParams()
	const [carInfo, setCarInfo] = useState();
	const [newName, setNewName] = useState(carInfo && carInfo.name.replace(/-+/g, ' '));
	const [newYear, setNewYear] = useState(carInfo && carInfo.year);
	const [newPrice, setNewPrice] = useState(carInfo && carInfo.price);

	useEffect(() => {
		axios({
			method: "get",
			url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${id}`,
		})
		.then(res => setCarInfo(res.data))
		.catch(err => console.error(err));
	}, [id])

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
		carInfo && (
			<Form 
			heading={`'${carInfo.make.replace(/-+/g, ' ')}, ${carInfo.name.trim().replace(/-+/g, ' ')}'`} 
			path={`../`} 
			brightness={brightness} 
			formType={'Edit'}
			>
				<Input
					label={"Manufacturer"}
					data={carInfo.make.replace(/-+/g, ' ')}
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
						newName && newName.trim().replace(/\s+/g, '-').length > 0 && 
						newYear && newYear.toString().length > 0 && 
						newPrice && newPrice.toString().length > 0 ? '' : 'pointer_events_none'
					}
				>
					<Link to={`/${id}`} onClick={editingVehicle}>Save</Link>
				</button>
				<button id='delete'>
					<Link to={"/"} onClick={deletingVehicle}>Delete</Link>
				</button>
				<button id='cancle'>
					<Link to={"/"}>Cancle</Link>
				</button>
			</Form>
		)
	)
}

export default EditCar