"use client";
import { useLazyGetYourGroupsQuery } from "@/app/lib/redux/data-fetching/global-api";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { nanoid } from "zod";
import ImageCard from "../cards/ImageCard";
import { dynamicButton, getInitials } from "@/app/lib/util/global";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useTheme } from "../providers/ThemeProvider";
import Link from "next/link";
import { buttonVariants } from "../shadcn/button";

export default function GroupManagementPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const [myGroups, setMyGroups] = useState([]);

	const user = useAtomValue(currentUser);

	const department = useAtomValue(currentDepartment);

	const pageSizes = [
		{
			id: nanoid(),
			value: 25
		},
		{
			id: nanoid(),
			value: 50
		},
		{
			id: nanoid(),
			value: 75
		},
		{
			id: nanoid(),
			value: 100
		}
	];

	const [page, setPage] = useState(1);
	const [totalDocuments, setTotalDocuments] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(pageSizes[0].value);
	const [filters, setFilters] = useState({
		sort: "newest"
	});

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const [getMyGroups, getMyGroupsResults] = useLazyGetYourGroupsQuery();

	useEffect(() => {
		if (getMyGroupsResults.isError) {
			const message = typeof getMyGroupsResults.error === "string" ? getMyGroupsResults.error : getMyGroupsResults.error.message;
			toast.error(message);
		} else if (getMyGroupsResults.isSuccess) {
			toast.success(getMyGroupsResults.data.message);

			const { results } = getMyGroupsResults.data;
			setTotalDocuments(results?.totalDocuments ?? 0);
			setTotalPages(results?.totalPages ?? 0);
			setMyGroups(results?.groups ?? []);
		}
	}, [getMyGroupsResults.isFetching, getMyGroupsResults.isSuccess, getMyGroupsResults.isError]);

	useEffect(() => {
		if (user) {
			getMyGroups({ userId: user._id, page, limit, filters: JSON.stringify(filters) });
		}
	}, [user, page, limit, filters]);

	const sortingOptions = [
		{
			name: "default"
		},
		{
			name: "alphabetically"
		},
		{
			name: "oldest"
		},
		{
			name: "newest"
		}
	];

	const groupOptions = [
		{
			name: "report group"
		},
		{
			name: "leave group"
		}
	];
	return (
		<div className="size-full flex-1">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 flex flex-col bg-white size-full">
				<span className="sr-only">your groups page</span>
				<header className="md:flex md:items-center md:justify-between py-4">
					<div className="min-w-0 flex-1">
						<h2 className="text-xl/7 font-semibold text-gray-900 sm:truncate sm:tracking-tight">Groups you're a part of: {totalDocuments}</h2>
					</div>
					<div className="mt-4 flex md:mt-0 md:ml-4">
						<Menu as="div" className="relative hidden sm:block">
							<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">sort</MenuButton>
							<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
								{sortingOptions.map((option) => (
									<MenuItem key={option.name}>
										<button onClick={() => setFilters((filters) => ({ ...filters, sort: option.name }))} className={classNames("text-gray-900 capitalize cursor-pointer")}>
											{option.name}
										</button>
									</MenuItem>
								))}
							</MenuItems>
						</Menu>
					</div>
				</header>
				<section>
					<ul role="list" className="size-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{myGroups.map((group) => (
							<li key={group._id}>
								<div className="rounded-lg bg-white shadow-md shadow-gray-300 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-300">
									<div className="px-4 py-5 flex justify-start items-center flex-wrap gap-4">
										<div className="size-20 shrink-0">
											{group?.image ? (
												<div className="size-full rounded-md overflow-clip">
													<ImageCard
														image={group?.image}
														settings={{
															alt: "group image card",
															styles: {
																image: "object-contain object-center",
																background: "size-full"
															}
														}}
													/>
												</div>
											) : (
												<div className={classNames(theme.base, "rounded-md flex justify-center items-center size-full text-white font-medium uppercase")}>{getInitials(group?.name)}</div>
											)}
										</div>
										<dl className="flex-1">
											<dt className="capitalize font-medium text-nowrap truncate">{group?.name}</dt>
											<dd className="text-sm text-gray-700 capitalize">{group?.privacy}</dd>
											<dd className="text-sm text-gray-700 capitalize mt-1.5">
												<Link href={`/dashboard/posts/groups/view/${group._id}`} className={classNames(dynamicButton(department), "w-full")}>
													view group
												</Link>
											</dd>
										</dl>
										<Menu as="div" className="relative">
											<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
												<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
											</MenuButton>
											<MenuItems transition className="absolute right-3.5 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
												{groupOptions.map((option) => (
													<MenuItem key={option.name}>
														<button className={classNames("text-sm capitalize")}>{option.name}</button>
													</MenuItem>
												))}
											</MenuItems>
										</Menu>
									</div>
								</div>
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	);
}
