"use client";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { nanoid } from "zod";
import { buttonVariants } from "../shadcn/button";
import { EllipsisVerticalIcon, FunnelIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { useJoinGroupMutation, useLazyGroupDiscoveriesQuery } from "@/app/lib/redux/data-fetching/global-api";
import ImageCard from "../cards/ImageCard";
import { useTheme } from "../providers/ThemeProvider";
import { getInitials } from "@/app/lib/util/global";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import Link from "next/link";

export default function GroupDiscoveryPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const filterOptions = [
		{
			id: nanoid(),
			title: "view",
			list: [
				{
					id: nanoid(),
					value: "groups",
					label: "groups"
				},
				{
					id: nanoid(),
					value: "categories",
					label: "categories"
				},
				{
					id: nanoid(),
					value: "events",
					label: "group events"
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
		target: filterOptions[0].list[0].value,
		sort: filterOptions[2].list[0].value,
		category: "",
		query: ""
	});

	const handleSearchChanges = ({ target }) => {
		const { name, value } = target;
		setFilters((filters) => ({
			...filters,
			[name]: value
		}));
	};

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const handleChanges = (name, value) => {
		switch (name) {
			case "view":
				setFilters((filters) => ({
					...filters,
					target: value
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

	const [searchResults, setSearchResults] = useState({
		type: "",
		data: []
	});

	const [groupSearch, groupSearchResults] = useLazyGroupDiscoveriesQuery();

	useEffect(() => {
		if (groupSearchResults.isError) {
			const message = typeof groupSearchResults.error === "string" ? groupSearchResults.error : groupSearchResults.error.message;
			toast.error(message);
		} else if (groupSearchResults.isSuccess) {
			// toast.success(groupSearchResults.data.message);
			const { results } = groupSearchResults.data;

			setSearchResults({
				type: results.type,
				data: results.data
			});

			setTotalPages(results?.totalPages ?? 0);
		}
	}, [groupSearchResults.isFetching, groupSearchResults.isSuccess, groupSearchResults.isError]);

	useEffect(() => {
		if (user) {
			groupSearch({ page, totalPages, limit, filters: JSON.stringify(filters), userId: user._id, userType: user.docType });
		}
	}, [page, totalPages, limit, filters, user]);

	const theme = useTheme();
	// console.log("theme", theme);

	const [joinGroup, joinGroupResults] = useJoinGroupMutation();

	useEffect(() => {
		if (joinGroupResults.isError) {
			const message = typeof joinGroupResults.error === "string" ? joinGroupResults.error : joinGroupResults.error.message;
			toast.error(message);
		} else if (joinGroupResults.isSuccess) {
			toast.success(joinGroupResults.data.message);
		}
	}, [joinGroupResults.isLoading, joinGroupResults.isSuccess, joinGroupResults.isError]);

	const dynamicSearchResults = (type, data) => {
		switch (type) {
			case "groups":
				return (
					<ul role="list" className="dark:divide-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-screen mt-8 gap-3">
						{data.map((group) => (
							<li key={group._id} className="">
								<div className="px-4 pb-4 border border-gray-300 shadow shadow-gray-500 rounded-md min-h-72">
									<div className="-mx-4 h-40 rounded-t-md overflow-clip shrink-0">
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
											<div className={classNames(theme.base, "flex justify-center items-center size-full text-white font-medium uppercase text-3xl")}>{getInitials(group?.name)}</div>
										)}
									</div>
									<div className="flex flex-1 flex-col px-8 py-4">
										<h3 className="text-sm font-medium text-gray-900 text-center capitalize hover:cursor-pointer hover:underline">
											<Link href={`/dashboard/posts/groups/view/${group?._id}`}>{group?.name}</Link>
										</h3>
										<dl className="mt-1 flex grow flex-col justify-between">
											<dt className="sr-only">about information</dt>
											<dd className="text-sm text-gray-500 text-center">{group?.about}</dd>
											<div className="grid grid-cols-2 gap-2.5">
												<div className="flex flex-col items-center">
													<dt className="sr-only">privacy</dt>
													<dd className="mt-3">
														<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20">{group?.privacy}</span>
													</dd>
												</div>
												<div className="flex flex-col items-center">
													<dt className="sr-only">visibility</dt>
													<dd className="mt-3">
														<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20">{group?.visibility}</span>
													</dd>
												</div>
												<div className="flex justify-center items-center gap-1.5">
													<dt className="text-sm capitalize">members</dt>
													<dd className="text-sm text-gray-900">{group.members.length}</dd>
												</div>
												<div className="flex justify-center items-center gap-1.5">
													<dt className="text-sm capitalize">events</dt>
													<dd className="text-sm text-gray-900">{group.events.length}</dd>
												</div>
											</div>
										</dl>
									</div>
									<div>
										<div className="-mt-px flex divide-x divide-gray-200">
											<div className="flex w-0 flex-1">
												<button onClick={() => joinGroup({ userId: user._id, userType: user.docType, groupId: group._id, docType: group.docType, event: "JOIN_GROUP" })} className={classNames(`hover:${theme.sectionNavbar.root} hover:text-white`, "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border border-transparent py-4 text-sm font-semibold text-gray-900 cursor-pointer capitalize")}>
													join
												</button>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				);
			case "categories":
				return (
					<ul role="list" className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
						{data.map((category) => (
							<li key={category._id} className="col-span-1 flex rounded-md shadow-md shadow-gray-400">
								<div className={classNames(theme.base, "flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white")}>{getInitials(category?.name)}</div>
								<div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
									<div className="flex-1 truncate px-4 py-2 text-sm">
										{category.name}
										<p className="text-gray-500">{0} groups</p>
									</div>
									<div className="shrink-0 pr-2">
										<Menu as="div" className="relative">
											<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
												<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
											</MenuButton>
											<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
												<MenuItem>
													<button className={classNames(buttonVariants({ variant: "greenBtn" }))}>join</button>
												</MenuItem>
												<MenuItem>
													<button className={classNames(buttonVariants({ variant: "orangeBtn" }))}>deactivate</button>
												</MenuItem>
											</MenuItems>
										</Menu>
									</div>
								</div>
							</li>
						))}
					</ul>
				);
			case "events":
				return;
			default:
				return (
					<div className="text-center border border-gray-400 w-full min-h-screen py-4 rounded-sm flex flex-col justify-center items-center mt-8">
						<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No groups to display</h3>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by searching for new groups.</p>
					</div>
				);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen flex flex-col">
				<span className="sr-only">Group Discovery Page</span>
				<header>
					<Disclosure as="section" aria-labelledby="filter-heading" className="grid items-center border-t border-b border-gray-200">
						{({ close }) => (
							<>
								<h2 id="filter-heading" className="sr-only">
									Filters
								</h2>
								<div className="relative mx-auto flex w-full justify-between items-center max-w-7xl p-4 text-sm sm:px-6 lg:px-8">
									<div className="flex gap-4">
										<div className="pr-6 flex justify-center items-center">
											<DisclosureButton className="group flex items-center font-medium text-gray-700 cursor-pointer">
												<FunnelIcon aria-hidden="true" className="mr-2 size-5 flex-none text-gray-400 group-hover:text-gray-500" />
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
											<fieldset key={filter.title}>
												<legend className="block font-medium capitalize bg-white text-gray-900 rounded-md px-3.5 py-2.5 text-sm shadow-sm w-full text-center ">{filter?.title}</legend>
												<div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4 grid grid-cols-1">
													{filter.list.map((option) => (
														<button
															key={option.label}
															onClick={() => {
																handleChanges(filter.title, option.value);
																close();
															}}
															className={classNames(option.value === filters?.target || option.value === filters?.sort || option.value === limit ? buttonVariants({ variant: "blueBtn" }) : buttonVariants({ variant: "ghostBtn" }), "w-full hover:bg-blue-500 hover:text-white")}>
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

					<div className="w-1/2 mx-auto mt-4">
						<div className="mt-2 flex">
							<input onChange={handleSearchChanges} id="query" name="query" value={filters.query} type="text" placeholder="search groups" className="block w-full h-12 rounded-full py-1.5 px-3.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6 bg-gray-200" />
						</div>
					</div>
				</header>
				<section>{dynamicSearchResults(searchResults.type, searchResults.data)}</section>
			</div>
		</div>
	);
}
