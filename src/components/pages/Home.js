import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import vehicle from "../../vehicleStore";
import table from "../../tableStore";
import Table from "../table/Table";
import Search from "../table/Search";
import Filter from "../table/Filter";
import Page from "../table/Page";
import Limit from "../table/Limit";

const Home = () => {
	const [rootWidth, setRootWidth] = useState();

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) =>
			setRootWidth(entries[0].contentRect.width)
		);
		resizeObserver.observe(document.querySelector("body"));
		return () => resizeObserver.disconnect();
	}, [rootWidth]);

	return (
		<main className="main">
			<Link className="main__navigation" to="vehicle/create">
				Create New Vehicle
			</Link>
			<Search />
			<Filter />
			<Table rootWidth={rootWidth} />
			<Page />
			<Limit />
		</main>
	);
};

const loader = async () => {
	await vehicle.update();
	await table.update();
};

export { loader };
export default observer(Home);
