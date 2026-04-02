"use client";
import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useTheme } from "../providers/ThemeProvider";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";
import { buttonVariants } from "../shadcn/button";
import { nanoid } from "nanoid";
import PricingCallToAction from "./PricingCallToAction";

const frequencies = [
	{ value: "monthly", label: "Monthly", priceSuffix: "/month" },
	{ value: "annually", label: "Annually", priceSuffix: "/year" }
];

const tiers = [
	{
		name: "foundation",
		id: nanoid(),
		href: "#",
		price: { monthly: "$19.99", annually: "$215.89" },
		description: "The essentials to provide your best work for clients.",
		features: ["Grade tracking", "Assignments", "Tutoring access", "Rewards system", "basic analytics"],
		featured: false
	},
	{
		name: "lifestyle",
		id: nanoid(),
		href: "#",
		price: { monthly: "$49.99", annually: "$539.89" },
		description: "The essentials to provide your best work for clients.",
		features: ["Everything in Tier 1", "Local events (movies, restaurants, parks)", "Basic analytics", "48-hour support response time"],
		featured: false
	},
	{
		name: "experience",
		id: nanoid(),
		href: "#",
		price: { monthly: "$99.99", annually: "$1079.89" },
		description: "A plan that scales with your rapidly growing business.",
		features: ["Everything in Tier 2", "Major trips (Disney, Universal, travel events)", "Advanced analytics", "24-hour support response time"],
		featured: true
	},
	{
		name: "elite",
		id: nanoid(),
		href: "#",
		price: { monthly: "$149.99", annually: "$1619.89" },
		description: "Dedicated support and infrastructure for your company.",
		features: ["Everything in Tier 3", "Sponsored programs", "Skill training (trade skills, self-defense)", "Advanced analytics", "12-hour, dedicated support response time", "Custom reporting tools"],
		featured: false
	}
];

export default function PricingPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const department = useAtomValue(currentDepartment);

	const dynamicStyles = (featured, department) => {
		switch (true) {
			case featured === true:
				switch (department) {
					case "members":
						return buttonVariants({ variant: "blueBtn" });

					case "parents":
						return buttonVariants({ variant: "orangeBtn" });

					case "teachers":
						return buttonVariants({ variant: "orangeBtn" });

					case "admin":
						return buttonVariants({ variant: "orangeBtn" });

					case "careers":
						return buttonVariants({ variant: "orangeBtn" });

					default:
						throw new Error("Department not recognized.");
				}

			case featured === false:
				switch (department) {
					case "members":
						return buttonVariants({ variant: "ghostBtn" });

					case "parents":
						return buttonVariants({ variant: "ghostBtn" });

					case "teachers":
						return buttonVariants({ variant: "ghostBtn" });

					case "admin":
						return buttonVariants({ variant: "ghostBtn" });

					case "careers":
						return buttonVariants({ variant: "ghostBtn" });

					default:
						throw new Error("Department not recognized.");
				}

			default:
				break;
		}
	};

	return (
		<form className="group/tiers bg-white ">
			<header className={classNames(theme.base, "w-full h-screen flex flex-col justify-center py-24 sm:py-32")}>
				<div className="max-w-7xl px-6 lg:px-8 mx-auto">
					<div className="mx-auto max-w-4xl text-center">
						<h2 className={classNames(theme.text.primary, "mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl")}>Pricing that grows with you</h2>
					</div>
					<p className={classNames(theme.text.primary, "mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8")}>Choose an affordable plan that’s packed with the best features for your needs.</p>
					<div className="mt-16 flex justify-center">
						<fieldset aria-label="Payment frequency">
							<div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold inset-ring inset-ring-gray-200">
								<label className={classNames("group relative rounded-full px-2.5 py-1 has-checked:bg-red-600")}>
									<input defaultValue="monthly" defaultChecked name="frequency" type="radio" className="absolute inset-0 appearance-none rounded-full" />
									<span className="text-gray-500 group-has-checked:text-white">Monthly</span>
								</label>
								<label className={classNames("group relative rounded-full px-2.5 py-1 has-checked:bg-red-600")}>
									<input defaultValue="annually" name="frequency" type="radio" className="absolute inset-0 appearance-none rounded-full" />
									<span className="text-gray-300 group-has-checked:text-white">Annually</span>
								</label>
							</div>
						</fieldset>
					</div>
				</div>
			</header>
			<div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
				<div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
					{tiers.map((tier) => (
						<div key={tier.id} data-featured={tier.featured ? "true" : undefined} className={classNames(theme.sectionNavbar.root, "group/tier rounded-3xl p-8 ring-1 ring-gray-200 data-featured:ring-2 data-featured:ring-indigo-600")}>
							<div className="flex items-center justify-between gap-x-4">
								<h3 id={`tier-${tier.id}`} className={classNames(theme.text.primary, "text-lg/8 font-semibold text-gray-900 capitalize")}>
									{tier.name}
								</h3>
								<p className={classNames(theme.text.dark, theme.contrast, "rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600 group-not-data-featured/tier:hidden")}>Most popular</p>
							</div>
							<p className={classNames(theme.text.primary, "mt-4 text-sm/6 text-gray-600")}>{tier.description}</p>
							<p className={classNames(theme.text.primary, "mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=monthly]:checked]/tiers:hidden")}>
								<span className="text-4xl font-semibold tracking-tight">{tier.price.monthly}</span>
								<span className="text-sm/6 font-semibold">/month</span>
							</p>
							<p className={classNames(theme.text.primary, "mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=annually]:checked]/tiers:hidden")}>
								<span className="text-4xl font-semibold tracking-tight">{tier.price.annually}</span>
								<span className="text-sm/6 font-semibold">/year</span>
							</p>
							<button aria-describedby={tier.id} className={classNames(dynamicStyles(tier.featured, department), "w-full mt-2")}>
								Buy plan
							</button>
							<ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600">
								{tier.features.map((feature) => (
									<li key={feature} className={classNames(theme.text.primary, "flex gap-x-3")}>
										<CheckIcon aria-hidden="true" className="h-6 w-5 flex-none" />
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
			<PricingCallToAction />
		</form>
	);
}
