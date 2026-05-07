"use client";
import ConnectionCard from "@/app/components/cards/ConnectionCard";
import EmptyConnectionsState from "@/app/components/empty-states/EmptyConnectionsState";
import ConnectionCardSkeleton from "@/app/components/loading-skeletons/ConnectionCardSkeleton";
import ConnectionSearch from "@/app/components/overlays/drawers/ConnectionSearch";
import { useTheme } from "@/app/components/providers/ThemeProvider";
import { buttonVariants } from "@/app/components/shadcn/button";
import { useLazyGetConnectionsQuery } from "@/app/lib/redux/data-fetching/parents-api";
import { currentUser } from "@/app/lib/state-management/global-state";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { FunnelIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Pagination } from "@mui/material";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ConnectionsPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const filterOptions = [
		{
			id: nanoid(),
			title: "options",
			list: [
				{
					id: nanoid(),
					value: "my connections",
					label: "my connections"
				},
				{
					id: nanoid(),
					value: "favorite connections",
					label: "favorite connections"
				},
				{
					id: nanoid(),
					value: "user search",
					label: "user search"
				},
				{
					id: nanoid(),
					value: "parent search",
					label: "parent search"
				},
				{
					id: nanoid(),
					value: "teacher search",
					label: "teacher search"
				}
			]
		},
		{
			id: nanoid(),
			title: "page size",
			list: [
				{
					id: nanoid(),
					label: "25",
					value: 25
				},
				{
					id: nanoid(),
					label: "50",
					value: 50
				},
				{
					id: nanoid(),
					label: "75",
					value: 75
				},
				{
					id: nanoid(),
					label: "100",
					value: 100
				},
				{
					id: nanoid(),
					label: "125",
					value: 125
				}
			]
		},
		{
			id: nanoid(),
			title: "sort",
			list: [
				{
					id: nanoid(),
					label: "newest",
					value: "newest"
				},
				{
					id: nanoid(),
					label: "oldest",
					value: "oldest"
				}
			]
		}
	];

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(filterOptions[1].list[0].value);
	const [filters, setFilters] = useState({
		options: filterOptions[0].list[0].value,
		sort: filterOptions[2].list[0].value
	});

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const theme = useTheme();

	const resetFilters = () => {
		setLimit(filterOptions[1].list[0].value);
		setFilters({
			options: filterOptions[0].list[0].value,
			sort: filterOptions[2].list[0].value
		});
	};

	const [connections, setConnections] = useState([]);

	const [getConnections, getConnectionsResults] = useLazyGetConnectionsQuery();

	useEffect(() => {
		if (getConnectionsResults.isError) {
			const message = typeof getConnectionsResults.error === "string" ? getConnectionsResults.error : getConnectionsResults.error.message;
			toast.error(message);
		} else if (getConnectionsResults.isSuccess) {
			toast.success(getConnectionsResults.data.message);
			const { results } = getConnectionsResults.data;
			setTotalPages(results?.totalPages ?? 0);
			setConnections(results?.connections ?? []);
		}
	}, [getConnectionsResults.isFetching, getConnectionsResults.isSuccess, getConnectionsResults.isError]);

	useEffect(() => {
		if (user && filters.options !== "search") {
			getConnections({ userId: user._id, page, limit, filters: JSON.stringify(filters) });
		}
	}, [user, page, limit, filters]);

	const handleChanges = (name, value) => {
		switch (name) {
			case "options":
				setFilters((filter) => ({
					...filter,
					options: value
				}));
				break;
			case "page size":
				setLimit(value);
				break;
			case "sort":
				setFilters((filter) => ({
					...filter,
					sort: value
				}));
				break;
			default:
				toast.error("Invalid filter selection.");
				break;
		}
	};

	const [openSearchDrawer, setOpenSearchDrawer] = useState(false);

	const handleOpeningSearchDrawer = () => {
		setFilters((content) => ({
			...content,
			options: "search"
		}));
		setOpenSearchDrawer(true);
	};

	const handleClosingSearchDrawer = () => {
		setOpenSearchDrawer(false);
	};

	return (
		<div>
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen flex flex-col">
				<span className="sr-only">Connections Page</span>
				<header>
					<div className={classNames(theme.base, "px-4 py-16 text-center sm:px-6 lg:px-8")}>
						<h1 className={classNames("text-4xl font-bold tracking-tight capitalize text-white")}>connections</h1>
						<p className={classNames("mx-auto mt-4 max-w-xl text-base text-white")}>Find like minded people to connect with.</p>
					</div>

					{/* Filters */}
					<Disclosure as="section" aria-labelledby="filter-heading" className="grid items-center border-t border-b border-gray-200 ">
						{({ close }) => (
							<>
								<h2 id="filter-heading" className="sr-only">
									Filters
								</h2>
								<div className="relative mx-auto flex w-full justify-between items-center max-w-7xl p-4 text-sm sm:px-6 lg:px-8">
									<div className="flex gap-4">
										<div onClick={handleOpeningSearchDrawer} className="pr-6 flex justify-center items-center">
											<button className={classNames(buttonVariants({ variant: "blueBtn" }))}>new search</button>
										</div>
										<div className="pr-6 flex justify-center items-center">
											<DisclosureButton className="group flex items-center font-medium text-gray-700">
												<FunnelIcon aria-hidden="true" className="mr-2 w-5 h-5 flex-none text-gray-400 group-hover:text-gray-500" />
												Filters
											</DisclosureButton>
										</div>
									</div>
									<div className="flex justify-center items-center">
										<button type="button" className={classNames(buttonVariants({ variant: "ghostBtn" }), "hover:bg-blue-600 hover:text-white cursor-pointer")}>
											Clear all
										</button>
									</div>
								</div>
								<DisclosurePanel className="border-t border-gray-200 py-10 bg-gray-300">
									<div className="mx-auto grid max-w-7xl grid-cols-3 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
										{filterOptions.map((filter) => (
											<fieldset key={filter?.id}>
												<legend className="block font-medium capitalize bg-white text-gray-900 rounded-md px-3.5 py-2.5 text-sm shadow-sm w-full text-center ">{filter?.title}</legend>
												<div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4 grid grid-cols-1">
													{filter.list.map((option) => (
														<button
															key={option.id}
															onClick={() => {
																handleChanges(filter.title, option.value);
																close();
															}}
															className={classNames(option.value === filters?.options || option.value === filters?.sort || option.value === limit ? buttonVariants({ variant: "blueBtn" }) : buttonVariants({ variant: "ghostBtn" }), "w-full hover:bg-blue-500 hover:text-white")}>
															{option.label}
														</button>
													))}
												</div>
											</fieldset>
										))}
									</div>
								</DisclosurePanel>
							</>
						)}
					</Disclosure>
				</header>
				<div className="divide-y divide-gray-200 bg-gray-200 shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 grow">
					<div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
						{getConnectionsResults.isFetching ? (
							Array.from({ length: 12 }).map((connection, idx) => <ConnectionCardSkeleton key={`${idx}_${nanoid()}`} connection={connection} />)
						) : connections.length > 0 ? (
							connections.map((connection) => (
								<ConnectionCard
									key={connection._id}
									connection={connection}
									settings={{
										connectionRequest: filters.options === "my connections" ? false : filters.options === "favorite connections" ? false : true,
										myConnections: filters.options === "my connections",
										myFavorites: filters.options === "favorite connections"
									}}
								/>
							))
						) : (
							<EmptyConnectionsState />
						)}
					</div>
					<div className={classNames(theme.base, "px-4 py-4 sm:px-6 flex justify-center items-center")}>
						<Pagination count={totalPages} page={page} siblingCount={0} variant="outlined" onChange={handlePagination} className="pagination__black-background pagination__yellow-highlight" />
					</div>
				</div>
			</div>
			<div className="hidden">
				<ConnectionSearch open={openSearchDrawer} closingFunction={handleClosingSearchDrawer} updateFunction={setConnections} filters={filters} page={page} limit={limit} />
			</div>
		</div>
	);
}
