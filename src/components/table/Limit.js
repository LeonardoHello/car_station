import { observer } from "mobx-react-lite";
import table from "../../tableStore";
const limitNumbers = [10, 25, 50, 100];

const Limit = () => {
	return (
		<ul className="limit">
			{limitNumbers.map((elem) => (
				<li
					key={elem}
					className="limit__number"
					style={{
						color: table.limit === elem && "rgb(240, 185, 11)",
					}}
					onClick={() => table.updateLimit(elem)}
				>
					{elem}
				</li>
			))}
		</ul>
	);
};

export default observer(Limit);
