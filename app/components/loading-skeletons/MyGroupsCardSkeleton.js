import { getInitials } from "@/app/lib/util/global";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../shadcn/button";

export default function MyGroupsCardSkeleton({ group }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<div className="rounded-lg bg-white shadow-md shadow-gray-300 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-300 animate-pulse">
			<div className="px-4 py-5 flex justify-start items-center flex-wrap gap-4">
				<div className="size-20 shrink-0">
					<div className={classNames("bg-gray-300 rounded-md flex justify-center items-center size-full text-white font-medium uppercase")}>{getInitials("group name")}</div>
				</div>
				<dl className="flex-1">
					<dt className="capitalize font-medium text-nowrap truncate h-5 bg-gray-300 rounded-md">{group?.name}</dt>
					<dd className="text-sm text-gray-700 capitalize h-5 bg-gray-300 rounded-md mt-1 w-2/5">{group?.privacy}</dd>
					<dd className="text-sm text-gray-700 capitalize mt-1.5">
						<Link href={"#"} className={classNames(buttonVariants({ variant: "ghostBtn" }), "w-full bg-gray-300! text-gray-200!")}>
							view group
						</Link>
					</dd>
				</dl>
				<Menu as="div" className="relative">
					<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
						<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
					</MenuButton>
					<MenuItems transition className="absolute right-3.5 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
						<MenuItem>
							<button className={classNames(buttonVariants({ variant: "ghostBtn" }), "bg-gray-300!")} />
						</MenuItem>
					</MenuItems>
				</Menu>
			</div>
		</div>
	);
}
