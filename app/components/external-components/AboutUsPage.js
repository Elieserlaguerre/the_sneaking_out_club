"use client";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";
import { buttonVariants } from "../shadcn/button";
import OurBeliefs from "./OurBeliefs";
import OurMission from "./OurMission";
import AboutUsCallToAction from "./AboutUsCallToAction";

export default function AboutUsPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const department = useAtomValue(currentDepartment);

	const dynamicButtonStyle = (department) => {
		switch (department) {
			case "members":
				return buttonVariants({ variant: "destructiveBtn" });
			case "parents":
				return buttonVariants({ variant: "blueBtn" });
			case "teachers":
				return buttonVariants({ variant: "orangeBtn" });
			case "admin":
				return buttonVariants({ variant: "greenBtn" });
			case "careers":
				return buttonVariants({ variant: "blueBtn" });
			default:
				throw new Error("Department not recognized.");
		}
	};

	const dynamicHeadlines = (department) => {
		switch (department) {
			case "members":
				return "More Than a Club. A System That Rewards Your Effort.";
			case "parents":
				return "More Than a Platform. A System That Supports Your Child’s Growth.";
			case "teachers":
				return "More Than a Tool. A System That Extends Your Impact.";
			case "admin":
				return "More Than Management. A System Built for Control and Scale.";
			case "careers":
				return "More Than a Job. A Mission That Builds Stronger Futures.";
			default:
				throw new Error("Department not recognized.");
		}
	};

	return (
		<div className={classNames("bg-white dark:bg-gray-900")}>
			<h2 className="sr-only">about us</h2>
			<header className={classNames(theme.base, "relative isolate px-6 pt-14 lg:px-8")}>
				<div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
					<div className="text-center">
						<h1 className={classNames(theme.text.primary, "text-5xl font-semibold tracking-tight text-balance sm:text-7xl dark:text-white")}>{dynamicHeadlines(department)}</h1>
						<p className={classNames(theme.text.primary, "mt-8 text-lg font-medium text-pretty sm:text-xl/8 dark:text-gray-400")}>The Sneaking Out Club was built to create a structured system where accountability leads to opportunity. Students are given the tools to stay on track, parents gain visibility into their child’s progress, and educators are empowered to guide and support growth more effectively. By connecting responsibility with real-world rewards and experiences, we help transform everyday effort into meaningful outcomes.</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="/register" className={classNames(dynamicButtonStyle(department))}>
								join the club
							</Link>
							<Link href="#our_mission" className={classNames(theme.text.primary, "text-sm/6 font-semibold dark:text-white")}>
								Learn more <span aria-hidden="true">→</span>
							</Link>
						</div>
					</div>
				</div>
			</header>
			<OurMission />
			<OurBeliefs />
			<AboutUsCallToAction />
		</div>
	);
}
