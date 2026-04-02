"use client";
import { ArrowTrendingUpIcon, GlobeEuropeAfricaIcon } from "@heroicons/react/20/solid";
import { useTheme } from "../providers/ThemeProvider";
import { PiPersonSimpleHikeFill } from "react-icons/pi";

const features = [
	{
		name: "stay active",
		description: "Stay on top of your responsibilities by keeping your grades up, completing assignments on time, and following through on expectations at home. The platform helps you track everything in one place so you always know where you stand and what needs your attention.",
		icon: PiPersonSimpleHikeFill
	},
	{
		name: "Build Your Reputation",
		description: "Consistency builds trust. As you complete assignments, improve academically, and stay disciplined, you earn perks, recognition, and a stronger standing within the club. Your reputation reflects your effort—and it determines what opportunities become available to you.",
		icon: ArrowTrendingUpIcon
	},
	{
		name: "Unlock Experiences",
		description: "As your status improves, you gain access to exclusive events, outings, and experiences. From local activities to major trips, every opportunity is something you’ve earned through your commitment and performance.",
		icon: GlobeEuropeAfricaIcon
	}
];

export default function HowItWorks() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	return (
		<div id="how_it_works" className="bg-white py-24 sm:py-32 dark:bg-gray-900">
			<div className={classNames("mx-auto max-w-7xl px-6 lg:px-8")}>
				<div className="mx-auto max-w-2xl lg:text-center">
					<h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">Earn Your Way In</h2>
					<p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">Your access to the club isn’t random—it’s earned through consistency, accountability, and growth. Every action you take builds your reputation and unlocks new opportunities.</p>
				</div>
				<div className={classNames("mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none")}>
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
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
