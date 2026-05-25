"use client";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";
import { buttonVariants } from "../shadcn/button";
import { nanoid } from "nanoid";

export default function TeachersHomePage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const technicalFeatures = [
		{
			id: nanoid(),
			title: "Classroom Announcements & Updates",
			description: "Share real-time announcements, classroom reminders, assignments, schedule changes, and important updates with students and parents from one centralized dashboard."
		},
		{
			id: nanoid(),
			title: "Direct Parent Communication",
			description: "Communicate privately with parents regarding student performance, attendance, behavior, academic progress, or classroom concerns without relying on fragmented third-party messaging tools."
		},
		{
			id: nanoid(),
			title: "Student Progress Tracking",
			description: "Monitor assignments, participation, classroom engagement, and academic milestones while maintaining organized records that can be reviewed throughout the school year."
		},
		{
			id: nanoid(),
			title: "Assignment & Resource Management",
			description: "Upload study materials, worksheets, classroom resources, homework assignments, and educational content in a structured environment that students and parents can easily access."
		},
		{
			id: nanoid(),
			title: "Classroom Engagement Tools",
			description: "Create interactive discussions, polls, group activities, and collaborative conversations that encourage student participation and strengthen classroom interaction."
		},
		{
			id: nanoid(),
			title: "Centralized Classroom Dashboard",
			description: "Manage classroom communication, student interactions, schedules, notifications, and learning activities from a single interface designed to improve organization and save time."
		}
	];

	const additionalFeatures = [
		{
			id: nanoid(),
			title: "Attendance Management",
			description: "Allow teachers to quickly record attendance, tardiness, and absences while automatically notifying parents of attendance-related concerns.",
			image: "https://images.unsplash.com/photo-1758270704417-26c1244cfaf3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHN0dWRlbnQlMjBBdHRlbmRhbmNlJTIwTWFuYWdlbWVudHxlbnwwfDB8MHx8fDI%3D"
		},
		{
			id: nanoid(),
			title: "Behavior & Conduct Reports",
			description: "Provide educators with tools to document behavioral incidents, positive achievements, disciplinary actions, and classroom conduct patterns.",
			image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFJlcG9ydHN8ZW58MHwwfDB8fHwy"
		},
		{
			id: nanoid(),
			title: "Lesson Planning",
			description: "Integrate AI-powered tools that help teachers generate lesson outlines, classroom activities, quizzes, and discussion prompts.",
			image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2xhc3MlMjBMZXNzb24lMjBQbGFubmluZ3xlbnwwfDB8MHx8fDI%3D"
		},
		{
			id: nanoid(),
			title: "Parent-Teacher Conference Scheduling",
			description: "Allow parents to book conference appointments directly through the platform based on teacher availability.",
			image: "https://images.unsplash.com/photo-1655337690446-e10ecbe6541c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFyZW50LVRlYWNoZXIlMjBDb25mZXJlbmNlJTIwU2NoZWR1bGluZ3xlbnwwfDB8MHx8fDI%3D"
		},
		{
			id: nanoid(),
			title: "Grading & Performance Analytics",
			description: "Provide grade tracking, assignment scoring, performance trends, and classroom analytics to help teachers identify struggling students earlier.",
			image: "https://images.unsplash.com/photo-1763038311036-6d18805537e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEdyYWRpbmclMjAlMjYlMjBQZXJmb3JtYW5jZSUyMEFuYWx5dGljc3xlbnwwfDB8MHx8fDI%3D"
		},
		{
			id: nanoid(),
			title: "Student Recognition System",
			description: "Enable teachers to reward students with digital achievements, badges, recognition posts, or classroom milestones to encourage positive engagement.",
			image: "https://images.unsplash.com/photo-1659080907377-ee6a57fb6b9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fFN0dWRlbnQlMjBSZWNvZ25pdGlvbiUyMFN5c3RlbXxlbnwwfDB8MHx8fDI%3D"
		},
		{
			id: nanoid(),
			title: "Emergency Classroom Notifications",
			description: "Allow schools and teachers to distribute urgent alerts and emergency announcements instantly to parents and students.",
			image: "https://images.unsplash.com/photo-1744751249852-77d9078175f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RW1lcmdlbmN5JTIwTm90aWZpY2F0aW9uc3xlbnwwfDB8MHx8fDI%3D"
		},
		{
			id: nanoid(),
			title: "Multi-Class Management",
			description: "Give teachers the ability to manage multiple classrooms, periods, or student groups from a single account.",
			image: "https://images.unsplash.com/photo-1681164315393-8d2850f570fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TXVsdGktQ2xhc3MlMjBNYW5hZ2VtZW50fGVufDB8MHwwfHx8Mg%3D%3D"
		}
	];

	return (
		<div>
			<header className={classNames(theme.base, "relative overflow-hidden xl:min-h-screen")}>
				<div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
					<div className="relative mx-auto max-w-9xl px-4 sm:static sm:px-6 lg:px-8">
						<div className="max-w-lg 2xl:max-w-4xl">
							<h1 className={classNames(theme.text.primary, "text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl")}>Teach, communicate, and manage your classroom more efficiently.</h1>
							<p className={classNames(theme.text.secondary, "mt-4 text-xl text-gray-500")}>The Sneaking Out Club gives educators modern tools to communicate with parents, engage students, share updates, and manage classroom interaction from a centralized platform.</p>
						</div>
						<div>
							<div className="mt-10">
								{/* Decorative image grid */}
								<div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl lg:right-4 2xl:right-36">
									<div className="absolute transform sm:top-24 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
										<div className="flex items-center space-x-6 lg:space-x-8">
											<div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
												<div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
													<img alt="" src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-full object-cover" />
												</div>
												<div className="h-64 w-44 overflow-hidden rounded-lg">
													<img alt="" src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVhY2hlcnN8ZW58MHwwfDB8fHwy" className="size-full object-cover" />
												</div>
											</div>
											<div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
												<div className="h-64 w-44 overflow-hidden rounded-lg">
													<img alt="" src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVhY2hlcnN8ZW58MHwwfDB8fHwy" className="size-full object-cover" />
												</div>
												<div className="h-64 w-44 overflow-hidden rounded-lg">
													<img alt="" src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVhY2hlcnN8ZW58MHwwfDB8fHwy" className="size-full object-cover" />
												</div>
												<div className="h-64 w-44 overflow-hidden rounded-lg">
													<img alt="" src="https://images.unsplash.com/photo-1761604478724-13fe879468cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJsYWNrJTIwdGVhY2hlcnxlbnwwfDB8MHx8fDI%3D" className="size-full object-cover" />
												</div>
											</div>
											<div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
												<div className="h-64 w-44 overflow-hidden rounded-lg">
													<img alt="" src="https://images.unsplash.com/photo-1573167474706-deb8c54d0bc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYwfHxibGFjayUyMHRlYWNoZXJ8ZW58MHwwfDB8fHwy" className="size-full object-cover object-left" />
												</div>
												<div className="h-64 w-44 overflow-hidden rounded-lg">
													<img alt="" src="https://images.unsplash.com/photo-1589104760192-ccab0ce0d90f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHRlYWNoZXJ8ZW58MHwwfDB8fHwy" className="size-full object-cover" />
												</div>
											</div>
										</div>
									</div>
								</div>

								<a href="/register" className={classNames(buttonVariants({ variant: "orangeBtn" }))}>
									Join as a Teacher
								</a>
							</div>
						</div>
					</div>
				</div>
			</header>

			<section className={classNames("bg-white")}>
				<div className="mx-auto max-w-2xl  grid grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
					<div>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Built to Support Modern Classrooms</h2>
						<p className="mt-4 text-gray-500">Teachers need more than basic messaging tools. The Sneaking Out Club provides educators with a centralized workspace designed to simplify communication, improve classroom coordination, and strengthen parent engagement while reducing administrative friction.</p>

						<dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
							{technicalFeatures.map((feature) => (
								<div key={feature.id} className="border-t border-gray-200 pt-4">
									<dt className="font-medium text-gray-900">{feature.title}</dt>
									<dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
								</div>
							))}
						</dl>
					</div>
					<div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
						<img alt="Walnut card tray with white powder coated steel divider and 3 punchout holes." src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfDB8MHx8fDI%3D" className="rounded-lg bg-gray-100" />
						<img alt="Top down view of walnut card tray with embedded magnets and card groove." src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVhY2hlcnxlbnwwfDB8MHx8fDI%3D" className="rounded-lg bg-gray-100" />
						<img alt="Side of walnut card tray with card groove and recessed card area." src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlYWNoZXJ8ZW58MHwwfDB8fHwy" className="rounded-lg bg-gray-100" />
						<img alt="Walnut card tray filled with cards and card angled in dedicated groove." src="https://images.unsplash.com/photo-1664382953647-5c6c76dd63b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHRlYWNoZXJ8ZW58MHwwfDB8fHwy" className="rounded-lg bg-gray-100" />
					</div>
				</div>
			</section>
			<section className={classNames(theme.base, "min-h-screen")}>
				<div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
					<div className="mx-auto max-w-4xl text-center">
						<h2 className={classNames(theme.text.primary, "text-3xl font-bold tracking-tight sm:text-4xl")}>Additional features built with teachers in mind.</h2>
						<p className={classNames(theme.text.primary, "mt-4")}>Managing a classroom often requires juggling multiple disconnected systems. The Sneaking Out Club brings communication, classroom management, student engagement, and educational resources together into one streamlined environment designed to reduce complexity and improve efficiency for educators.</p>
					</div>

					<div className="mt-16 space-y-16">
						{additionalFeatures.map((feature, featureIdx) => (
							<div key={feature.id} className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
								<div className={classNames(featureIdx % 2 === 0 ? "lg:col-start-1" : "lg:col-start-8 xl:col-start-9", "mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4")}>
									<h3 className={classNames(theme.text.primary, "text-lg font-medium text-gray-900")}>{feature.title}</h3>
									<p className={classNames(theme.text.primary, "mt-2 text-sm text-gray-500")}>{feature.description}</p>
								</div>
								<div className={classNames(featureIdx % 2 === 0 ? "lg:col-start-6 xl:col-start-5" : "lg:col-start-1", "flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8")}>
									<img alt={feature.title} src={feature.image} className="aspect-5/2 w-full rounded-lg bg-gray-100 object-cover object-center" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="bg-white dark:bg-gray-900">
				<div className="px-6 py-24 sm:py-32 lg:px-8">
					<div className="mx-auto max-w-4xl text-center">
						<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">Empower Your Classrooms With a Better system</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300">Join a platform designed to help educators streamline classroom management, improve parent communication, and create more engaging learning experiences for students.</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<a href="/register" className={classNames(buttonVariants({ variant: "orangeBtn" }))}>
								Get Started as a Teacher
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
