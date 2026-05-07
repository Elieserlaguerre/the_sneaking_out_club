"use client";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useLazyGetFamilyTreeQuery } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";
import { FamilyTreeSearchSchema } from "@/app/lib/util/global/zod-validations";
import { fromZodError } from "zod-validation-error";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { nanoid } from "nanoid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import { useDeleteSearchHistoryMutation, useLazyGetSearchHistoryQuery } from "@/app/lib/redux/data-fetching/global-api";

export default function FamilyTreeSearch({ open, closingFunction, updateFunction, page, limit, filters }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const [searchQuery, setSearchQuery] = useState({
		query: "",
		filters: {
			actions: filters.actions,
			sort: filters.sort
		},
		section: "",
		user: "",
		userType: "",
		page: "",
		limit: ""
	});

	const clearForm = () => {
		setSearchQuery({
			query: "",
			filter: {
				actions: filters.actions,
				sort: filters.sort
			},
			section: "",
			user: "",
			userType: "",
			page: "",
			limit: ""
		});
	};

	useEffect(() => {
		if (user) {
			setSearchQuery((content) => ({
				...content,
				filter: {
					actions: filters.actions,
					sort: filters.sort
				},
				section: "family tree",
				user: user._id,
				userType: user.docType,
				page,
				limit
			}));
		}
	}, [user, page, limit, filters]);

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;
		setSearchQuery((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const [getFamilyTrees, getFamilyTreesResults] = useLazyGetFamilyTreeQuery();

	useEffect(() => {
		if (getFamilyTreesResults.isError) {
			const message = typeof getFamilyTreesResults.error === "string" ? getFamilyTreesResults.error : getFamilyTreesResults.error.message;
			toast.error(message);
		} else if (getFamilyTreesResults.isSuccess) {
			// toast.success(getFamilyTreesResults.data.message);
			const { results } = getFamilyTreesResults.data;
			updateFunction(results);
			clearForm();
			closingFunction();
		}
	}, [getFamilyTreesResults.isFetching, getFamilyTreesResults.isSuccess, getFamilyTreesResults.isError]);

	const handleSubmit = (e) => {
		e?.preventDefault();

		const validation = FamilyTreeSearchSchema.safeParse(searchQuery);

		if (validation.success) {
			getFamilyTrees({ ...validation.data, filter: JSON.stringify(validation.data.filter) });
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
			console.log("error", error);
		}
	};

	const [history, setHistory] = useState([]);
	const [getSearchHistory, getSearchHistoryResults] = useLazyGetSearchHistoryQuery();

	useEffect(() => {
		if (getSearchHistoryResults.isError) {
			const message = typeof getSearchHistoryResults.error === "string" ? getSearchHistoryResults.error : getSearchHistoryResults.error.message;
			toast.error(message);
		} else if (getSearchHistoryResults.isSuccess) {
			// toast.success(getSearchHistoryResults.data.message);
			const { results } = getSearchHistoryResults.data;
			setHistory(results?.history ?? []);
		}
	}, [getSearchHistoryResults.isFetching, getSearchHistoryResults.isSuccess, getSearchHistoryResults.isError]);

	useEffect(() => {
		if (user && filters.actions === "search family trees") {
			getSearchHistory({ userId: user._id, section: "family tree", page, limit, filter: JSON.stringify(filters) });
		}
	}, [user, limit, page, filters]);

	const handleHistorySelection = (selection) => {
		setSearchQuery((content) => ({
			...content,
			query: selection.query,
			section: selection.section,
			user: selection.user,
			userType: selection.userType
		}));
	};

	const [deleteSearchQuery, deleteSearchQueryResults] = useDeleteSearchHistoryMutation();

	useEffect(() => {
		if (deleteSearchQueryResults.isError) {
			const message = typeof deleteSearchQueryResults.error === "string" ? deleteSearchQueryResults.error : deleteSearchQueryResults.error.message;
			toast.error(message);
		} else if (deleteSearchQueryResults.isSuccess) {
			toast.success(deleteSearchQueryResults.data.message);
		}
	}, [deleteSearchQueryResults.isLoading, deleteSearchQueryResults.isSuccess, deleteSearchQueryResults.isError]);

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-50">
			<div className="fixed inset-0" />

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-md xl:pl-16">
						<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
							<form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
								<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
									<div className={classNames("px-4 py-[1.61rem] sm:px-6 bg-linear-to-br from-orange-500 to-orange-700")}>
										<div className="flex items-center justify-between">
											<DialogTitle className="text-base font-semibold text-white capitalize">family tree search</DialogTitle>
											<div className="ml-3 flex h-7 items-center">
												<button type="button" onClick={closingFunction} className="relative rounded-md bg-transparent text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
													<span className="absolute -inset-2.5" />
													<span className="sr-only">Close panel</span>
													<XMarkIcon aria-hidden="true" className="text-white w-6 h-6" />
												</button>
											</div>
										</div>
									</div>
									<div className="divide-y divide-gray-200 px-4 sm:px-6 grow overflow-y-auto pb-4">
										<div className="space-y-6 pt-6 h-full flex flex-col">
											<div>
												<label htmlFor="query" className="block text-sm/6 font-medium text-gray-900 capitalize">
													search query
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="query" name="query" type="text" value={searchQuery?.query} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize" />
												</div>
											</div>
											{history.length > 0 && (
												<div className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
													<div className="px-4 py-5 sm:px-6 text-center capitalize text-sm/6">search history</div>
													<div className="px-4 py-5 sm:p-6 flex flex-col gap-2.5">
														{history.map((search) => (
															<div key={search._id} onClick={() => handleHistorySelection(search)} className="flex justify-between items-center gap-2.5 cursor-pointer">
																<div>
																	<ClockIcon className="size-6" />
																</div>
																<div className="flex-1 flex justify-between items-center">
																	<span className="capitalize">{search.query}</span>
																	<Menu as="div" className="relative">
																		<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
																			<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
																		</MenuButton>
																		<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
																			<MenuItem>
																				<button type="button" onClick={() => deleteSearchQuery({ searchId: search._id })} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
																					<TrashIcon className="size-5" />
																				</button>
																			</MenuItem>
																		</MenuItems>
																	</Menu>
																</div>
															</div>
														))}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="flex shrink-0 justify-evenly items-center px-4 py-4">
									<button type="submit" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
										{getFamilyTreesResults.isFetching ? (
											<>
												processing <Loader2 className="w-5 h-auto animate-spin inline-block ml-3" />
											</>
										) : (
											"search"
										)}
									</button>
									<button type="button" onClick={closingFunction} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
										Cancel
									</button>
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
