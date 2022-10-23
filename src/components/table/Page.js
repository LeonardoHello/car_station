import { useEffect, useState } from "react";

const Page = ({ page, setPage, totalPages }) => {
	const [pageList, setPageList] = useState();

	useEffect(() => {
		if (!pageList) {
			setPageList(
				Array(totalPages)
					.fill(true)
					.map((elem, index) => index + 1)
					.slice(0, 4)
			);
		} else {
			if (page > pageList[pageList.length - 1] + 2) {
				setPageList([
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				]);
			} else if (page === pageList[pageList.length - 1] + 1) {
				setPageList((elem) => elem.map((elem) => elem + 1));
			} else if (page === pageList[0] - 1) {
				setPageList((elem) => elem.map((elem) => elem - 1));
			}
		}
	}, [page]);

	useEffect(
		() =>
			setPageList(
				Array(totalPages)
					.fill(true)
					.map((elem, index) => index + 1)
					.slice(0, 4)
			),
		[totalPages]
	);

	const prevPage = () => page > 1 && setPage((prev) => prev - 1);
	const nextPage = () => page < totalPages && setPage((prev) => prev + 1);
	return (
		<ul className="pages">
			<li
				className="material-symbols-outlined pages__arrow"
				style={{
					opacity: page <= 1 && ".5",
				}}
				onClick={prevPage}
			>
				navigate_before
			</li>
			{pageList?.map((elem) => (
				<li
					key={elem}
					className={
						page !== elem
							? "pages__number"
							: "pages__number pages__number--current"
					}
					onClick={() => setPage(elem)}
				>
					{elem}
				</li>
			))}
			{!pageList?.includes(totalPages) && totalPages > 0 && (
				<>
					<li>...</li>
					<li
						className={
							page !== totalPages
								? "pages__number"
								: "pages__number pages__number--current"
						}
						onClick={() => setPage(totalPages)}
					>
						{totalPages}
					</li>
				</>
			)}
			<li
				className="material-symbols-outlined pages__arrow"
				onClick={nextPage}
				style={{
					opacity: page >= totalPages && ".5",
				}}
			>
				navigate_next
			</li>
		</ul>
	);
};

export default Page;
