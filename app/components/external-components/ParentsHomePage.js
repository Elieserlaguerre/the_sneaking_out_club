"use client";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";
import Link from "next/link";
import { buttonVariants } from "../shadcn/button";
import { nanoid } from "nanoid";
import { AcademicCapIcon, BellAlertIcon, ChatBubbleLeftRightIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { MdFamilyRestroom } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

export default function ParentsHomePage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const studentGrowthDetails = [
		{
			id: nanoid(),
			icon: GiProgression,
			title: "Track Academic Progress",
			description: "Stay informed about your child’s educational journey with access to classroom updates, assignments, participation activity, important announcements, and academic progress indicators. Parents can monitor performance trends and remain actively engaged in supporting their child’s success throughout the school year."
		},
		{
			id: nanoid(),
			icon: ChatBubbleLeftRightIcon,
			title: "Communicate Directly With Educators",
			description: "Build stronger relationships with teachers and school staff through direct communication tools designed to encourage collaboration and transparency. Ask questions, discuss concerns, receive updates, and work together to create the best possible learning environment for your child."
		},
		{
			id: nanoid(),
			icon: UserGroupIcon,
			title: "Stay Involved Every Step of the Way",
			description: "From classroom activities and school events to student milestones and important reminders, parents can remain connected to every stage of their child’s development. The platform helps families stay engaged, informed, and present in both academic and community experiences."
		},
		{
			id: nanoid(),
			icon: BellAlertIcon,
			title: "Receive Important School Updates",
			description: "Never miss critical information again. Receive timely notifications for announcements, schedule changes, events, meetings, and school-wide communications so your family can stay prepared and organized."
		},
		{
			id: nanoid(),
			icon: MdFamilyRestroom,
			title: "Strengthen Family Engagement",
			description: "Encourage a stronger connection between home and school by creating a collaborative support system around each student. Active family engagement helps reinforce learning, accountability, and student confidence both inside and outside the classroom."
		},
		{
			id: nanoid(),
			icon: AcademicCapIcon,
			title: "Support Student Growth With Confidence",
			description: "Gain the tools and visibility needed to better support your child’s academic, social, and personal development. By staying connected to educators and school activities, parents can make more informed decisions and provide guidance when it matters most."
		}
	];

	const featuredTestimonial = {
		testimony: "I’ve used several school communication tools before, but this is the first one that truly feels designed with parents in mind.",
		author: {
			name: "Brenna Goyette",
			handle: "brennagoyette",
			imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
			logoUrl: "https://tailwindcss.com/plus-assets/img/logos/savvycal-logo-gray-900.svg"
		}
	};

	const testimonials = [
		[
			[
				{
					testimony: "This platform helped me stay much more involved in my son’s education. I no longer feel disconnected from what’s happening at school.",
					author: {
						name: "Leslie Alexander",
						handle: "lesliealexander",
						imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				},
				{
					testimony: "The direct communication with teachers has made a huge difference for our family. Everything feels more organized and transparent.",
					author: {
						name: "Michael Foster",
						handle: "michaelfoster",
						imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				},
				{
					testimony: "I love being able to receive updates and reminders in one place instead of searching through emails and paperwork.",
					author: {
						name: "Dries Vincent",
						handle: "driesvincent",
						imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				}
			],
			[
				{
					testimony: "The Sneaking Out Club made it easier for me to stay engaged with my daughter’s academic progress while balancing a busy work schedule.",
					author: {
						name: "Lindsay Walton",
						handle: "lindsaywalton",
						imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				},
				{
					testimony: "The platform feels modern, simple to use, and actually helpful. I can quickly check updates and communicate with educators whenever needed.",
					author: {
						name: "Courtney Henry",
						handle: "courtneyhenry",
						imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				}
			]
		],
		[
			[
				{
					testimony: "I appreciate how connected the school community feels now. It’s easier to stay informed about events, activities, and important announcements.",
					author: {
						name: "Tom Cook",
						handle: "tomcook",
						imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				},
				{
					testimony: "This platform helped strengthen communication between our family and the school. We feel much more involved in our child’s development.",
					author: {
						name: "Whitney Francis",
						handle: "whitneyfrancis",
						imageUrl: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				}
			],
			[
				{
					testimony: "I enjoy having everything centralized in one place. It saves time and helps me stay organized throughout the school year.",
					author: {
						name: "Leonard Krasner",
						handle: "leonardkrasner",
						imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				},
				{
					testimony: "The communication tools are excellent. Teachers respond quickly, and I always feel updated on what’s happening academically.",
					author: {
						name: "Floyd Miles",
						handle: "floydmiles",
						imageUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				},
				{
					testimony: "It’s reassuring to have a platform focused on improving family engagement and student support instead of just posting grades.",
					author: {
						name: "Emily Selman",
						handle: "emilyselman",
						imageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					}
				}
			]
		]
	];

	return (
		<div>
			<header className={classNames(theme.base, "relative isolate min-h-auto")}>
				<div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
					<div className="text-center">
						<h1 className={classNames(theme?.text?.primary, "text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white")}>A safer, smarter way to manage your family, and stay connected to your child’s school life.</h1>
						<p className={classNames(theme.text.secondary, "mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400")}>The Sneaking Out Club helps parents communicate with teachers, monitor student progress, stay informed about activities, and strengthen family engagement — all in one platform.</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="/register" className={classNames(buttonVariants({ variant: "blueBtn" }))}>
								create parent account
							</Link>
						</div>
					</div>
				</div>
			</header>
			<section id="section_features" className={classNames("bg-white py-24 sm:py-32 dark:bg-gray-900")}>
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl lg:text-center">
						<h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">Everything your family needs, in one place.</h2>
						<p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">From announcements and classroom updates to family communication and school events, parents gain real-time access to the information that matters most. No more missed messages, scattered apps, or communication gaps.</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
							{studentGrowthDetails.map((detail) => (
								<div key={detail.id} className="relative pl-16">
									<dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
										<div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">{detail?.icon && <detail.icon aria-hidden="true" className="size-6 text-white" />}</div>
										{detail.title}
									</dt>
									<dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">{detail.description}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</section>
			<section className="bg-white">
				<div className="pt-32 sm:pt-14">
					<div className={classNames(theme.base, "bg-gray-800 overflow-x-clip")}>
						<div className="mx-auto w-10/12 px-4 sm:px-6 lg:px-8">
							<div className="relative pt-48 md:pt-28 pb-16 sm:pb-24">
								<div>
									<h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl">
										Help your child
										<br />
										succeed with confidence.
									</h2>
									<div className="mt-6 text-base">
										<p className="font-semibold text-white max-w-xl">The Sneaking Out Club was designed to strengthen the connection between schools, families, and communities. Encourage collaboration, celebrate achievements, and create a more supportive learning environment for every student.</p>
									</div>
									<div className="mt-6 text-base">
										<p className="font-semibold text-white max-w-xl">Built with safety and responsibility in mind. We prioritize privacy, structured permissions, and secure communication tools to help families engage online with confidence.</p>
									</div>
								</div>

								<div className="md:hidden lg:block absolute -top-32 left-1/2 min-w-max -translate-x-1/2 transform sm:top-6 sm:translate-x-48 xl:-translate-x-14">
									<div className="ml-24 flex space-x-6 sm:ml-3 lg:space-x-8">
										<div className="flex space-x-6 sm:flex-col sm:justify-center sm:space-y-6 sm:space-x-0 lg:space-y-8">
											<div className="shrink-0">
												<img alt="" src="https://images.unsplash.com/photo-1585144374720-64d181405b1c?q=80&w=1095&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-64 rounded-lg object-cover md:size-72" />
											</div>
											<div className="mt-6 shrink-0 sm:mt-0">
												<img alt="" src="https://images.unsplash.com/photo-1660841813634-29ad54f0a793?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-64 rounded-lg object-cover md:size-72" />
											</div>
										</div>
										<div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-y-6 sm:space-x-0 lg:space-y-8">
											<div className="shrink-0">
												<img alt="" src="https://images.unsplash.com/photo-1675687607764-555dc874b4d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-64 rounded-lg object-cover md:size-72" />
											</div>

											<div className="mt-6 shrink-0 sm:mt-0">
												<img alt="" src="https://images.unsplash.com/photo-1560346740-a8678c61a524?q=80&w=1136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-64 rounded-lg object-cover md:size-72" />
											</div>

											<div className="mt-6 shrink-0 sm:mt-0">
												<img alt="" src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-02.jpg" className="size-64 rounded-lg object-cover md:size-72" />
											</div>
										</div>
										<div className="flex space-x-6 sm:-mt-60 sm:flex-col sm:space-y-6 sm:space-x-0 lg:space-y-8">
											<div className="shrink-0">
												<img alt="" src="https://images.unsplash.com/photo-1513774415755-ab8d0ef5e23c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-64 rounded-lg object-cover md:size-72" />
											</div>

											<div className="mt-6 shrink-0 sm:mt-0">
												<img alt="" src="https://images.unsplash.com/photo-1730575208519-04fe3bee68e5?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-64 rounded-lg object-cover md:size-72" />
											</div>

											<div className="shrink-0">
												<img alt="" src="https://images.unsplash.com/photo-1617939767459-50d8ac3df080?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-64 rounded-lg object-cover md:size-72" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="section_features" className={classNames("min-h-screen bg-white")}>
				<div className="relative isolate bg-white pt-24 pb-32 sm:pt-32 dark:bg-gray-900">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Testimonials</h2>
							<p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">What Parents Are Saying</p>
						</div>
						<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4 dark:text-gray-100">
							<figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1 dark:bg-gray-800/75 dark:shadow-none dark:ring-white/10">
								<blockquote className="p-6 text-lg font-semibold tracking-tight text-gray-900 sm:p-12 sm:text-xl/8 dark:text-white">
									<p>{`“${featuredTestimonial.testimony}”`}</p>
								</blockquote>
								<figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap dark:border-white/10">
									<img alt="" src={featuredTestimonial.author.imageUrl} className="size-10 flex-none rounded-full bg-gray-50 dark:bg-gray-700" />
									<div className="flex-auto">
										<div className="font-semibold text-gray-900 dark:text-white">{featuredTestimonial.author.name}</div>
										<div className="text-gray-600 dark:text-gray-400">{`@${featuredTestimonial.author.handle}`}</div>
									</div>
									<img alt="" src={featuredTestimonial.author.logoUrl} className="h-10 w-auto flex-none dark:hidden" />
									<img alt="" src={featuredTestimonial.author.logoUrl.replace("-gray-900", "-gray-100")} className="h-10 w-auto flex-none not-dark:hidden" />
								</figcaption>
							</figure>
							{testimonials.map((columnGroup, columnGroupIdx) => (
								<div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
									{columnGroup.map((column, columnIdx) => (
										<div key={columnIdx} className={classNames((columnGroupIdx === 0 && columnIdx === 0) || (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1) ? "xl:row-span-2" : "xl:row-start-1", "space-y-8")}>
											{column.map((testimonial) => (
												<figure key={testimonial.author.handle} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-800/75 dark:shadow-none dark:ring-white/10">
													<blockquote className="text-gray-900 dark:text-white">
														<p>{`“${testimonial.testimony}”`}</p>
													</blockquote>
													<figcaption className="mt-6 flex items-center gap-x-4">
														<img alt="" src={testimonial.author.imageUrl} className="size-10 rounded-full bg-gray-50 dark:bg-gray-700" />
														<div>
															<div className="font-semibold text-gray-900 dark:text-white">{testimonial.author.name}</div>
															<div className="text-gray-600 dark:text-gray-400">{`@${testimonial.author.handle}`}</div>
														</div>
													</figcaption>
												</figure>
											))}
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className={classNames(theme.base, "")}>
				<div className="px-6 py-24 sm:py-32 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className={classNames(theme.text.primary, "text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white")}>Stay Connected to What Matters Most</h2>
						<p className={classNames(theme.text.secondary, "mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300")}>Join a growing community of parents who are actively engaged in their children’s education and school experience. Create your parent account today to communicate with educators, stay informed about important updates, and support your child’s success with confidence.</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="/register" className={classNames(buttonVariants({ variant: "blueBtn" }))}>
								Get started
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
