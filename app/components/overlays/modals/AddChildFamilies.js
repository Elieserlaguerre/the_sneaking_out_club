"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { buttonVariants } from "../../shadcn/button";
import { useEffect, useState } from "react";
import { useLazyGetFamilyTreeBranchesQuery, useManageFamilyBranchesMutation } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { nanoid } from "nanoid";
import Link from "next/link";
import { Pagination } from "@mui/material";
import AncestorCard from "../../cards/AncestorCard";
import { XMarkIcon } from "@heroicons/react/20/solid";
import FamilyBranchCard from "../../cards/FamilyBranchCard";

export default function AddFamilyBranch({ open, closingFunction, tree }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [branches, setBranches] = useState([]);

	const [getFamilyBranches, getFamilyBranchesResults] = useLazyGetFamilyTreeBranchesQuery();

	useEffect(() => {
		if (getFamilyBranchesResults.isError) {
			const message = typeof getFamilyBranchesResults.error === "string" ? getFamilyBranchesResults.error : getFamilyBranchesResults.error.message;
			toast.error(message);
		} else if (getFamilyBranchesResults.isSuccess) {
			// toast.success(getFamilyBranchesResults.data.message);

			const { results } = getFamilyBranchesResults.data;

			setTotalPages(results?.totalPages ?? 0);
			setBranches(results?.branches ?? []);

			if (results?.branches?.length === 0) closingFunction();
		}
	}, [getFamilyBranchesResults.isFetching, getFamilyBranchesResults.isSuccess, getFamilyBranchesResults.isError]);

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
		if (user) getFamilyBranches({ treeId: tree._id, page, limit, filters: JSON.stringify(filters) });
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
									add family branches
								</DialogTitle>
							</div>
							<div className="text-center">
								{branches.length === 0 ? (
									<div className="text-center border border-gray-400 w-full py-4 flex flex-col justify-center items-center">
										<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No branches to display</h3>
										<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding a new ancestor.</p>

										<Link href={"/family/branches"} className={classNames(buttonVariants({ variant: "blueBtn" }), "mt-4")}>
											add branches
										</Link>
									</div>
								) : (
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4 gap-2">
										{branches.map((household) => (
											<FamilyBranchCard family={household} tree={tree} key={household._id} />
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
