const limitNumbers = [10, 25, 50, 100];

const Limit = ({ limit, setLimit }) => {
	return (
		<ul className="limit">
			{limitNumbers.map((elem) => (
				<li
					key={elem}
					className="limit__number"
					style={{
						color: limit === elem && "rgb(240, 185, 11)",
					}}
					onClick={() => setLimit(parseInt(elem))}
				>
					{elem}
				</li>
			))}
		</ul>
	);
};

export default Limit;
