import { useEffect, useState } from "react";
import table from "../../tableStore";
import vehicle from "../../vehicleStore";

const filterCategories = ["All", "Make", "Year", "Price"];
const prices = [
	"$1 - $99,999",
	"$100,000 - $249,999",
	"$250,000 - $499,999",
	"$500,000 -",
];

const Filter = () => {
	const [currentFilterCategory, setcurrentFilterCategory] = useState("All");
	const [currentFilterQuery, setCurrentFilterQuery] = useState("");

	useEffect(() => {
		if (currentFilterCategory === "Make") {
			table.updateFilter(`where make = '${currentFilterQuery}'`);
		} else if (currentFilterCategory === "Year") {
			table.updateFilter(`where year = ${currentFilterQuery}`);
		} else if (currentFilterCategory === "Price") {
			if (
				parseInt(
					currentFilterQuery.split("-")[0].replace(/[^0-9]/g, "")
				) === 500000
			) {
				table.updateFilter(
					`where price > ${currentFilterQuery
						.split("-")[0]
						.replace(/[^0-9]/g, "")}`
				);
			} else {
				table.updateFilter(
					`where price > ${currentFilterQuery
						.split("-")[0]
						.replace(/[^0-9]/g, "")} and price < ${currentFilterQuery
						.split("-")[1]
						.replace(/[^0-9]/g, "")}`
				);
			}
		}
	}, [currentFilterQuery]);

	const filterQueryButtons = () => {
		if (currentFilterCategory === "Make") {
			return vehicle.manufacturers;
		} else if (currentFilterCategory === "Year") {
			return vehicle.years.sort((a, b) => a - b);
		} else if (currentFilterCategory === "Price") {
			return prices;
		}
	};

	return (
		<div className="filter">
			<ul className="filter__category">
				{filterCategories.map((elem, index) => (
					<li
						key={index}
						className={`filter__button filter__button--category ${
							currentFilterCategory === "All" && elem === "All"
								? "filter__button--all"
								: currentFilterCategory === elem && elem !== "All"
								? "filter__button--currentCategory"
								: ""
						}`}
						onClick={() => {
							setcurrentFilterCategory(elem);
							if (elem === "All") {
								table.updateFilter("");
								setCurrentFilterQuery("");
							}
						}}
					>
						{elem}
					</li>
				))}
			</ul>
			{currentFilterCategory !== "All" && (
				<ul className="filter__query">
					{filterQueryButtons()?.map((elem, index) => (
						<li
							key={index}
							className={`filter__button filter__button--query ${
								currentFilterQuery === elem.name ||
								currentFilterQuery === elem
									? "filter__button--currentQuery"
									: ""
							}`}
							onClick={() => setCurrentFilterQuery(elem.name || elem)}
						>
							{elem.name || elem}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Filter;
