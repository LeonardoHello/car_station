import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class Table {
	search;
	filter;
	order;
	sort;
	limit;

	constructor() {
		makeAutoObservable(this);
	}
}
const table = new Table();

class vehicleManufacturerCollection {
	collection = [];

	constructor() {
		makeAutoObservable(this);
	}

	async updateCollection() {
		const updatedCollection = await axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake",
			params: {
				rpp: 1000,
			},
		});

		runInAction(() => (this.collection = updatedCollection.data.item));
	}
}
const vehicleMake = new vehicleManufacturerCollection();

class vehicleModelCollection {
	collection = [];

	constructor() {
		makeAutoObservable(this);
	}

	async updateCollection() {
		const updatedCollection = await axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
			params: {
				rpp: 1000,
			},
		});
		runInAction(() => (this.collection = updatedCollection.data.item));
	}
}
const vehicleModel = new vehicleModelCollection();

class Order {
	direction = null;

	constructor() {
		makeAutoObservable(this);
	}

	ascending() {
		this.direction = "asc";
	}

	descending() {
		this.direction = "desc";
	}

	none() {
		this.direction = null;
	}
}
const order = new Order();

class Sorting {
	value = null;

	constructor() {
		makeAutoObservable(this);
	}

	settingValue(value) {
		this.value = value.toLowerCase();
	}

	removingValue() {
		this.value = null;
	}
}
const sort = new Sorting();

vehicleMake.updateCollection();
vehicleModel.updateCollection();

export { vehicleMake, vehicleModel, order, sort };
