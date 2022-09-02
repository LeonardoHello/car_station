import { makeAutoObservable, runInAction } from "mobx";
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

	async updateCollection() {
		const updating = await axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake",
			params: {
				rpp: 1000
			}
		})

		runInAction(() => this.collection = updating.data.item)
	}
}
const vehicleMake = new vehicleManufacturerCollection();


class vehicleModelCollection {
	collection = [];

	constructor() {
		makeAutoObservable(this)
	}

	async updateCollection() {
		const updating = await axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
			params: {
				rpp: 1000
			}
		})
		runInAction(() => this.collection = updating.data.item)
	}
}
const vehicleModel = new vehicleModelCollection();

vehicleMake.updateCollection();
vehicleModel.updateCollection();

export default brightness;
export { vehicleMake, vehicleModel };