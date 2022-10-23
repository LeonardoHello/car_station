import {
	Link,
	useLoaderData,
	Form,
	useActionData,
	redirect,
	useNavigation,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { vehicleMake, vehicleModel } from "../../store";
import useAuth from "../../useAuth";
import Label from "../Label";
import axios from "axios";

const EditCar = () => {
	const loaderData = useLoaderData();
	const accessToken = useAuth();
	const errors = useActionData();
	const navigation = useNavigation();
	const pending = navigation.state === "submitting";

	return (
		<main className="main main--form">
			<Link to="../" className="main__navigation main__navigation--left">
				Go back
			</Link>
			{typeof errors === "string" && (
				<div className="main__error">{errors}</div>
			)}
			<Form className="form" method="patch" autoComplete="off">
				<h1 className="form__title">
					Editing `
					<i>
						{loaderData.manufacturer.replace(/-+/g, " ")},{" "}
						{loaderData.model.trim().replace(/-+/g, " ")}
					</i>
					`
				</h1>

				<Label
					label="Manufacturer"
					name="manufacturer"
					data={loaderData.manufacturer.replace(/-+/g, " ")}
					readonly={true}
					error={errors?.manufacturer}
				/>
				<Label
					label="Model"
					name="model"
					data={loaderData.model}
					error={errors?.model}
				/>
				<Label
					label="Year"
					name="year"
					data={loaderData.year}
					number={true}
					error={errors?.year}
				/>
				<Label
					label="Price"
					name="price"
					data={loaderData.price}
					number={true}
					error={errors?.price}
				/>
				<div className="form__buttonContainer">
					<button
						className="form__button form__button--save"
						name="token"
						value={accessToken}
						disabled={pending}
					>
						{pending ? "Editing..." : "Edit"}
					</button>
				</div>
			</Form>
			<Form className="form" method="delete">
				<button
					className="form__button form__button--delete"
					name="token"
					value={accessToken}
					disabled={pending}
				>
					Delete
				</button>
			</Form>
		</main>
	);
};

const loader = async ({ params }) => {
	const res = await axios({
		method: "get",
		url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${params.id}`,
	});
	return {
		model: res.data.name,
		manufacturer: res.data.make,
		year: res.data.year,
		price: res.data.price,
	};
};

const action = async ({ request, params }) => {
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

	switch (request.method) {
		case "PATCH":
			try {
				await axios({
					method: "patch",
					url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${params.id}`,
					headers: {
						Authorization: `bearer ${formData.get("token")}`,
					},
					data: {
						name: formData
							.get("model")
							.toLowerCase()
							.trim()
							.replace(/\s+/g, "-"),
						year: parseInt(formData.get("year")),
						price: parseInt(formData.get("price")),
					},
				});
				return redirect(`/vehicle/${params.id}`);
			} catch (error) {
				return "An error occurred!";
			}

		case "DELETE":
			const vehicleInfo = await axios({
				method: "get",
				url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${params.id}`,
			});
			try {
				await axios({
					method: "delete",
					url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${params.id}`,
					headers: {
						Authorization: `bearer ${formData.get("token")}`,
					},
				});
				await vehicleModel.updateCollection();
				if (
					!vehicleModel.collection.some(
						(elem) => elem.make_id === vehicleInfo.data.make_id
					)
				) {
					try {
						await axios({
							method: "delete",
							url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake/${vehicleInfo.data.make_id}`,
							headers: {
								Authorization: `bearer ${formData.get("token")}`,
							},
						});
						await vehicleMake.updateCollection();
					} catch (error) {
						return "An error occurred!";
					}
				}
				return redirect("/");
			} catch (error) {
				return "An error occurred!";
			}

		default:
			break;
	}
};

export default observer(EditCar);
export { loader, action };
