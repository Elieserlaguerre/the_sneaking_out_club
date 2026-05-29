"use client";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";
import Link from "next/link";
import { buttonVariants } from "../shadcn/button";
import { nanoid } from "nanoid";

export default function AdminHomePage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const sectionTwo = {
		header: "Centralized Administrative Control",
		body: "Administrators require visibility, organization, and operational control across multiple areas of the platform. The Sneaking Out Club provides management tools designed to simplify oversight, improve communication, support community engagement, and streamline day-to-day administration.",
		features: [
			{
				id: nanoid(),
				title: "User & Account Management",
				description: "Manage parent, teacher, student, staff, and organizational accounts from a centralized dashboard with tools for onboarding, permissions, account moderation, and profile oversight."
			},
			{
				id: nanoid(),
				title: "Organization-Wide Communication",
				description: "Send announcements, alerts, updates, and important notifications to specific groups, classrooms, organizations, or the entire platform community in real time."
			},
			{
				id: nanoid(),
				title: "Role & Permission Controls",
				description: "Assign and manage administrative roles, access levels, moderation privileges, and platform permissions to maintain operational structure and security."
			},
			{
				id: nanoid(),
				title: "Content Moderation & Safety Tools",
				description: "Review reported content, manage community guidelines, moderate discussions, and maintain a safe, respectful environment across the platform."
			},
			{
				id: nanoid(),
				title: "Analytics & Engagement Insights",
				description: "Monitor platform activity, user engagement, communication performance, and participation trends through administrative reporting and analytics tools."
			},
			{
				id: nanoid(),
				title: "Multi-Department & Group Oversight",
				description: "Coordinate classrooms, programs, departments, organizations, or community groups from a unified administrative system designed for scalable management."
			}
		]
	};

	const sectionThree = {
		header: "Tools Built for Operational Efficiency",
		body: "Managing a growing platform requires more than communication tools alone. Administrators need systems that improve coordination, reduce manual work, strengthen accountability, and support long-term organizational growth. The Sneaking Out Club provides scalable administrative infrastructure designed to simplify daily operations while improving the overall user experience.",
		features: [
			{
				id: nanoid(),
				title: "Centralized Dashboard Management",
				description: "Access platform activity, organizational updates, user management tools, notifications, and operational insights from a unified administrative dashboard."
			},
			{
				id: nanoid(),
				title: "Real-Time Activity Monitoring",
				description: "Monitor engagement, communication activity, moderation actions, and platform interactions as they happen to maintain visibility across the community."
			},
			{
				id: nanoid(),
				title: "Community Growth Management",
				description: "Support expanding schools, organizations, and community networks with scalable tools designed to handle increasing users, groups, and interactions efficiently."
			},
			{
				id: nanoid(),
				title: "Administrative Workflow Automation",
				description: "Reduce repetitive tasks through automated notifications, approval workflows, user verification processes, and scheduled administrative actions."
			},
			{
				id: nanoid(),
				title: "Secure Data & Access Management",
				description: "Protect sensitive information through permission-based access controls, account security tools, and administrative oversight mechanisms."
			},
			{
				id: nanoid(),
				title: "Cross-Department Coordination",
				description: "Improve collaboration between administrators, teachers, staff members, and organizational leaders through connected communication and management systems."
			}
		]
	};

	const sectionFour = {
		header: "Take Control of Your Community From One Centralized Platform",
		body: "Streamline communication, improve oversight, and manage your organization more effectively with administrative tools built for modern schools, families, and communities.",
		button: "Get Started as an Administrator"
	};

	return (
		<div>
			<header className={classNames(theme.base, "relative isolate overflow-hidden bg-white dark:bg-gray-900")}>
				<svg aria-hidden="true" className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-white/10">
					<defs>
						<pattern x="50%" y={-1} id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width={200} height={200} patternUnits="userSpaceOnUse">
							<path d="M.5 200V.5H200" fill="none" />
						</pattern>
					</defs>
					<rect fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" width="100%" height="100%" strokeWidth={0} />
				</svg>
				<div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
					<div className="mx-auto max-w-4xl lg:mx-0 lg:shrink-0 lg:pt-8">
						<img alt="Your Company" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" className="h-11 dark:hidden" />
						<img alt="Your Company" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" className="h-11 not-dark:hidden fill-white" />
						<h1 className={classNames(theme.text.primary, "mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white")}>Modern tools for managing families, schools, organizations, and communities.</h1>
						<p className={classNames(theme.text.secondary, "mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400")}>The Sneaking Out Club equips administrators with centralized management tools for communication, oversight, engagement, and operational coordination across the entire platform.</p>
						<div className="mt-10 flex items-center gap-x-6">
							<Link href="/register" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
								Access Admin Tools
							</Link>
						</div>
					</div>
					<div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
						<div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
							<div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-white/2.5 dark:ring-white/10">
								<img alt="App screenshot" src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png" width={2432} height={1442} className="w-304 rounded-md bg-gray-50 shadow-xl ring-1 ring-gray-900/10 dark:hidden" />
								<img alt="App screenshot" src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" width={2432} height={1442} className="w-304 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 not-dark:hidden" />
							</div>
						</div>
					</div>
				</div>
			</header>
			<section className="bg-white py-24 sm:py-32 dark:bg-gray-900">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl lg:mx-0">
						<h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">{sectionTwo.header}</h2>
						<p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">{sectionTwo.body}</p>
					</div>
					<dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{sectionTwo.features.map((feature) => (
							<div key={feature.id}>
								<dt className="font-semibold text-gray-900 dark:text-white">{feature.title}</dt>
								<dd className="mt-1 text-gray-600 dark:text-gray-400">{feature.description}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>
			<section className={classNames(theme.base, "relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32")}>
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h1 className={classNames(theme.text.primary, "mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl")}>{sectionThree.header}</h1>
						<p className={classNames(theme.text.primary, "mt-6 text-xl/8 text-gray-300")}>{sectionThree.body}</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
						<div className="relative lg:order-last lg:col-span-5">
							<svg aria-hidden="true" className="absolute -top-160 left-1 -z-10 h-256 w-702 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)] stroke-white/10">
								<defs>
									<pattern id="e87443c8-56e4-4c20-9111-55b82fa704e3" width={200} height={200} patternUnits="userSpaceOnUse">
										<path d="M0.5 0V200M200 0.5L0 0.499983" />
									</pattern>
								</defs>
								<rect fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)" width="100%" height="100%" strokeWidth={0} />
							</svg>
							<figure className="border-l border-indigo-400 pl-8">
								<blockquote className="text-xl/8 font-semibold tracking-tight text-white">
									<p>"The strongest communities are not built through control alone — they are built through strong families, communication, trust, accountability, and shared purpose. The Sneaking Out Club was created to give leaders the tools they need to bring people together, strengthen relationships, and build environments where families, educators, and communities can thrive together."</p>
								</blockquote>
								<figcaption className="mt-8 flex gap-x-4">
									<img alt="" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="mt-1 size-10 flex-none rounded-full bg-gray-800" />
									<div className="text-sm/6">
										<div className="font-semibold text-white">Wideline Lasseur</div>
										<div className="text-white">— Founder of The Sneaking Out Club</div>
									</div>
								</figcaption>
							</figure>
						</div>
						<div className="max-w-xl text-base/7 text-gray-400 lg:col-span-7">
							<ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-400">
								{sectionThree.features.map((feature) => (
									<li key={feature.id} className="flex flex-col gap-x-3">
										<p>
											<strong className="font-semibold text-white mr-1">{feature.title}</strong>
										</p>
										<p className={classNames(theme.text.secondary)}>{feature.description}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-white dark:bg-gray-900">
				<div className="px-6 py-24 sm:py-32 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">{sectionFour.header}</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300">{sectionFour.body}</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="/register" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
								{sectionFour.button}
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
