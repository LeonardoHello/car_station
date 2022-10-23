import { Link } from "react-router-dom";
import TableHead from "./TableHead";

const Table = ({ rootWidth, vehicles }) => {
	return (
		<div className="table">
			<TableHead />
			<div className="table__body">
				{vehicles?.map((elem) =>
					rootWidth >= 800 ? (
						<div key={elem.id} className="table__row">
							<p className="table__data table__data--left">
								{elem.make.replace(/-+/g, " ")}
							</p>
							<p className="table__data table__data--left">
								{elem.name.replace(/-+/g, " ")}
							</p>
							<p className="table__data">{elem.year}</p>
							<p className="table__data">{`$${Intl.NumberFormat("en", {
								notation: "compact",
							}).format(elem.price)}`}</p>
							<p className="table__data table__data--details">
								<Link to={`vehicle/${elem.id}`}>details</Link>
							</p>
						</div>
					) : (
						<Link key={elem.id} to={`vehicle/${elem.id}`}>
							<div className="table__row">
								<p className="table__data table__data--left">
									{elem.make.replace(/-+/g, " ")}
								</p>
								<p className="table__data table__data--left">
									{elem.name.replace(/-+/g, " ")}
								</p>
								<p className="table__data">{elem.year}</p>
								<p className="table__data">{`$${Intl.NumberFormat(
									"en",
									{
										notation: "compact",
									}
								).format(elem.price)}`}</p>
							</div>
						</Link>
					)
				)}
			</div>
		</div>
	);
};

export default Table;
