import { observer } from "mobx-react-lite";
import table from "../../tableStore";

const info = ["Make", "Name", "Year", "Price"];

const filtering = (name) => {
	if (table.sort !== name) {
		table.updateSort(name);
		table.updateOrder("asc");
	} else if (table.sort === name && table.order === "asc") {
		table.updateOrder("desc");
	} else {
		table.updateSort("");
		table.updateOrder("");
	}
};

const TableHead = () => {
	return (
		<div className="table__row table__row--head">
			{info.map((elem, index) => (
				<div
					key={index}
					className={
						index < 2
							? "table__header"
							: "table__header table__header--right"
					}
					onClick={() => filtering(elem.toLowerCase())}
				>
					<p className="table__header__name">{elem}</p>
					<div className="table__header__arrowContainer">
						<span
							className="material-symbols-outlined table__header__arrow"
							style={{
								color:
									table.order === "asc" &&
									table.sort === elem.toLowerCase() &&
									"rgb(240, 185, 11)",
							}}
						>
							arrow_drop_up
						</span>
						<span
							className="material-symbols-outlined table__header__arrow"
							style={{
								color:
									table.order === "desc" &&
									table.sort === elem.toLowerCase() &&
									"rgb(240, 185, 11)",
							}}
						>
							arrow_drop_down
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default observer(TableHead);
