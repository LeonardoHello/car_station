import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import { vehicleModel } from '../store';
import axios from 'axios'
import useAuth from '../useAuth';
import Form from "./Form";
import Input from './Input';

const EditCar = () => {
	const [carInfo, setCarInfo] = useState();
	const [newName, setNewName] = useState();
	const [newYear, setNewYear] = useState();
	const [newPrice, setNewPrice] = useState();
	const { id } = useParams();
	const navigate = useNavigate();
	const accessToken = useAuth();

	useEffect(() => {
		axios({
			method: "get",
			url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${id}`,
		})
		.then(res => {
			setCarInfo(res.data)
			setNewName(res.data.name.replace(/-+/g, ' '))
			setNewYear(res.data.year)
			setNewPrice(res.data.price)
		})
		.catch(err => console.error(err));
	}, [])

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
					price: parseInt(newPrice),
					year: parseInt(newYear),
				}
			});
			
			navigate(`/${id}`, { replace: false });
			vehicleModel.updateCollection();
			
		} catch (err) {
			console.error(err)
		}
	}

	const deletingVehicle = async () => {
		try {
			await axios({
				method: "delete",
				url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${id}`,
				headers: {
					Authorization: `bearer ${accessToken}`,
				}
			})
			navigate('/', { replace: false })
		} catch (err) {
			console.error(err)
		}
	}

	return (
		carInfo && (
			<Form 
			heading={`'${carInfo.make.replace(/-+/g, ' ')}, ${carInfo.name.trim().replace(/-+/g, ' ')}'`} 
			path={`/${id}`} 
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
						newName.trim().replace(/\s+/g, '-').length > 0 && 
						newYear.toString().length > 0 && 
						newPrice.toString().length > 0 ? '' : 'pointer_events_none'
					}
					onClick={editingVehicle}
				>
					Save
				</button>
				<button id='delete' onClick={deletingVehicle}>Delete</button>
				<button id='cancle'>
					<Link to={"/"}>Cancle</Link>
				</button>
			</Form>
		)
	)
}

export default observer(EditCar)