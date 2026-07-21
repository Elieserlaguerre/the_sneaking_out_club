import { getInitials } from "@/app/lib/util/global";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";

export default function GroupDiscoveryCardSkeleton({ group }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	return (
		<div className="px-4 pb-4 border border-gray-300 shadow shadow-gray-500 rounded-md min-h-72 animate-pulse">
			<div className="-mx-4 h-40 rounded-t-md overflow-clip shrink-0">
				<div className={classNames("bg-gray-300 flex justify-center items-center size-full text-white font-medium uppercase text-3xl")}>{getInitials("group name")}</div>
			</div>
			<div className="flex flex-1 flex-col px-8 py-4">
				<h3 className="text-sm font-medium text-gray-900 text-center capitalize hover:cursor-pointer hover:underline h-5 bg-gray-300 rounded-md">{group?.name}</h3>
				<dl className="mt-1 flex grow flex-col justify-between">
					<dt className="sr-only">about information</dt>
					<dd className="text-sm text-gray-500 text-center truncate h-5 bg-gray-300 rounded-md">{group?.about}</dd>
					<div className="grid grid-cols-2 gap-2.5">
						<div className="flex flex-col items-center">
							<dt className="sr-only">privacy</dt>
							<dd className="mt-3">
								<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 capitalize">{group?.privacy}</span>
							</dd>
						</div>
						<div className="flex flex-col items-center">
							<dt className="sr-only">visibility</dt>
							<dd className="mt-3">
								<span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 capitalize">{group?.visibility}</span>
							</dd>
						</div>
						<div className="flex justify-center items-center gap-1.5">
							<dt className="text-sm capitalize">members</dt>
							<dd className="text-sm text-gray-900">{group?.members?.length}</dd>
						</div>
						<div className="flex justify-center items-center gap-1.5">
							<dt className="text-sm capitalize">events</dt>
							<dd className="text-sm text-gray-900">{group?.events?.length}</dd>
						</div>
					</div>
				</dl>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-gray-200">
					<div className="flex w-0 flex-1">
						<button className={classNames(`hover:${theme.sectionNavbar.root} hover:text-white`, "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border border-transparent py-4 text-sm font-semibold text-gray-900 cursor-pointer capitalize")}>join</button>
					</div>
				</div>
			</div>
		</div>
	);
}
