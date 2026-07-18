"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ImageCard from "../cards/ImageCard";
import { useLazyViewGroupQuery } from "@/app/lib/redux/data-fetching/global-api";
import toast from "react-hot-toast";
import { dynamicButton, dynamicHighlights, getInitials } from "@/app/lib/util/global";
import { useTheme } from "../providers/ThemeProvider";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "../shadcn/button";
import Link from "next/link";

export default function ViewGroupLayout({ children }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const department = useAtomValue(currentDepartment);

	const { groupId } = useParams();

	const [group, setGroup] = useState(null);

	const [getGroup, getGroupResults] = useLazyViewGroupQuery();

	useEffect(() => {
		if (getGroupResults.isError) {
			const message = typeof getGroupResults.error === "string" ? getGroupResults.error : getGroupResults.error.message;
			toast.error(message);
		} else if (getGroupResults.isSuccess) {
			// toast.success(getGroupResults.data.message);

			const { results } = getGroupResults.data;
			setGroup(results);
		}
	}, [getGroupResults.isFetching, getGroupResults.isSuccess, getGroupResults.isError]);

	useEffect(() => {
		if (groupId) {
			getGroup({ groupId });
		}
	}, [groupId]);

	const theme = useTheme();
	// console.log("theme", theme);

	const path = usePathname();

	const tabs = [
		{
			name: "about",
			href: `/dashboard/posts/groups/view/${groupId}`,
			current: true
		},
		{
			name: "posts",
			href: `/dashboard/posts/groups/view/${groupId}/group-posts`,
			current: false
		},
		{
			name: "members",
			href: `/dashboard/posts/groups/view/${groupId}/members`,
			current: false
		},
		{
			name: "media",
			href: `/dashboard/posts/groups/view/${groupId}/media`,
			current: false
		},
		{
			name: "events",
			href: `/dashboard/posts/groups/view/${groupId}/group-events`,
			current: false
		},
		{
			name: "files",
			href: `/dashboard/posts/groups/view/${groupId}/files`,
			current: false
		},
		{
			name: "managers",
			href: `/dashboard/posts/groups/view/${groupId}/managers`,
			current: false
		}
	];

	const [navLinks, setNavLinks] = useState(tabs);

	useEffect(() => {
		if (path) {
			setNavLinks((links) =>
				links.map((link) => ({
					...link,
					current: link.href === path
				}))
			);
		}
	}, [path]);

	return (
		<div className="bg-white min-h-screen">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen flex flex-col">
				<span className="sr-only">view group page</span>
				<header>
					<div className="h-32 w-full object-cover lg:h-96 bg-gray-300">
						<ImageCard
							image={group?.image}
							settings={{
								alt: "Group banner image",
								styles: {
									image: "object-cover object-center",
									background: "size-full bg-gray-300"
								}
							}}
						/>
					</div>
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
							<div className={classNames(theme.base, "flex justify-center items-center size-24 rounded-full ring-4 ring-white sm:size-32 text-white text-3xl font-bold")}>{getInitials(group?.name)}</div>
							<div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
								<div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
									<h1 className="truncate text-2xl font-bold text-gray-900 capitalize">{group?.name}</h1>
								</div>
								<div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
									<button className={classNames(dynamicButton(department))}>
										<PlusIcon className="size-5" />
										invite
									</button>
									<button type="button" className={classNames(buttonVariants({ variant: "ghostBtn" }), "bg-gray-200! cursor-pointer")}>
										share
									</button>
									<button type="button" className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50">
										<span>Call</span>
									</button>
								</div>
							</div>
						</div>
						<div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
							<h1 className="truncate text-2xl font-bold text-gray-900">{group?.name}</h1>
						</div>
					</div>
					<div className="border-t border-gray-300 mt-5">
						<div className="grid grid-cols-1 sm:hidden">
							<select defaultValue={navLinks.find((tab) => tab.current)?.name} aria-label="Select a tab" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
								{navLinks.map((tab) => (
									<option key={tab.name} value={tab.name}>
										{tab.name}
									</option>
								))}
							</select>
							<ChevronDownIcon aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500" />
						</div>
						<div className="hidden sm:block">
							<div className="border-b border-gray-200">
								<nav aria-label="Tabs" className="-mb-px flex space-x-8">
									{navLinks.map((tab) => (
										<Link key={tab.name} href={tab.href} aria-current={tab.current ? "page" : undefined} className={classNames(tab.current ? dynamicHighlights(department) : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700", "border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap capitalize")}>
											{tab.name}
										</Link>
									))}
								</nav>
							</div>
						</div>
					</div>
				</header>
				<section className="mt-1.5">{children}</section>
			</div>
		</div>
	);
}
