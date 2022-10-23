import { observer } from "mobx-react-lite";
import table from "../../tableStore";

const Page = () => {
	const prevPage = () => table.page > 1 && table.updatePage(table.page - 1);
	const nextPage = () =>
		table.page < table.lastPage && table.updatePage(table.page + 1);
	return (
		<ul className="page">
			<li
				className="material-symbols-outlined page__arrow"
				style={{
					opacity: table.page <= 1 && ".5",
				}}
				onClick={prevPage}
			>
				navigate_before
			</li>
			{table.pageList.map((elem) => (
				<li
					key={elem}
					className={
						table.page !== elem
							? "page__number"
							: "page__number page__number--current"
					}
					onClick={() => table.updatePage(elem)}
				>
					{elem}
				</li>
			))}
			{!table.pageList.includes(table.lastPage) && table.lastPage > 0 && (
				<>
					<li>...</li>
					<li
						className={
							table.page !== table.lastPage
								? "page__number"
								: "page__number page__number--current"
						}
						onClick={() => table.updatePage(table.lastPage)}
					>
						{table.lastPage}
					</li>
				</>
			)}
			<li
				className="material-symbols-outlined page__arrow"
				onClick={nextPage}
				style={{
					opacity: table.page >= table.lastPage && ".5",
				}}
			>
				navigate_next
			</li>
		</ul>
	);
};

export default observer(Page);
