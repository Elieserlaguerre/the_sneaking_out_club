"use client";

import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";
import Link from "next/link";

export default function AboutUsCallToAction() {
	const department = useAtomValue(currentDepartment);

	const dynamicCTA = (department) => {
		switch (department) {
			case "members":
				return {
					headline: "Start Building Your Status Today",
					subHeadline: "Stay consistent, earn rewards, and unlock experiences designed for those who put in the effort.",
					buttonLabel: "Join the Club"
				};
			case "parents":
				return {
					headline: "Take a More Active Role in Your Child’s Progress",
					subHeadline: "Stay informed, stay connected, and help guide your child toward better outcomes.",
					buttonLabel: "Create Parent Account"
				};
			case "teachers":
				return {
					headline: "Expand Your Impact Beyond the Classroom",
					subHeadline: "Teach, mentor, and support students with tools designed for real engagement and results.",
					buttonLabel: "Join as a Teacher"
				};
			case "admin":
				return {
					headline: "Manage and Scale With Confidence",
					subHeadline: "Oversee operations, create opportunities, and maintain full control of the platform.",
					buttonLabel: "Access Dashboard"
				};
			case "careers":
				return {
					headline: "Be Part of Something That Matters",
					subHeadline: "Join a team focused on building systems that create real change and long-term impact.",
					buttonLabel: "Apply Now"
				};
			default:
				throw new Error("Department not recognized.");
		}
	};

	const message = dynamicCTA(department);

	return (
		<div className="bg-white dark:bg-gray-900">
			<div className="px-6 py-24 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">{message?.headline}</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300">{message?.subHeadline}</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link href="/register" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
							{message?.buttonLabel}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
