import {
	Form,
	Link,
	redirect,
	useActionData,
	useNavigation,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { vehicleMake, vehicleModel } from "../../store";
import useAuth from "../../useAuth";
import Label from "../Label";
import axios from "axios";

const CreateCar = () => {
	const accessToken = useAuth();
	const errors = useActionData();
	const navigation = useNavigation();
	const pending = navigation.state === "submitting";

	return (
		<main className="main main--form">
			<Link to="../" className="main__navigation main__navigation--left">
				Go back
			</Link>
			<Form className="form" method="post" autoComplete="off">
				<h1 className="form__title">Creating New Vehicle</h1>
				<Label
					label="Manufacturer"
					name="manufacturer"
					error={errors?.manufacturer}
				/>
				<Label label="Model" name="model" error={errors?.model} />
				<Label
					label="Year"
					name="year"
					number={true}
					error={errors?.year}
				/>
				<Label
					label="Price"
					name="price"
					number={true}
					error={errors?.price}
				/>
				<button
					className="form__button form__button--save"
					name="token"
					value={accessToken}
					disabled={pending}
				>
					{pending ? "Creating..." : "Create"}
				</button>
			</Form>
		</main>
	);
};

const action = async ({ request }) => {
	const formData = await request.formData();

	const errors = {};

	for (const pair of formData.entries()) {
		if (!pair[1].trim().length) {
			errors[pair[0]] = true;
		}
	}

	if (Object.keys(errors).length) {
		return errors;
	}

	const existingMake = vehicleMake.collection.find(
		(elem) =>
			elem.name ===
			formData.get("manufacturer").toLowerCase().trim().replace(/\s+/g, "-")
	);
	if (!existingMake) {
		try {
			const creatingMake = await axios({
				method: "post",
				url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake`,
				headers: {
					Authorization: `bearer ${formData.get("token")}`,
				},
				data: {
					description: "Manufacturer",
					name: formData
						.get("manufacturer")
						.toLowerCase()
						.trim()
						.replace(/\s+/g, "-"),
				},
			});
			try {
				const newModel = await axios({
					method: "post",
					url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel`,
					headers: {
						Authorization: `bearer ${formData.get("token")}`,
					},
					data: {
						description: "Model",
						name: formData
							.get("model")
							.toLowerCase()
							.trim()
							.replace(/\s+/g, "-"),
						make: creatingMake.data.name,
						make_id: creatingMake.data.id,
						year: parseInt(formData.get("year")),
						price: parseInt(formData.get("price")),
					},
				});
				await vehicleMake.updateCollection();
				await vehicleModel.updateCollection();
				return redirect(`/vehicle/${newModel.data.id}`);
			} catch (err) {
				return "An error occurred!";
			}
		} catch (err) {
			return "An error occurred!";
		}
	} else {
		try {
			const newModel = await axios({
				method: "post",
				url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel`,
				headers: {
					Authorization: `bearer ${formData.get("token")}`,
				},
				data: {
					description: "Model",
					name: formData
						.get("model")
						.toLowerCase()
						.trim()
						.replace(/\s+/g, "-"),
					make: existingMake.name,
					make_id: existingMake.id,
					year: parseInt(formData.get("year")),
					price: parseInt(formData.get("price")),
				},
			});
			await vehicleModel.updateCollection();
			return redirect(`/vehicle/${newModel.data.id}`);
		} catch (err) {
			console.error(err);
		}
	}
};

export default observer(CreateCar);
export { action };
