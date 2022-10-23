import table from "../../tableStore";

const Search = () => {
	const updatingSearchQuery = (e) => {
		if (!e.currentTarget.value.trim().replace(/\s+/g, "-").length)
			return table.updateSearch();

		table.updateSearch(
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
		<div className="search">
			<span className="material-symbols-outlined search__icon">search</span>
			<input
				className="search__input"
				placeholder="Search Vehicles"
				onInput={updatingSearchQuery}
			/>
		</div>
	);
};

export default Search;
