import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class Vehicles {
	manufacturers = [];
	models = [];
	years = [];

	constructor() {
		makeAutoObservable(this);
	}

	async update() {
		const manufacturers = await axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake",
			params: {
				rpp: 1000,
			},
		});
		const models = await axios({
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
			params: {
				rpp: 1000,
			},
		});

		const years = [];
		models.data.item.map((elem) =>
			!years.includes(parseInt(elem.year))
				? years.push(parseInt(elem.year))
				: null
		);

		runInAction(() => {
			this.manufacturers = manufacturers.data.item;
			this.models = models.data.item;
			this.years = years;
		});
	}
}
const vehicle = new Vehicles();

// class Order {
// 	direction = null;

// 	constructor() {
// 		makeAutoObservable(this);
// 	}

// 	ascending() {
// 		this.direction = "asc";
// 	}

// 	descending() {
// 		this.direction = "desc";
// 	}

// 	none() {
// 		this.direction = null;
// 	}
// }
// const order = new Order();

// class Sorting {
// 	value = null;

// 	constructor() {
// 		makeAutoObservable(this);
// 	}

// 	settingValue(value) {
// 		this.value = value.toLowerCase();
// 	}

// 	removingValue() {
// 		this.value = null;
// 	}
// }
// const sort = new Sorting();

export default vehicle;
