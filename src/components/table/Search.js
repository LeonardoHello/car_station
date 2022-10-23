const Search = ({ updatingSearchQuery }) => {
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
