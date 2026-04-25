"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { buttonVariants } from "../../shadcn/button";
import { useEffect, useState } from "react";
import { useLazyGetAncestorsQuery } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { nanoid } from "nanoid";
import Link from "next/link";
import { Pagination } from "@mui/material";
import AncestorCard from "../../cards/AncestorCard";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function AddAncestors({ open, closingFunction, tree }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [ancestors, setAncestors] = useState([]);

	const [getAncestors, getAncestorsResults] = useLazyGetAncestorsQuery();

	useEffect(() => {
		if (getAncestorsResults.isError) {
			const message = typeof getAncestorsResults.error === "string" ? getAncestorsResults.error : getAncestorsResults.error.message;
			toast.error(message);
		} else if (getAncestorsResults.isSuccess) {
			// toast.success(getAncestorsResults.data.message);

			const { results } = getAncestorsResults.data;

			setTotalPages(results?.totalPages ?? 0);
			setAncestors(results?.ancestors);

			if (results.ancestors.length === 0) closingFunction();
		}
	}, [getAncestorsResults.isFetching, getAncestorsResults.isSuccess, getAncestorsResults.isError]);

	const user = useAtomValue(currentUser);

	const pageSizes = [
		{
			id: nanoid(),
			value: 4
		},
		{
			id: nanoid(),
			value: 8
		},
		{
			id: nanoid(),
			value: 12
		},
		{
			id: nanoid(),
			value: 16
		}
	];
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(pageSizes[0].value);
	const [filters, setFilters] = useState({
		sort: "newest"
	});

	const handlePagination = (_, page) => {
		setPage(page);
	};

	useEffect(() => {
		if (user) getAncestors({ userId: user._id, page, limit, filters: JSON.stringify(filters) });
	}, [user, page, limit, filters]);

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-10">
			<DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50" />

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl lg:max-w-4xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div>
							<div className="bg-linear-to-br from-blue-500 to-blue-700 p-4 rounded-t-md relative">
								<button onClick={closingFunction} className={classNames(buttonVariants({ variant: "redCircularBtn" }), "absolute top-2 right-2 flex justify-center items-center")}>
									<XMarkIcon className="size-5" />
								</button>

								<DialogTitle as="h3" className="text-base font-semibold text-white text-center capitalize">
									add ancestor
								</DialogTitle>
							</div>
							<div className="text-center">
								{ancestors.length === 0 ? (
									<div className="text-center border border-gray-400 w-full py-4 flex flex-col justify-center items-center">
										<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No ancestors to display</h3>
										<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding a new ancestor.</p>

										<Link href={"/family/members"} className={classNames(buttonVariants({ variant: "blueBtn" }), "mt-4")}>
											add ancestor
										</Link>
									</div>
								) : (
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4 gap-2">
										{ancestors.map((ancestor) => (
											<AncestorCard ancestor={ancestor} tree={tree} key={ancestor._id} />
										))}
									</div>
								)}
							</div>
						</div>
						<div className={classNames("bg-linear-to-br from-blue-500 to-blue-700 p-4 flex justify-center items-center rounded-b-md")}>
							<Pagination count={totalPages} page={page} siblingCount={0} variant="outlined" onChange={handlePagination} className="pagination_black pagination_yellow-highlight" />
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
