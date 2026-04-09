"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { FunnelIcon, PlusIcon } from "@heroicons/react/20/solid";
import { nanoid } from "nanoid";
import { useTheme } from "../../providers/ThemeProvider";
import { Pagination } from "@mui/material";
import EmptyFamilyMembers from "../../empty-states/EmptyFamilyMembers";
import ManageFamilyMembers from "../../overlays/ManageFamilyMembers";
import { useGetFamilyMembersQuery, useLazyGetFamilyMembersQuery } from "@/app/lib/redux/data-fetching/parents-api";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import toast from "react-hot-toast";
import FamilyMemberCard from "../../cards/FamilyMemberCard";

export default function FamilyMembersPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

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
					value: "probation",
					label: "probation"
				},
				{
					id: nanoid(),
					value: "suspended",
					label: "suspended"
				},
				{
					id: nanoid(),
					value: "expelled",
					label: "expelled"
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
				},
				{
					id: nanoid(),
					label: "youngest",
					value: "youngest"
				}
			]
		}
	];

	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(filterOptions[1].list[0].value);
	const [filters, setFilters] = useState({
		status: filterOptions[0].list[0].value,
		sort: filterOptions[2].list[0].value
	});

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const theme = useTheme();

	const [familyMembers, setFamilyMembers] = useState([]);

	const [openDrawer, setOpenDrawer] = useState(false);

	const [drawerSettings, setDrawerSettings] = useState("newEntry");

	const handleOpenDrawer = () => {
		setDrawerSettings("newEntry");
		setOpenDrawer(true);
	};

	const handleDrawerEditMode = () => {
		setDrawerSettings("editMode");
		setOpenDrawer(true);
	};

	const closeDrawer = () => {
		setDrawerSettings("newEntry");
		setOpenDrawer(false);
	};

	const [getFamilyMembers, getFamilyMembersResults] = useLazyGetFamilyMembersQuery();

	useEffect(() => {
		if (getFamilyMembersResults.isError) {
			const message = typeof getFamilyMembersResults.error === "string" ? getFamilyMembersResults.error : getFamilyMembersResults.error.message;
			toast.error(message);
		} else if (getFamilyMembersResults.isSuccess) {
			toast.success(getFamilyMembersResults.data.message);

			const { results } = getFamilyMembersResults.data;
			// console.log("results", results);

			setFamilyMembers(results.familyMembers);
			setTotalPages(results.totalPages);
		}
	}, [getFamilyMembersResults.isFetching, getFamilyMembersResults.isSuccess, getFamilyMembersResults.isError]);

	useEffect(() => {
		if (user?._id) getFamilyMembers({ userId: user._id, page, limit, filter: JSON.stringify(filters) });
	}, [user, page, limit, filters]);

	const handleChanges = (name, value) => {
		switch (name) {
			case "status":
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
		<div>
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen flex flex-col">
				<h2 className="sr-only">family members page</h2>
				<header>
					<div className={classNames(theme.base, "px-4 py-16 text-center sm:px-6 lg:px-8 bg-linear-to-br from-blue-500 to-blue-700")}>
						<h1 className={classNames("text-4xl font-bold tracking-tight capitalize text-white")}>family members</h1>
						<p className={classNames("mx-auto mt-4 max-w-xl text-base text-white")}>Add, remove, and manage your family members all in one place.</p>
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
											<button onClick={handleOpenDrawer} className={classNames(buttonVariants({ variant: "blueBtn" }))}>
												<PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 w-5 h-5" />
												family
											</button>
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
				<div className="divide-y divide-gray-200 overflow-hidden bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 min-h-screen flex flex-col">
					<div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100">{getFamilyMembersResults.isFetching ? "" : familyMembers.length === 0 ? <EmptyFamilyMembers /> : familyMembers?.map((member) => <FamilyMemberCard key={member?._id} member={member} editFunction={handleDrawerEditMode} />)}</div>
					<div className={classNames(theme.base, "px-4 py-4 sm:px-6 flex justify-center items-center")}>
						<Pagination count={totalPages} defaultPage={page} siblingCount={0} variant="outlined" onChange={handlePagination} className="pagination-black pagination-yellow" />
					</div>
				</div>
				<div className="hidden">
					<ManageFamilyMembers
						open={openDrawer}
						closingFunction={closeDrawer}
						settings={{
							mode: drawerSettings
						}}
					/>
				</div>
			</div>
		</div>
	);
}
