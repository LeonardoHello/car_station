import { Link, useLoaderData } from "react-router-dom";
import { observer } from "mobx-react-lite";
import low from "../../assets/low.jpg";
import mediumLow from "../../assets/medium-low.jpg";
import mediumHigh from "../../assets/medium-high.jpg";
import high from "../../assets/high.jpg";
import axios from "axios";

const CarInfo = () => {
	const loaderData = useLoaderData();

	return (
		<main className="main main--details">
			<div className="main__navigationContainer">
				<Link to="../" className="main__navigation">
					Go back
				</Link>
				<Link to="edit" className="main__navigation">
					Edit
				</Link>
			</div>
			<img
				src={
					loaderData.price < 100000
						? low
						: loaderData.price < 250000
						? mediumLow
						: loaderData.price < 500000
						? mediumHigh
						: high
				}
				className="main__image"
				alt="car"
				width="1000"
				height="1000"
			/>
			<h1 className="main__title">
				{loaderData.make.replace(/-+/g, " ")},{" "}
				{loaderData.name.replace(/-+/g, " ")} {loaderData.year}
			</h1>
			<h2 className="main__subTitle">
				${loaderData.price.toLocaleString("en-US")}
			</h2>
			<p className="main__paragraph">
				Design work of the first generation{" "}
				{loaderData.name.replace(/-+/g, " ")} Series began in 1984, with
				final design phase and production development starting in 1986. The
				car debuted at the 1989 Frankfurt Motor Show, and was produced until
				1999. {loaderData.name.replace(/-+/g, " ")} was designed to move
				beyond the market of the original E24{" "}
				{loaderData.name.replace(/-+/g, " ")}, featuring greater performance
				and an increased price. {loaderData.name.replace(/-+/g, " ")} was
				the first road car to offer a V12 engine mated to a 6-speed manual
				transmission and was one of the first vehicles to be fitted with
				electronic drive-by-wire throttle.{" "}
				{loaderData.name.replace(/-+/g, " ")} was also one of BMW's first
				cars to use a multi-link rear axle.
			</p>
		</main>
	);
};

const loader = async ({ params }) => {
	const res = await axios({
		method: "get",
		url: `https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel/${params.id}`,
	});
	return res.data;
};

export default observer(CarInfo);
export { loader };
