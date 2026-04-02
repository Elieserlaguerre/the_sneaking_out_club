"use client";

import { useTheme } from "../providers/ThemeProvider";
import { nanoid } from "nanoid";
import { ExclamationCircleIcon, ExclamationTriangleIcon, ShieldCheckIcon, XCircleIcon } from "@heroicons/react/20/solid";

const clubStatuses = [
	{
		id: nanoid(),
		name: "active status",
		description: "Members in Active status have full access to all club features, events, and opportunities. This means you’re meeting expectations, staying consistent, and taking full advantage of everything the club has to offer.",
		icon: ShieldCheckIcon
	},
	{
		id: nanoid(),
		name: "probation status",
		description: "If expectations aren’t met, members are placed on probation. This is a limited-access period designed to give you time to correct issues, improve performance, and return to good standing before further restrictions are applied.",
		icon: ExclamationTriangleIcon
	},
	{
		id: nanoid(),
		name: "suspended status",
		description: "Members who do not improve during probation are suspended. During this time, access to events, activities, and certain platform features is restricted until consistent progress is demonstrated.",
		icon: ExclamationCircleIcon
	},
	{
		id: nanoid(),
		name: "expelled status",
		description: "Continued failure to meet expectations may result in expulsion from the club. This means full removal from participation, requiring a complete reset before re-entry is considered.",
		icon: XCircleIcon
	}
];

export default function ClubStatusSystem() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	return (
		<div className={classNames(theme.base, "py-24 sm:py-32")}>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:text-center">
					<h3 className={classNames(theme.text.primary, "mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance")}>Your Status Determines Your Access</h3>
					<p className={classNames(theme.text.primary, "mt-6 text-lg/8 text-gray-700 dark:text-gray-300")}>Your position in the club reflects your behavior, performance, and consistency. Stay disciplined to maintain access—or fall behind and risk losing it.</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
					<dl className="grid max-w-3xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						{clubStatuses.map((status) => (
							<div key={status.id} className="relative pl-16">
								<dt className={classNames(theme.text.primary, "text-base/7 font-semibold capitalize")}>
									<div className={classNames(status.name === "active status" ? "bg-green-500" : status.name === "probation status" ? "bg-yellow-500 " : status.name === "suspended status" ? "bg-orange-500" : "bg-red-500", "absolute top-0 left-0 flex items-center justify-center rounded-lg p-3")}>
										<status.icon aria-hidden="true" className={classNames(theme.text.primary, "size-7")} />
									</div>
									{status.name}
								</dt>
								<dd className={classNames(theme.text.primary, "mt-2 text-base/7 text-gray-600 dark:text-gray-400")}>{status.description}</dd>
							</div>
						))}
					</dl>
					<p className={classNames(theme.text.primary, "mt-10 text-lg/8 text-gray-700 dark:text-gray-300 text-center")}>Freedom isn’t given. It’s earned.</p>
				</div>
			</div>
		</div>
	);
}
