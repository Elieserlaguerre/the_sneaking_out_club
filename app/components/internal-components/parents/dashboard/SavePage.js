"use client";
import CollectionCard from "@/app/components/cards/CollectionCard";
import SavedCard from "@/app/components/cards/SavedCard";
import CreateAndEditCollections from "@/app/components/overlays/drawers/CreateAndEditCollections";
import { useTheme } from "@/app/components/providers/ThemeProvider";
import { buttonVariants } from "@/app/components/shadcn/button";
import { useGetSavedPostsQuery, useLazyGetCollectionsQuery, useLazyGetSavedPostsQuery } from "@/app/lib/redux/data-fetching/global-api";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, EllipsisHorizontalIcon, EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Pagination } from "@mui/material";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { nanoid } from "zod";

export default function SavePage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const department = useAtomValue(currentDepartment);

	const theme = useTheme();

	const filterOptions = [
		{
			name: "all"
		},
		{
			name: "links"
		},
		{
			name: "videos"
		},
		{
			name: "reels"
		},
		{
			name: "photos"
		}
	];

	const [filterSelections, setFilterSelections] = useState({
		contentType: filterOptions[0].name,
		collection: "",
		sort: "newest"
	});

	const clearFilter = () => {
		setFilterSelections({
			contentType: filterOptions[0].name,
			collection: "",
			sort: "newest"
		});
	};

	const [collections, setCollections] = useState([]);

	const [savedItems, setSavedItems] = useState([]);

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
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(pageSizes[0].value);

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const [getSavedPosts, getSavedPostsResults] = useLazyGetSavedPostsQuery();

	useEffect(() => {
		if (user) {
			getSavedPosts({ page, limit, filters: JSON.stringify(filterSelections), userId: user._id });
		}
	}, [user, filterSelections, page, limit]);

	useEffect(() => {
		if (getSavedPostsResults.isError) {
			const message = typeof getSavedPostsResults.error === "string" ? getSavedPostsResults.error : getSavedPostsResults.error.message;
			toast.error(message);
		} else if (getSavedPostsResults.isSuccess) {
			// toast.success(getSavedPostsResults.data.message);
			const { results } = getSavedPostsResults.data;
			setSavedItems(results?.posts ?? []);
			setTotalPages(results?.totalPages ?? 0);
		}
	}, [getSavedPostsResults.isFetching, getSavedPostsResults.isSuccess, getSavedPostsResults.isError]);

	const [openCollectionDrawer, setOpenCollectionDrawer] = useState(false);

	const handleCollectionDrawer = () => {
		setOpenCollectionDrawer(true);
	};

	const collectionPageSizes = [
		{
			id: nanoid(),
			value: 10
		},
		{
			id: nanoid(),
			value: 20
		},
		{
			id: nanoid(),
			value: 30
		},
		{
			id: nanoid(),
			value: 40
		}
	];
	const [collectionPage, setCollectionPage] = useState(1);
	const [totalCollectionPages, setTotalCollectionPages] = useState(0);
	const [collectionLimit, setCollectionLimit] = useState(collectionPageSizes[0].value);
	const [collectionFilters, setCollectionFilters] = useState({
		sort: "newest"
	});

	const handleCollectionPagination = (_, page) => {
		setCollectionPage(page);
	};

	const [getCollections, getCollectionsResults] = useLazyGetCollectionsQuery();

	useEffect(() => {
		if (getCollectionsResults.isError) {
			const message = typeof getCollectionsResults.error === "string" ? getCollectionsResults.error : getCollectionsResults.error.message;
			toast.error(message);
		} else if (getCollectionsResults.isSuccess) {
			// toast.success(getCollectionsResults.data.message);
			const { results } = getCollectionsResults.data;

			setCollections(results?.collections ?? []);
			setTotalCollectionPages(results?.totalPages ?? 0);
		}
	}, [getCollectionsResults.isFetching, getCollectionsResults.isSuccess, getCollectionsResults.isError]);

	useEffect(() => {
		if (user) {
			getCollections({ userId: user._id, page: collectionPage, limit: collectionLimit, filters: JSON.stringify(collectionFilters) });
		}
	}, [user, collectionPage, collectionLimit, collectionFilters]);

	const [editSettings, setEditSettings] = useState({
		edit: false,
		collection: ""
	});

	const handleCollectionEdit = (selectedCollection) => {
		setEditSettings({
			edit: true,
			collection: selectedCollection
		});

		handleCollectionDrawer();
	};

	const closeCollectionDrawer = () => {
		setOpenCollectionDrawer(false);
		setEditSettings({
			edit: false,
			collection: ""
		});
	};

	const dynamicDrawerButton = (department) => {
		switch (department) {
			case "members":
				return;
			case "parents":
				return buttonVariants({ variant: "orangeBtn" });
			case "teachers":
				return;
			case "admin":
				return;
			default:
				return buttonVariants({ variant: "ghostBtn" });
		}
	};

	const [openMobileCollectionDrawer, setOpenMobileCollectionDrawer] = useState(false);

	const handleMobileCollectionDrawer = () => {
		setOpenMobileCollectionDrawer((prev) => !prev);
	};

	return (
		<div className="lg:flex min-h-screen">
			<aside className="hidden inset-y-0 min-w-96 overflow-y-auto border border-gray-300 px-4 py-6 sm:px-6 lg:px-8 xl:block dark:border-white/10">
				<div className="divide-y divide-gray-400 size-full flex flex-col">
					<div className="pb-5 flex justify-between items-center">
						<h1 className="capitalize text-2xl font-bold">saved posts</h1>
						<div className="">
							<Menu as="div" className="relative">
								<MenuButton className={classNames(buttonVariants({ variant: "ghostBtn" }), "bg-gray-300! hover:bg-green-500! group cursor-pointer")}>
									<EllipsisHorizontalIcon aria-hidden="true" className="size-5 text-gray-900 group-hover:text-white" />
								</MenuButton>
								<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
									<MenuItem>
										<button onClick={handleCollectionDrawer} className={classNames(buttonVariants({ variant: "blueBtn" }))}>
											add collection
										</button>
									</MenuItem>
								</MenuItems>
							</Menu>
						</div>
					</div>
					<div className="flex-1 size-full flex flex-col">
						<div className="py-5 capitalize">my collections</div>
						<div className="py-2 flex-1">
							{collections.length > 0 ? (
								<ul role="list" className="size-full">
									{collections.map((collection) => (
										<li key={collection._id} onClick={() => setFilterSelections((filters) => ({ ...filters, collection: collection?._id }))}>
											<CollectionCard key={collection?._id} collection={collection} reset={clearFilter} edit={handleCollectionEdit} />
										</li>
									))}
								</ul>
							) : (
								<div className="text-center border border-gray-400 size-full py-4 rounded-sm flex flex-col justify-center items-center">
									<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No collections</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new collections.</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</aside>
			<main className="bg-gray-200 min-h-screen grow">
				<div className="divide-y divide-gray-200 overflow-hidden size-full flex flex-col">
					<div className="px-4 py-5 sm:px-6 bg-white flex justify-between items-center">
						<div className="h-full flex justify-center items-center">
							<span className="capitalize font-bold text-2xl">{filterSelections.contentType}</span>
						</div>
						<div className="h-full flex justify-center items-center gap-3">
							<Menu as="div" className="relative">
								<MenuButton className={classNames(buttonVariants({ variant: "ghostBtn" }), "bg-gray-300! hover:bg-green-500! group cursor-pointer")}>
									<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
								</MenuButton>
								<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
									{filterOptions.map((option) => (
										<MenuItem key={option.name}>
											<button
												onClick={() =>
													setFilterSelections((filters) => ({
														...filters,
														contentType: option?.name,
														collection: option.name === "all" ? "" : filters.collection
													}))
												}
												className={classNames("capitalize px-2.5 py-1.5 font-medium text-left hover:bg-gray-200 cursor-pointer")}>
												{option?.name}
											</button>
										</MenuItem>
									))}
								</MenuItems>
							</Menu>

							<button onClick={handleMobileCollectionDrawer} className={classNames(dynamicDrawerButton(department), "xl:hidden")}>
								<Bars3Icon className="size-5" />
							</button>
						</div>
					</div>
					<div className="px-4 py-5 sm:p-6 flex-1">
						<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
							{savedItems.map((item) => (
								<li key={item?._id} className="py-4">
									<SavedCard item={item} />
								</li>
							))}
						</ul>
					</div>
				</div>
			</main>
			<div className="hidden">
				<CreateAndEditCollections open={openCollectionDrawer} closingFunction={closeCollectionDrawer} settings={editSettings} />
				<div>
					<Dialog open={openMobileCollectionDrawer} onClose={handleMobileCollectionDrawer} className="relative z-50">
						<div className="fixed inset-0" />

						<div className="fixed inset-0 overflow-hidden">
							<div className="absolute inset-0 overflow-hidden">
								<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-md xl:pl-16">
									<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
										<form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
											<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
												<div className={classNames(theme?.sectionNavbar?.root, "px-4 py-[1.61rem] sm:px-6")}>
													<div className="flex items-center justify-between">
														<DialogTitle className="text-base font-semibold text-white capitalize">my collection</DialogTitle>
														<div className="ml-3 flex h-7 items-center">
															<button type="button" onClick={handleMobileCollectionDrawer} className="relative rounded-md bg-transparent text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
																<span className="absolute -inset-2.5" />
																<span className="sr-only">Close panel</span>
																<XMarkIcon aria-hidden="true" className="text-white w-6 h-6" />
															</button>
														</div>
													</div>
												</div>
												<div className="px-4 sm:px-6 grow overflow-y-auto pb-4">
													<div className="size-full">
														{collections.length > 0 ? (
															<ul role="list" className="size-full">
																{collections.map((collection) => (
																	<li key={collection._id} onClick={() => setFilterSelections((filters) => ({ ...filters, collection: collection?._id }))}>
																		<CollectionCard key={collection?._id} collection={collection} reset={clearFilter} edit={handleCollectionEdit} />
																	</li>
																))}
															</ul>
														) : (
															<div className="text-center border border-gray-400 size-full py-4 rounded-sm flex flex-col justify-center items-center">
																<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No collections</h3>
																<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new collections.</p>
															</div>
														)}
													</div>
												</div>
											</div>
											<div className={classNames(theme?.sectionNavbar?.root, "flex shrink-0 justify-evenly items-center px-4 py-4")}>
												<Pagination count={totalCollectionPages} page={page} siblingCount={0} variant="outlined" onChange={handleCollectionPagination} className="pagination__black-background pagination__yellow-highlight" />
											</div>
										</form>
									</DialogPanel>
								</div>
							</div>
						</div>
					</Dialog>
					;
				</div>
			</div>
		</div>
	);
}
