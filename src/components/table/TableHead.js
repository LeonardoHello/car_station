import { observer } from "mobx-react-lite";
import { sort, order } from "../../store";

const info = ["Make", "Name", "Year", "Price"];

const settingOrder = (name) => {
	if (sort.value !== name.toLowerCase()) {
		sort.settingValue(name);
		order.ascending();
	} else if (sort.value === name.toLowerCase() && order.direction === "asc") {
		order.descending();
	} else {
		sort.removingValue();
		order.none();
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
					onClick={() => settingOrder(elem)}
				>
					<p className="table__header__name">{elem}</p>
					<div className="table__header__arrowContainer">
						<span
							className="material-symbols-outlined table__header__arrow"
							style={{
								color:
									order.direction === "asc" &&
									sort.value === elem.toLowerCase() &&
									"rgb(240, 185, 11)",
							}}
						>
							arrow_drop_up
						</span>
						<span
							className="material-symbols-outlined table__header__arrow"
							style={{
								color:
									order.direction === "desc" &&
									sort.value === elem.toLowerCase() &&
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
