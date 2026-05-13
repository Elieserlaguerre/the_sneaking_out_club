"use client";
import { Dialog, DialogPanel, DialogTitle, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, ChevronUpIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { nanoid } from "nanoid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../providers/ThemeProvider";
import { useEffect, useState } from "react";
import { buttonVariants } from "../shadcn/button";
import { Pagination } from "@mui/material";
import { useGetProgramsQuery } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";

export const metadata = {
	title: "The Sneaking Out Club",
	description: "Family management app"
};

function ProgramLayout({ children }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const initialState = [
		{
			_id: nanoid(),
			name: "category 1",
			slug: "category-1",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 2",
			slug: "category-2",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 3",
			slug: "category-3",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 4",
			slug: "category-4",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 5",
			slug: "category-5",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 6",
			slug: "category-6",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 7",
			slug: "category-7",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 8",
			slug: "category-8",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 9",
			slug: "category-9",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 10",
			slug: "category-10",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 11",
			slug: "category-11",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 12",
			slug: "category-12",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 13",
			slug: "category-13",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 14",
			slug: "category-14",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		},
		{
			_id: nanoid(),
			name: "category 15",
			slug: "category-15",
			subcategories: [
				{
					icon: null,
					name: "members",
					slug: "members",
					subdomain: "",
					_id: nanoid()
				}
			]
		}
	];

	const [categories, setCategories] = useState(initialState);

	const path = usePathname();

	const theme = useTheme();

	const [openCategoryDrawer, setOpenCategoryDrawer] = useState(false);

	const closeCategoryDrawer = () => {
		setOpenCategoryDrawer(false);
	};

	const handleCategoryDrawerOpening = () => {
		setOpenCategoryDrawer(true);
	};

	const filterOptions = [
		{
			id: nanoid(),
			title: "status",
			list: [
				{
					id: nanoid(),
					value: "active",
					label: "active"
				},
				{
					id: nanoid(),
					value: "ending soon",
					label: "ending soon"
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
		status: filterOptions[0].list[0].value,
		sort: filterOptions[2].list[0].value
	});

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const categoriesQuery = useGetProgramsQuery({ page, limit, filters: JSON.stringify(filters) }, { refetchOnMountOrArgChange: true, refetchOnReconnect: true });

	useEffect(() => {
		if (categoriesQuery.isError) {
			const message = typeof categoriesQuery.error === "string" ? categoriesQuery.error : categoriesQuery.error.message;
			toast.error(message);
		} else if (categoriesQuery.isSuccess) {
			toast.success(categoriesQuery.data.message);

			const { results } = categoriesQuery.data;

			setTotalPages(results?.totalPages ?? 0);
			setCategories(results?.categories ?? []);
		}
	}, [categoriesQuery.isFetching, categoriesQuery.isSuccess, categoriesQuery.isError]);

	const handleChanges = (name, value) => {
		switch (name) {
			case "shipment type":
				setFilters((filter) => ({
					...filter,
					status: value
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

	return (
		<div className="min-h-screen">
			<div className={classNames("mx-auto w-full px-4 sm:px-6 lg:px-8 lg:w-11/12 min-h-screen flex flex-col")}>
				<span className="sr-only">programs</span>

				<header>
					<div className={classNames(theme.base, "px-4 py-16 text-center sm:px-6 lg:px-8")}>
						<h1 className={classNames("text-4xl font-bold tracking-tight capitalize text-white")}>programs</h1>
						<p className={classNames("mx-auto mt-4 max-w-xl text-base text-white")}>Browse through available community programs.</p>
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
															className={classNames(option.value === filters?.status || option.value === filters?.sort || option.value === limit ? buttonVariants({ variant: "blueBtn" }) : buttonVariants({ variant: "ghostBtn" }), "w-full hover:bg-blue-500 hover:text-white")}>
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

				<section className={classNames("lg:flex lg:gap-4 min-h-screen")}>
					<aside className={classNames(categories.length === 0 ? "hidden" : "hidden inset-y-0 w-96 overflow-y-auto border border-gray-400 xl:block dark:border-white/10 rounded-md bg-gray-200")}>
						<div className="divide-y divide-gray-300 bg-gray-200">
							{categories.map((category) => (
								<Disclosure key={category._id} as="div" className="py-3">
									<h3 className="-my-3 flow-root">
										<DisclosureButton className={classNames(theme.sectionNavbar.root, theme.text.navbar, "group flex gap-x-3 p-4 text-sm/6 font-semibold capitalize w-full")}>
											{/* <section.icon aria-hidden="true" className={classNames("h-6 w-6 shrink-0")} /> */}
											<span className="truncate capitalize">{category.name}</span>
											<span className="ml-6 flex items-center grow justify-end">
												<ChevronDownIcon aria-hidden="true" className="w-5 h-5 group-data-open:hidden" />
												<ChevronUpIcon aria-hidden="true" className="w-5 h-5 group-[&:not([data-open])]:hidden" />
											</span>
										</DisclosureButton>
									</h3>
									<DisclosurePanel className="pt-6">
										<ul role="list" className="ml-10 mt-2 space-y-1">
											{category.subcategories.map((subcategory) => {
												return (
													<li key={subcategory._id}>
														<Link href={`/dashboard/programs/${category.slug}/${subcategory.slug}`} className={classNames(path.includes(subcategory.href) ? `${theme.contrast} ${theme.text.dark}` : `text-gray-900`, "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold capitalize")}>
															{subcategory.icon && <subcategory.icon aria-hidden="true" className={classNames("h-6 w-6 shrink-0")} />}
															<span className="truncate">{subcategory.name}</span>
														</Link>
													</li>
												);
											})}
										</ul>
									</DisclosurePanel>
								</Disclosure>
							))}
						</div>

						{totalPages > 1 && (
							<div className={classNames(theme.base, "px-4 py-4 sm:px-6 flex justify-center items-center")}>
								<Pagination count={totalPages} page={page} siblingCount={0} variant="outlined" onChange={handlePagination} className="pagination_black-background pagination_yellow-highlight" />
							</div>
						)}
					</aside>
					<main className={classNames("border border-gray-400 rounded-md relative flex-auto flex flex-col")}>
						<div className="absolute top-0 left-0 p-4 block  xl:hidden">
							<button onClick={handleCategoryDrawerOpening} className={classNames(buttonVariants({ variant: "grayCircularBtn" }))}>
								{openCategoryDrawer ? <XMarkIcon aria-hidden="true" className="size-5" /> : <Bars3Icon className="size-5" />}
							</button>
						</div>
						<div className="flex-auto">{children}</div>
					</main>

					<div className="hidden">
						<Dialog open={openCategoryDrawer} onClose={closeCategoryDrawer} className="relative z-50">
							<div className="fixed inset-0" />

							<div className="fixed inset-0 overflow-hidden">
								<div className="absolute inset-0 overflow-hidden">
									<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-md xl:pl-16">
										<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
											<div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
												<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
													<div className={classNames(theme.base, "px-4 py-[1.61rem] sm:px-6")}>
														<div className="flex items-center justify-between">
															<DialogTitle className="text-base font-semibold text-white capitalize">program categories</DialogTitle>
															<div className="ml-3 flex h-7 items-center">
																<button type="button" onClick={closeCategoryDrawer} className="relative rounded-md bg-transparent text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
																	<span className="absolute -inset-2.5" />
																	<span className="sr-only">Close panel</span>
																	<XMarkIcon aria-hidden="true" className="text-white w-6 h-6" />
																</button>
															</div>
														</div>
													</div>
													<div className="divide-y divide-gray-200 px-4 sm:px-6 grow overflow-y-auto pb-4">
														<div className="space-y-6 pt-6 h-full flex flex-col">
															{categories.map((category) => (
																<Disclosure key={category._id} as="div" className="py-3">
																	<h3 className="-my-3 flow-root">
																		<DisclosureButton className={classNames(theme.sectionNavbar.root, theme.text.navbar, "group flex gap-x-3 p-4 text-sm/6 font-semibold capitalize w-full")}>
																			{/* <section.icon aria-hidden="true" className={classNames("h-6 w-6 shrink-0")} /> */}
																			<span className="truncate capitalize">{category.name}</span>
																			<span className="ml-6 flex items-center grow justify-end">
																				<ChevronDownIcon aria-hidden="true" className="w-5 h-5 group-data-open:hidden" />
																				<ChevronUpIcon aria-hidden="true" className="w-5 h-5 group-[&:not([data-open])]:hidden" />
																			</span>
																		</DisclosureButton>
																	</h3>
																	<DisclosurePanel className="pt-6">
																		<ul role="list" className="ml-10 mt-2 space-y-1">
																			{category.subcategories.map((item) => {
																				return (
																					<li key={item._id}>
																						<Link href={item.href} className={classNames(path.includes(item.href) ? `${theme.contrast} ${theme.text.dark}` : `text-gray-900`, "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold capitalize")}>
																							{item.icon && <item.icon aria-hidden="true" className={classNames("h-6 w-6 shrink-0")} />}
																							<span className="truncate">{item.name}</span>
																						</Link>
																					</li>
																				);
																			})}
																		</ul>
																	</DisclosurePanel>
																</Disclosure>
															))}
														</div>
													</div>
													<div className={classNames(theme.base, "flex justify-center items-center py-5")}>
														<Pagination count={totalPages} page={page} siblingCount={0} variant="outlined" onChange={handlePagination} className="pagination__black-background pagination__yellow-highlight" />
													</div>
												</div>
											</div>
										</DialogPanel>
									</div>
								</div>
							</div>
						</Dialog>
					</div>
				</section>
			</div>
		</div>
	);
}

export default ProgramLayout;
