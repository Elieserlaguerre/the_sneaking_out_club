"use client";

import { useTheme } from "../providers/ThemeProvider";
import { DocumentCheckIcon, GlobeEuropeAfricaIcon, TicketIcon } from "@heroicons/react/24/outline";
import { GiTeacher } from "react-icons/gi";

const features = [
	{
		name: "Assignment Tracking (School, Home, Club)",
		description: "Stay organized by managing all your responsibilities in one place—from schoolwork to chores to club-related tasks—so nothing falls behind.",
		icon: DocumentCheckIcon
	},
	{
		name: "Tutoring Access",
		description: "Get the help you need when you need it. Connect with educators and improve your performance through structured support.",
		icon: GiTeacher
	},
	{
		name: "Rewards System (Perks)",
		description: "Earn rewards for consistency, achievement, and discipline. The more you put in, the more you unlock.",
		icon: TicketIcon
	},
	{
		name: "Events & Experiences",
		description: "Participate in exclusive events, outings, and trips that are only available to members who maintain strong standing.",
		icon: GlobeEuropeAfricaIcon
	}
];

export default function Features() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	return (
		<div id="how_it_works" className="bg-white py-24 sm:py-32 dark:bg-gray-900">
			<div className={classNames("mx-auto max-w-7xl px-6 lg:px-8")}>
				<div className="mx-auto max-w-2xl lg:text-center">
					<h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">Everything You Need to Stay on Track</h2>
					<p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">A complete system designed to help you stay organized, improve performance, and earn access to more opportunities.</p>
				</div>
				<div className={classNames("mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none")}>
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
						{features.map((feature) => (
							<div key={feature.name} className="flex flex-col">
								<dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900 dark:text-white capitalize">
									<div className={classNames(theme.base, "p-3 rounded-md flex justify-center items-center")}>
										<feature.icon aria-hidden="true" className={classNames(theme.text.primary, "size-5 flex-none")} />
									</div>
									{feature.name}
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
									<p className="flex-auto">{feature.description}</p>
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
