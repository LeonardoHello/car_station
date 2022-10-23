import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

const tableData = async (search, filter, order, sort, page, limit) =>
	await axios({
		method: "get",
		url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
		params: {
			rpp: limit,
			page: page,
			sort: sort !== "year" && sort !== "price" && `${sort}|${order}`,
			searchQuery:
				sort === "year" || sort === "price"
					? filter && !search
						? `${filter} order by cast(${sort} as int) ${order}`
						: !filter && search
						? `${search} order by cast(${sort} as int) ${order}`
						: filter && search
						? `${filter} and (${search.replace(
								"where ",
								""
						  )}) order by cast(${sort} as int) ${order}`
						: `order by cast(${sort} as int) ${order}`
					: filter && !search
					? filter
					: !filter && search
					? search
					: filter && search
					? `${filter} and (${search.replace("where ", "")})`
					: null,
		},
	});

class Table {
	collection = [];
	search = "";
	filter = "";
	order = "";
	sort = "";
	page = 1;
	lastPage = undefined;
	pageList = undefined;
	limit = 10;

	constructor() {
		makeAutoObservable(this);
	}

	async update() {
		const res = await tableData(
			this.search,
			this.filter,
			this.order,
			this.sort,
			this.page,
			this.limit
		);

		runInAction(() => {
			this.collection = res.data.item;
			this.lastPage = Math.ceil(
				res.data.totalRecords / res.data.recordsPerPage
			);
			this.pageList = Array(
				Math.ceil(res.data.totalRecords / res.data.recordsPerPage)
			)
				.fill(true)
				.map((elem, index) => index + 1)
				.slice(0, 4);
		});
	}

	async updateSearch(newSearch) {
		this.search = newSearch;
		this.page = 1;
		const res = await tableData(
			newSearch,
			this.filter,
			this.order,
			this.sort,
			this.page,
			this.limit
		);

		runInAction(() => {
			this.collection = res.data.item;
			this.lastPage = Math.ceil(
				res.data.totalRecords / res.data.recordsPerPage
			);
			this.pageList = Array(
				Math.ceil(res.data.totalRecords / res.data.recordsPerPage)
			)
				.fill(true)
				.map((elem, index) => index + 1)
				.slice(0, 4);
		});
	}

	async updateFilter(newFilter) {
		this.filter = newFilter;
		this.page = 1;
		const res = await tableData(
			this.search,
			newFilter,
			this.order,
			this.sort,
			this.page,
			this.limit
		);

		runInAction(() => {
			this.collection = res.data.item;
			this.lastPage = Math.ceil(
				res.data.totalRecords / res.data.recordsPerPage
			);
			this.pageList = Array(
				Math.ceil(res.data.totalRecords / res.data.recordsPerPage)
			)
				.fill(true)
				.map((elem, index) => index + 1)
				.slice(0, 4);
		});
	}

	async updateOrder(newOrder) {
		this.order = newOrder;
		const res = await tableData(
			this.search,
			this.filter,
			newOrder,
			this.sort,
			this.page,
			this.limit
		);

		runInAction(() => {
			this.collection = res.data.item;
			this.lastPage = Math.ceil(
				res.data.totalRecords / res.data.recordsPerPage
			);
		});
	}

	async updateSort(newSort) {
		this.sort = newSort;
		const res = await tableData(
			this.search,
			this.filter,
			this.order,
			newSort,
			this.page,
			this.limit
		);

		runInAction(() => {
			this.collection = res.data.item;
			this.lastPage = Math.ceil(
				res.data.totalRecords / res.data.recordsPerPage
			);
		});
	}

	async updatePage(newPage) {
		this.page = newPage;
		if (!this.pageList) {
			this.pageList = Array(this.lastPage)
				.fill(true)
				.map((elem, index) => index + 1)
				.slice(0, 4);
		} else {
			if (newPage > this.pageList[this.pageList.length - 1] + 2) {
				this.pageList = [
					this.lastPage - 3,
					this.lastPage - 2,
					this.lastPage - 1,
					this.lastPage,
				];
			} else if (newPage === this.pageList[this.pageList.length - 1] + 1) {
				this.pageList = this.pageList.map((elem) => elem + 1);
			} else if (newPage === this.pageList[0] - 1) {
				this.pageList = this.pageList.map((elem) => elem - 1);
			}
		}
		const res = await tableData(
			this.search,
			this.filter,
			this.order,
			this.sort,
			newPage,
			this.limit
		);

		runInAction(() => {
			this.collection = res.data.item;
			this.lastPage = Math.ceil(
				res.data.totalRecords / res.data.recordsPerPage
			);
		});
	}

	async updateLimit(newLimit) {
		this.limit = newLimit;
		this.page = 1;
		const res = await tableData(
			this.search,
			this.filter,
			this.order,
			this.sort,
			this.page,
			newLimit
		);

		runInAction(() => {
			this.collection = res.data.item;
			this.lastPage = Math.ceil(
				res.data.totalRecords / res.data.recordsPerPage
			);
			this.pageList = Array(
				Math.ceil(res.data.totalRecords / res.data.recordsPerPage)
			)
				.fill(true)
				.map((elem, index) => index + 1)
				.slice(0, 4);
		});
	}
}
const table = new Table();

export default table;
