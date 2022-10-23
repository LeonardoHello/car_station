import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { sort, order } from "../../store";
import Table from "../table/Table";
import Search from "../table/Search";
import Filter from "../table/Filter";
import Page from "../table/Page";
import Limit from "../table/Limit";
import axios from "axios";

const Home = () => {
	const [vehicles, setVehicles] = useState();
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [filterQuery, setFilterQuery] = useState();
	const [searchQuery, setSearchQuery] = useState();
	const [rootWidth, setRootWidth] = useState();

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) =>
			setRootWidth(entries[0].contentRect.width)
		);
		resizeObserver.observe(document.querySelector("body"));
		return () => resizeObserver.disconnect();
	}, [rootWidth]);

	useEffect(() => setPage(1), [filterQuery, searchQuery, totalPages]);

	useEffect(() => {
		const cancelRequest = axios.CancelToken.source();
		axios({
			cancelToken: cancelRequest.token,
			method: "get",
			url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
			params: {
				rpp: limit,
				page: page,
				sort:
					sort.value !== "year" &&
					sort.value !== "price" &&
					`${sort.value}|${order.direction}`,
				searchQuery:
					sort.value === "year" || sort.value === "price"
						? filterQuery && !searchQuery
							? `${filterQuery} order by cast(${sort.value} as int) ${order.direction}`
							: !filterQuery && searchQuery
							? `${searchQuery} order by cast(${sort.value} as int) ${order.direction}`
							: filterQuery && searchQuery
							? `${filterQuery} and (${searchQuery.replace(
									"where ",
									""
							  )}) order by cast(${sort.value} as int) ${
									order.direction
							  }`
							: `order by cast(${sort.value} as int) ${order.direction}`
						: filterQuery && !searchQuery
						? filterQuery
						: !filterQuery && searchQuery
						? searchQuery
						: filterQuery && searchQuery
						? `${filterQuery} and (${searchQuery.replace("where ", "")})`
						: null,
			},
		})
			.then((res) => {
				setVehicles(res.data.item);
				setTotalPages(
					Math.ceil(res.data.totalRecords / res.data.recordsPerPage)
				);
			})
			.catch((err) => console.error(err));
		return () => cancelRequest.cancel();
	}, [limit, page, sort.value, order.direction, filterQuery, searchQuery]);

	const updatingSearchQuery = (e) => {
		if (e.currentTarget.value.trim().replace(/\s+/g, "-").length < 1)
			return setSearchQuery();

		setSearchQuery(
			`where name like '%${e.currentTarget.value
				.trim()
				.replace(/\s+/g, "-")}%' or make like '%${e.currentTarget.value
				.trim()
				.replace(/\s+/g, "-")}%' or year like '%${e.currentTarget.value
				.trim()
				.replace(/\s+/g, "-")}%' or price like '%${e.currentTarget.value
				.trim()
				.replace(/\s+/g, "-")}%'`
		);
	};

	return (
		<main className="main">
			<Link className="main__navigation" to="vehicle/create">
				Create New Vehicle
			</Link>
			<Search updatingSearchQuery={updatingSearchQuery} />
			<Filter setFilterQuery={setFilterQuery} />
			<Table vehicles={vehicles} rootWidth={rootWidth} />
			<Page page={page} setPage={setPage} totalPages={totalPages} />
			<Limit limit={limit} setLimit={setLimit} />
		</main>
	);
};

const loader = async () => {};

export { loader };
export default observer(Home);
