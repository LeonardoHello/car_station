import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class toggleDarkMode {
	darkMode = false;

	constructor() {
		makeAutoObservable(this)
	}

	toggleDarkMode() {
		this.darkMode = !this.darkMode
	}
}
const brightness = new toggleDarkMode();


class vehicleManufacturerCollection {
	collection = [];

	constructor() {
		makeAutoObservable(this)
	}

	async updateCollection() {
		const updatedCollection = await axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake",
			params: {
				rpp: 1000
			}
		})

		runInAction(() => this.collection = updatedCollection.data.item)
	}
}
const vehicleMake = new vehicleManufacturerCollection();

class vehicleModelCollection {
	collection = [];

	constructor() {
		makeAutoObservable(this)
	}

	async updateCollection() {
		const updatedCollection = await axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
			params: {
				rpp: 1000
			}
		})
		runInAction(() => this.collection = updatedCollection.data.item)
	}
}
const vehicleModel = new vehicleModelCollection();

class toggleOrder {
	direction = null;

	constructor() {
		makeAutoObservable(this)
	}

	ascending() {
		this.direction = "asc"
	}

	descending() {
		this.direction = "desc"
	}

	none() {
		this.direction = null
	}

}
const order = new toggleOrder();

class sorting {
	value = null;

	constructor() {
		makeAutoObservable(this)
	}

	settingValue(value) {
		this.value = value.toLowerCase()
	}

	removingValue() {
		this.value = null
	}
}
const sort = new sorting();

class settingCurrentFilter {
	value = null;

	constructor() {
		makeAutoObservable(this)
	}

	settingValue(value) {
		this.value = value
	}

	removingValue() {
		this.value = null;
	}
}
const currentFilter = new settingCurrentFilter();

vehicleMake.updateCollection();
vehicleModel.updateCollection();

export default brightness;
export { vehicleMake, vehicleModel, order, sort, currentFilter };