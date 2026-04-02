"use client";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";
import { nanoid } from "nanoid";

const features = [
	{
		id: nanoid(),
		name: "Students Need Structure",
		description: "Without structure, it’s easy to fall behind. Clear expectations, consistent tracking, and defined goals help students stay focused, organized, and accountable in both school and daily life."
	},
	{
		id: nanoid(),
		name: "Parents Need Visibility",
		description: "Parents shouldn’t have to guess how their child is doing. Real-time insights into grades, assignments, and responsibilities make it easier to guide, support, and intervene when necessary."
	},
	{
		id: nanoid(),
		name: "Teachers Need Better Tools",
		description: "Educators need more than gradebooks. They need systems that allow them to communicate, assign work, offer support, and track progress efficiently—while also being fairly compensated for their time and expertise."
	},
	{
		id: nanoid(),
		name: "Communities Need Stronger Youth",
		description: "Stronger communities start with disciplined, capable individuals. By reinforcing accountability and rewarding progress, we help develop young people who are prepared for real-world challenges."
	},
	{
		id: nanoid(),
		name: "Accountability",
		description: "Every action matters. The system is designed to reflect effort, behavior, and consistency—ensuring that progress is earned and recognized."
	},
	{
		id: nanoid(),
		name: "Growth",
		description: "Progress is not just expected—it’s supported. With the right tools and guidance, every member has the opportunity to improve and move forward."
	},
	{
		id: nanoid(),
		name: "Discipline",
		description: "Consistency builds results. By encouraging routine, responsibility, and follow-through, we help users develop habits that lead to long-term success."
	},
	{
		id: nanoid(),
		name: "Reward",
		description: "Effort should lead to something meaningful. The platform connects performance with real incentives, reinforcing positive behavior through tangible outcomes."
	},
	{
		id: nanoid(),
		name: "Opportunity",
		description: "Access to experiences, education, and growth opportunities is earned through participation and performance—creating a clear path forward."
	}
];

export default function OurBeliefs() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();
	console.log("theme", theme);

	return (
		<div className={classNames(theme.base, "py-24 sm:py-32 dark:bg-gray-900")}>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:text-center">
					<p className={classNames(theme.text.primary, "mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white")}>What We Stand For</p>
					<p className={classNames(theme.text.primary, "mt-6 text-lg/8 text-gray-600 dark:text-gray-300")}>Our platform is built on principles that guide behavior, shape growth, and create real opportunities for everyone involved.</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
					<div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
						{features.map((feature) => (
							<div key={feature.id} className={classNames(theme.contrast, "divide-y divide-gray-700 overflow-hidden rounded-lg shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10")}>
								<div className={classNames(theme.text.dark, "px-4 py-5 sm:px-6")}>{feature.name}</div>
								<div className={classNames(theme.text.dark, "px-4 py-5 sm:p-6")}>{feature.description}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
