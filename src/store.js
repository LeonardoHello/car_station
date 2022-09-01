import { makeAutoObservable } from "mobx";
import axios from "axios";

class togglingDarkMode {
	darkMode = false;

	constructor() {
		makeAutoObservable(this)
	}

	toggleDarkMode() {
		this.darkMode = !this.darkMode
	}
}
const brightness = new togglingDarkMode();


class vehicleManufacturerCollection {
	collection = [];

	constructor() {
		makeAutoObservable(this)
	}

	updateCollection(manufacturers) {
		this.collection = manufacturers
	}
}
const vehicleMake = new vehicleManufacturerCollection();


class vehicleModelCollection {
	collection = [];

	constructor() {
		makeAutoObservable(this)
	}

	updateCollection(models) {
		this.collection = models
	}
}
const vehicleModel = new vehicleModelCollection();

axios({
	method: "get",
	url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake",
	params: {
		rpp: 1000
	},
})
.then(res => vehicleMake.updateCollection(res.data.item))
.catch(err => console.error(err));

axios({
	method: "get",
	url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
	params: {
		rpp: 1000
	},
})
.then(res => vehicleModel.updateCollection(res.data.item))
.catch(err => console.error(err));


export default brightness;
export { vehicleMake, vehicleModel };