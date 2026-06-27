"use client";

import React, { Fragment } from "react";
import { useTheme } from "../providers/ThemeProvider";
import { getInitials } from "@/app/lib/util/global";
import ImageCard from "./ImageCard";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "../shadcn/button";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";

export default function GroupCard({ group, editFunction }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const user = useAtomValue(currentUser);

	const handleGroupEdit = (selection) => {
		if (editFunction) {
			editFunction(selection);
		}
	};

	return (
		<div className="rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400">
			<div className="px-4 py-5 sm:p-6 flex justify-start items-center gap-4">
				<div className="size-10">
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
					<dt className="capitalize font-medium">{group?.name}</dt>
					<dd className="text-sm text-gray-700 capitalize">{group?.privacy}</dd>
				</dl>
				{group.owner === user._id && (
					<Menu as="div" className="relative hidden sm:block">
						<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
							<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
						</MenuButton>
						<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
							<Fragment>
								<MenuItem>
									<button onClick={() => handleGroupEdit(group)} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
										Edit
									</button>
								</MenuItem>
								<MenuItem>
									<button className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>delete</button>
								</MenuItem>
							</Fragment>
						</MenuItems>
					</Menu>
				)}
			</div>
		</div>
	);
}
