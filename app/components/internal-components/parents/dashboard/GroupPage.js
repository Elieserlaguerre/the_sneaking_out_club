"use client";

import { currentUser } from "@/app/lib/state-management/global-state";
import { PlusIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { nanoid } from "zod";
import { CgFeed } from "react-icons/cg";
import { TbEyeSearch } from "react-icons/tb";
import { buttonVariants } from "@/app/components/shadcn/button";
import { useTheme } from "@/app/components/providers/ThemeProvider";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import GroupPreviewCard from "@/app/components/cards/GroupPreviewCard";
import CreateAndManageGroup from "@/app/components/overlays/drawers/CreateAndManageGroup";
import { useLazyGetManagedGroupsQuery } from "@/app/lib/redux/data-fetching/global-api";
import toast from "react-hot-toast";
import GroupCard from "@/app/components/cards/GroupCard";

export default function GroupPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const theme = useTheme();

	const sideNav = [
		{
			id: nanoid(),
			icon: CgFeed,
			name: "your feed",
			destination: "/dashboard/posts/groups"
		},
		{
			id: nanoid(),
			icon: TbEyeSearch,
			name: "discover",
			destination: "/dashboard/posts/groups"
		},
		{
			id: nanoid(),
			icon: UserGroupIcon,
			name: "your groups",
			destination: "/dashboard/posts/groups"
		}
	];

	const [managedGroups, setManagedGroups] = useState([]);
	const [joinedGroups, setJoinedGroups] = useState([]);
	const [viewGroupPreview, setViewGroupPreview] = useState(false);
	const [openGroupDrawer, setOpenGroupDrawer] = useState(false);
	const [openMobilSideNav, setOpenMobilSideNav] = useState(false);
	const [groupEditSettings, setGroupEditSettings] = useState({
		edit: false,
		group: ""
	});

	const handleMobileSideNav = () => {
		setOpenMobilSideNav((prev) => !prev);
	};

	const handleGroupCreation = () => {
		setViewGroupPreview(true);
		setOpenGroupDrawer(true);
	};

	const closeGroupCreationDrawer = () => {
		setOpenGroupDrawer(false);
		if (groupEditSettings.edit === true) {
			setGroupEditSettings({
				edit: false,
				group: ""
			});
		}
	};

	const closeGroupPreview = () => {
		setViewGroupPreview(false);
	};

	const handleGroupEdit = (selection) => {
		handleGroupCreation();
		setGroupEditSettings({
			edit: true,
			group: selection
		});
	};

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
	const [managedGroupPage, setManagedGroupPage] = useState(1);
	const [managedGroupTotalPages, setManagedGrouptTotalPages] = useState(0);
	const [managedGroupLimit, setManagedGroupLimit] = useState(pageSizes[0].value);
	const [managedGroupfilters, setManagedGroupFilters] = useState({
		sort: "newest"
	});

	const handleManagedGroupPagination = (_, page) => {
		setManagedGroupPage(page);
	};

	const [getManagedGroups, getManagedGroupResults] = useLazyGetManagedGroupsQuery();

	useEffect(() => {
		if (getManagedGroupResults.isError) {
			const message = typeof getManagedGroupResults.error === "string" ? getManagedGroupResults.error : getManagedGroupResults.error.message;
			toast.error(message);
		} else if (getManagedGroupResults.isSuccess) {
			toast.success(getManagedGroupResults.data.message);

			const { results } = getManagedGroupResults.data;
			setManagedGrouptTotalPages(results?.totalPages ?? 0);
			setManagedGroups(results?.groups ?? []);
		}
	}, [getManagedGroupResults.isFetching, getManagedGroupResults.isSuccess, getManagedGroupResults.isError]);

	useEffect(() => {
		if (user) {
			getManagedGroups({ userId: user._id, page: managedGroupPage, limit: managedGroupLimit, filters: JSON.stringify(managedGroupfilters) });
		}
	}, [user, managedGroupPage, managedGroupLimit, managedGroupfilters]);

	return (
		<div className="lg:flex min-h-screen">
			<aside className="hidden inset-y-0 min-w-96 overflow-y-auto border border-gray-300 px-4 py-6 sm:px-6 lg:px-8 xl:block dark:border-white/10">
				<dl className="size-full divide-y divide-gray-300 flex flex-col">
					<div className="py-1.5">
						<dt className="text-2xl font-bold text-gray-900 capitalize">groups</dt>
						<dd className="h-10 w-full my-4">
							<input type="text" name="searchGroups" id="" placeholder="Search groups" className="bg-gray-200 size-full p-1 rounded-md" />
						</dd>
					</div>
					<div className="py-4">
						<dt className="text-lg text-gray-900 sr-only">group section side navigation</dt>
						<dd>
							<div className="py-5">
								<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
									{sideNav.map((nav) => (
										<li key={nav.name} className="py-4 flex gap-4 justify-start items-center capitalize font-medium hover:bg-gray-200 cursor-pointer">
											<span className={classNames(theme.base, "rounded-full flex justify-center items-center p-2.5 text-white")}>
												<nav.icon className="size-5" />
											</span>
											{nav.name}
										</li>
									))}
								</ul>
							</div>
							<div className="py-4">
								<button onClick={handleGroupCreation} className={classNames(buttonVariants({ variant: "blueBtn" }), "w-full")}>
									<PlusIcon className="size-5" />
									create new group
								</button>
							</div>
						</dd>
					</div>
					<div className="py-4">
						<dt className="text-lg text-gray-900 font-medium">Groups you manage</dt>
						<dd className="mt-2.5 size-full max-h-screen overflow-y-auto">
							{managedGroups.length > 0 ? (
								<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10 flex flex-col gap-2.5">
									{managedGroups.map((group) => (
										<li key={group._id}>
											<GroupCard group={group} editFunction={handleGroupEdit} />
										</li>
									))}
								</ul>
							) : (
								<div className="text-center border border-gray-400 w-full py-4 rounded-sm flex flex-col justify-center items-center">
									<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No groups being managed</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new group.</p>
								</div>
							)}
						</dd>
					</div>
					<div className="py-4 flex-1">
						<dt className="text-lg text-gray-900 font-medium">Groups you've joined</dt>
						<dd className="mt-2.5 size-full flex flex-col flex-1 max-h-screen overflow-y-auto">
							{joinedGroups.length > 0 ? (
								<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10 flex flex-col gap-2.5">
									{joinedGroups.map((group) => (
										<li key={group._id}>
											<GroupCard group={group} />
										</li>
									))}
								</ul>
							) : (
								<div className="border border-gray-400 py-4 rounded-sm flex flex-col justify-center items-center flex-1">
									<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No groups joined</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by joingin a new group.</p>
								</div>
							)}
						</dd>
					</div>
				</dl>
			</aside>
			<main className="grow">
				<div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 bg-gray-200 size-full">{viewGroupPreview ? <GroupPreviewCard closingFunction={closeGroupPreview} /> : ""}</div>
			</main>
			<div className="hidden">
				<CreateAndManageGroup open={openGroupDrawer} closingFunction={closeGroupCreationDrawer} settings={groupEditSettings} />
				<div>
					<Dialog open={openMobilSideNav} onClose={handleMobileSideNav} className="relative z-50">
						<div className="fixed inset-0" />

						<div className="fixed inset-0 overflow-hidden">
							<div className="absolute inset-0 overflow-hidden">
								<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-md xl:pl-16">
									<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
										<form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
											<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
												<div className={classNames(theme.base, "px-4 py-[1.61rem] sm:px-6")}>
													<div className="flex items-center justify-between">
														<DialogTitle className="text-base font-semibold text-white capitalize">groups</DialogTitle>
														<div className="ml-3 flex h-7 items-center">
															<button type="button" onClick={handleMobileSideNav} className="relative rounded-md bg-transparent text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
																<span className="absolute -inset-2.5" />
																<span className="sr-only">Close panel</span>
																<XMarkIcon aria-hidden="true" className="text-white w-6 h-6" />
															</button>
														</div>
													</div>
												</div>
												<div className="divide-y divide-gray-200 px-4 sm:px-6 grow overflow-y-auto pb-4">
													<dl className="size-full divide-y divide-gray-300">
														<div className="py-1.5">
															<dt className="text-2xl font-bold text-gray-900 capitalize">groups</dt>
															<dd className="h-10 w-full my-4">
																<input type="text" name="searchGroups" id="" placeholder="Search groups" className="bg-gray-200 size-full p-1 rounded-md" />
															</dd>
														</div>
														<div className="py-4">
															<dt className="text-lg text-gray-900 sr-only">group section side navigation</dt>
															<dd>
																<div className="py-5">
																	<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
																		{sideNav.map((nav) => (
																			<li key={nav.name} className="py-4 flex gap-4 justify-start items-center capitalize font-medium hover:bg-gray-200 cursor-pointer">
																				<span className={classNames(theme.base, "rounded-full flex justify-center items-center p-2.5 text-white")}>
																					<nav.icon className="size-5" />
																				</span>
																				{nav.name}
																			</li>
																		))}
																	</ul>
																</div>
																<div className="py-4">
																	<button onClick={handleGroupCreation} className={classNames(buttonVariants({ variant: "blueBtn" }), "w-full")}>
																		<PlusIcon className="size-5" />
																		create new group
																	</button>
																</div>
															</dd>
														</div>
														<div className="py-4">
															<dt className="text-lg text-gray-900 font-medium">Groups you manage</dt>
															<dd className="mt-2.5">
																{managedGroups.length > 0 ? (
																	<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10 flex flex-col gap-2.5">
																		{managedGroups.map((group) => (
																			<li key={group._id}>
																				<GroupCard group={group} editFunction={handleGroupEdit} />
																			</li>
																		))}
																	</ul>
																) : (
																	<div className="text-center border border-gray-400 w-full py-4 rounded-sm flex flex-col justify-center items-center">
																		<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No groups being managed</h3>
																		<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new group.</p>
																	</div>
																)}
															</dd>
														</div>
														<div className="py-4">
															<dt className="text-lg text-gray-900 font-medium">Groups you've joined</dt>
															<dd className="mt-2.5 min-h-48 flex flex-col">
																{joinedGroups.length > 0 ? (
																	<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10 flex flex-col gap-2.5">
																		{joinedGroups.map((group) => (
																			<li key={group._id}>
																				<GroupCard group={group} />
																			</li>
																		))}
																	</ul>
																) : (
																	<div className="border border-gray-400 py-4 rounded-sm flex flex-col justify-center items-center flex-1">
																		<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No groups joined</h3>
																		<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by joingin a new group.</p>
																	</div>
																)}
															</dd>
														</div>
													</dl>
												</div>
											</div>
											<div className="flex shrink-0 justify-evenly items-center px-4 py-4">
												<button type="submit" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
													submit
												</button>
												<button type="button" onClick={handleMobileSideNav} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
													Cancel
												</button>
											</div>
										</form>
									</DialogPanel>
								</div>
							</div>
						</div>
					</Dialog>
				</div>
			</div>
		</div>
	);
}
