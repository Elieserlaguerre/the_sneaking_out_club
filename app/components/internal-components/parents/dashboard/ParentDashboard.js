"use client";
import ImageCard from "@/app/components/cards/ImageCard";
import { useTheme } from "@/app/components/providers/ThemeProvider";
import { buttonVariants } from "@/app/components/shadcn/button";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CalendarIcon, ChatBubbleLeftRightIcon, EllipsisVerticalIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { Pagination } from "@mui/material";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useState } from "react";

export default function ParentDashboard() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();
	console.log("theme", theme);

	const pageSizes = [
		{
			id: nanoid(),
			value: 3
		},
		{
			id: nanoid(),
			value: 6
		},
		{
			id: nanoid(),
			value: 9
		},
		{
			id: nanoid(),
			value: 12
		}
	];
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(pageSizes[0].value);
	const [filters, setFilters] = useState({
		sort: "newest"
	});

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const stats = [
		{
			_id: nanoid(),
			name: "connection requests",
			stat: 0
		},
		{
			_id: nanoid(),
			name: "total connections",
			stat: 0
		},
		{
			_id: nanoid(),
			name: "promtions",
			stat: 0
		},
		{
			_id: nanoid(),
			name: "new programs",
			stat: 0
		}
	];

	const messages = {
		read: 0,
		unread: 0,
		total: 0,
		list: [
			// {
			// 	_id: nanoid(),
			// 	status: "read",
			// 	subject: "message one",
			// 	message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
			// },
			// {
			// 	_id: nanoid(),
			// 	status: "unread",
			// 	subject: "message two",
			// 	message: "Rerum dolorum nostrum maxime porro officiis ipsam."
			// },
			// {
			// 	_id: nanoid(),
			// 	status: "read",
			// 	subject: "message three",
			// 	message: "Atque nam, illum placeat aperiam aliquid animi et, eos inventore reprehenderit dignissimos quibusdam exercitationem At."
			// },
			// {
			// 	_id: nanoid(),
			// 	status: "unread",
			// 	subject: "message four",
			// 	message: "Mollitia quidem animi distinctio maxime eos ad, velit qui sed voluptas, cum, tenetur quod sunt odio facilis a nobis adipisci amet at!"
			// },
			// {
			// 	_id: nanoid(),
			// 	status: "unread",
			// 	subject: "message five",
			// 	message: "Maiores cumque dicta error provident consequuntur eos iure maxime? Error nobis dolore beatae at corporis nam voluptatum numquam architecto, nesciunt enim temporibus, maiores totam consequuntur dolorum aut neque libero quidem."
			// }
		]
	};

	const familyOverview = [
		{
			_id: nanoid(),
			name: "family tree",
			stat: 0
		},
		{
			_id: nanoid(),
			name: "branches",
			stat: 0
		},
		{
			_id: nanoid(),
			name: "total members",
			stat: 0
		}
	];

	const familyPlans = [
		{
			_id: nanoid(),
			name: "pending",
			stat: 0
		},
		{
			_id: nanoid(),
			name: "active",
			stat: 0
		},
		{
			_id: nanoid(),
			name: "complete",
			stat: 0
		}
	];

	const events = {
		upcoming: 0,
		attending: 0,
		total: 0,
		list: [
			// {
			// 	_id: nanoid(),
			// 	name: "universal studios",
			// 	location: "orlando, FL",
			// 	image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/orlandofl-redesign/177995_UniversalOrlandoResortGlobe_2024_94dfefbf-5f68-4507-8ce8-c04ae202ff86.jpg",
			// 	startDate: "6/1/2026",
			// 	endDate: "6/3/2026"
			// },
			// {
			// 	_id: nanoid(),
			// 	name: "disney world",
			// 	location: "orlando, Fl",
			// 	image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cinderella_Castle%2C_Magic_Kingdom_Walt_Disney_World_2024_%28square_crop%29.jpg",
			// 	startDate: "6/1/2026",
			// 	endDate: "6/7/2026"
			// },
			// {
			// 	_id: nanoid(),
			// 	name: "dfadfadsfa",
			// 	location: "miami, fl",
			// 	image: "",
			// 	startDate: "6/1/2026"
			// },
			// {
			// 	_id: nanoid(),
			// 	name: "adfadfas",
			// 	location: "atlanta, GA",
			// 	image: "",
			// 	startDate: "6/1/2026"
			// },
			// {
			// 	_id: nanoid(),
			// 	name: "dfadfadfh",
			// 	location: "west palm beach, fl",
			// 	image: "",
			// 	startDate: "7/1/2026",
			// 	endDate: "8/1/2026"
			// }
		]
	};

	const familyHealth = [
		{
			id: nanoid(),
			name: "healthy members",
			stat: 0
		},
		{
			id: nanoid(),
			name: "sick members",
			stat: 0
		},
		{
			id: nanoid(),
			name: "recovering members",
			stat: 0
		},
		{
			id: nanoid(),
			name: "dead members",
			stat: 0
		}
	];

	const assignments = {
		active: 0,
		pending: 0,
		completed: 0,
		total: 0,
		list: [
			// {
			// 	_id: nanoid(),
			// 	name: "get a rental car",
			// 	status: "complete",
			// 	dueDate: "5/25/2026",
			// 	source: "spouse",
			// 	priority: "medium"
			// },
			// {
			// 	_id: nanoid(),
			// 	name: "book hotel in orlando for 4 days",
			// 	status: "complete",
			// 	dueDate: "5/30/2026",
			// 	source: "spouse",
			// 	priority: "high"
			// },
			// {
			// 	_id: nanoid(),
			// 	name: "parent teacher meeting",
			// 	status: "pending",
			// 	dueDate: "6/5/2026",
			// 	source: "teacher",
			// 	priority: "high"
			// },
			// {
			// 	_id: nanoid(),
			// 	name: "call mom",
			// 	status: "pending",
			// 	dueDate: "6/3/2026",
			// 	source: "family_member",
			// 	priority: "high"
			// },
			// {
			// 	_id: nanoid(),
			// 	name: "complete event registration",
			// 	status: "pending",
			// 	dueDate: "6/6/2026",
			// 	source: "the_club",
			// 	priority: "high"
			// }
		]
	};

	const meetings = {
		upcoming: 0,
		total: 0,
		list: [
			// {
			// 	_id: nanoid(),
			// 	date: "January 10th, 2022",
			// 	time: "5:00 PM",
			// 	datetime: "2022-01-10T17:00",
			// 	name: "Leslie Alexander",
			// 	imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			// 	location: "Starbucks"
			// },
			// {
			// 	_id: nanoid(),
			// 	date: "January 12th, 2022",
			// 	time: "3:00 PM",
			// 	datetime: "2022-01-12T15:00",
			// 	name: "Michael Foster",
			// 	imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			// 	location: "Tim Hortons"
			// },
			// {
			// 	_id: nanoid(),
			// 	date: "January 12th, 2022",
			// 	time: "5:00 PM",
			// 	datetime: "2022-01-12T17:00",
			// 	name: "Dries Vincent",
			// 	imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			// 	location: "Costa Coffee at Braehead"
			// },
			// {
			// 	_id: nanoid(),
			// 	date: "January 14th, 2022",
			// 	time: "10:00 AM",
			// 	datetime: "2022-01-14T10:00",
			// 	name: "Lindsay Walton",
			// 	imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			// 	location: "Silverburn"
			// },
			// {
			// 	_id: nanoid(),
			// 	date: "January 14th, 2022",
			// 	time: "12:00 PM",
			// 	datetime: "2022-01-14T12:00",
			// 	name: "Courtney Henry",
			// 	imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			// 	location: "The Glasgow Green"
			// }
		]
	};

	return (
		<div className="relative bg-gray-200">
			<div className={classNames(theme.base, "capitalize h-96")}>
				<h1 className="sr-only">parents dashboard</h1>
			</div>
			<div className="w-full sm:w-11/12 mx-auto -mt-80">
				<div className="w-full p-4 sm:px-6 lg:px-8 lg:pt-8 min-h-screen flex flex-col justify-between gap-4 bg-white sm:rounded-t-md">
					<div>
						<dl className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
							{stats.map((item) => (
								<div key={item._id} className="rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6 flex flex-col justify-center items-center border border-gray-400">
									<dt className="truncate text-sm font-medium text-gray-500 capitalize">{item.name}</dt>
									<dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
								</div>
							))}
						</dl>
					</div>
					<div className="grid gap-4 grid-cols-1 xl:grid-cols-3 xl:grid-rows-2">
						<div className="relative xl:row-span-2 border border-gray-400 rounded-md overflow-clip">
							<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 flex flex-col size-full">
								<div className="px-4 py-5 sm:px-6 capitalize text-center text-sm/6 font-medium text-gray-500">messages</div>
								<div className="px-4 py-2 sm:px-6 border-b border-gray-400">
									<dl className="size-full flex gap-2.5">
										<div className="flex-1 flex flex-col justify-evenly items-center">
											<dt className="capitalize text-sm font-medium text-gray-500">read</dt>
											<dd className="text-gray-700 text-3xl font-semibold">{messages.read}</dd>
										</div>
										<div className="flex-1 flex flex-col justify-evenly items-center">
											<dt className="capitalize text-sm font-medium text-gray-500">unread</dt>
											<dd className="text-gray-700 text-3xl font-semibold">{messages.unread}</dd>
										</div>
										<div className="flex-1 flex flex-col justify-evenly items-center">
											<dt className="capitalize text-sm font-medium text-gray-500">total</dt>
											<dd className="text-gray-700 text-3xl font-semibold">{messages.total}</dd>
										</div>
									</dl>
								</div>
								<div className="size-full bg-gray-200">
									<ul role="list" className="divide-y divide-gray-300 dark:divide-white/10 size-full">
										{messages.list.length > 0 ? (
											messages.list.map((message) => (
												<li key={message._id}>
													<div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
														<dl className="px-4 py-5 sm:p-6">
															<dt className="capitalize text-gray-900 font-semibold text-nowrap text-sm">{message.subject}</dt>
															<dd className="truncate text-sm">{message.message}</dd>
														</dl>
													</div>
												</li>
											))
										) : (
											<div className="text-center w-full py-4 flex flex-col justify-center items-center bg-white size-full">
												<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No messages to displays</h3>
												<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">a snapshot of your messages will appear here once available.</p>
											</div>
										)}
									</ul>
								</div>
							</div>
						</div>
						<div className="relative max-lg:row-start-1 border border-gray-400 rounded-md overflow-clip">
							<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
								<div className="px-4 py-5 sm:px-6 capitalize text-sm/6 text-gray-500 text-center">family overview</div>
								<div className="px-4 py-5 sm:p-6 text-gray-900">
									<dl className="size-full flex flex-col gap-4">
										{familyOverview.map((item) => (
											<div key={item._id} className="flex justify-between items-center px-4 lg:px-10">
												<dt className="capitalize text-sm font-medium text-gray-500">{item.name}</dt>
												<dd className="text-gray-700 text-3xl font-semibold">{item.stat}</dd>
											</div>
										))}
									</dl>
								</div>
							</div>
						</div>
						<div className="relative max-lg:row-start-3 xl:col-start-2 xl:row-start-2 border border-gray-400 rounded-md overflow-clip">
							<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
								<div className="px-4 py-5 sm:px-6 capitalize text-sm/6 font-medium text-gray-500 text-center">family plans</div>
								<div className="px-4 py-5 sm:p-6">
									<dl className="size-full flex flex-col gap-2.5">
										{familyPlans.map((plan) => (
											<div key={plan._id} className="flex justify-between items-center px-4 lg:px-10">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">{plan.name}</dt>
												<dd className="text-gray-700 text-3xl font-semibold">{plan.stat}</dd>
											</div>
										))}
									</dl>
								</div>
							</div>
						</div>
						<div className="relative lg:row-span-2 border border-gray-400 rounded-md overflow-clip">
							<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 flex flex-col size-full">
								<div className="px-4 py-5 sm:px-6 capitalize text-center text-sm/6 font-medium text-gray-500">events</div>
								<div className="px-4 py-2 sm:px-6 border-b border-gray-400">
									<dl className="size-full flex gap-2.5">
										<div className="flex-1 flex flex-col justify-evenly items-center">
											<dt className="capitalize text-sm font-medium text-gray-500">upcoming</dt>
											<dd className="text-gray-700 text-3xl font-semibold tracking-tight">{events.upcoming}</dd>
										</div>
										<div className="flex-1 flex flex-col justify-evenly items-center">
											<dt className="capitalize text-sm font-medium text-gray-500">attending</dt>
											<dd className="text-gray-700 text-3xl font-semibold tracking-tight">{events.attending}</dd>
										</div>
										<div className="flex-1 flex flex-col justify-evenly items-center">
											<dt className="capitalize text-sm font-medium text-gray-500">total</dt>
											<dd className="text-gray-700 text-3xl font-semibold tracking-tight">{events.total}</dd>
										</div>
									</dl>
								</div>
								<div className="size-full bg-gray-200">
									<ul role="list" className="divide-y divide-gray-400 dark:divide-white/10 size-full">
										{events.list.length > 0 ? (
											events.list.map((event) => (
												<li key={event._id}>
													<div className="bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
														<div className="p-4 sm:p-6 flex justify-between items-center gap-4">
															<div className="">
																<ImageCard
																	image={event.image}
																	settings={{
																		alt: `${event?.name} image`,
																		styles: {
																			image: "object-cover object-center size-full",
																			background: "size-9 rounded-full bg-gray-300"
																		}
																	}}
																/>
															</div>
															<div className="flex-1">
																<div>
																	<dl className="flex justify-start items-center">
																		<div>
																			<dt className="sr-only">event name</dt>
																			<dd className="text-sm capitalize truncate font-medium">{event.name}</dd>
																		</div>
																		<div>
																			<dt></dt>
																			<dd></dd>
																		</div>
																	</dl>
																</div>
																<div className="">
																	<dl className="flex justify-start items-center text-sm text-gray-700 gap-1 capitalize">
																		<div>
																			<dt className="sr-only">event start date</dt>
																			<dd className="text-sm capitalize truncate font-medium">{event?.startDate}</dd>
																		</div>
																		{event?.endDate && (
																			<div>
																				<dt className="sr-only">event end date</dt>
																				<dd className="text-sm capitalize truncate font-medium"> - {event?.endDate}</dd>
																			</div>
																		)}
																		<div className="border-l border-gray-400 ml-1.5">
																			<dt className="sr-only">event location</dt>
																			<dd className="pl-1 flex gap-1 justify-start items-center capitalize truncate text-nowrap">
																				<MapPinIcon className="size-4 text-gray-500" />
																				{event.location}
																			</dd>
																		</div>
																	</dl>
																</div>
															</div>
															<div className="">
																<Menu as="div" className="relative hidden sm:block">
																	<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
																		<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
																	</MenuButton>
																	<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
																		<MenuItem>
																			<button className={classNames(buttonVariants({ variant: "greenBtn" }))}>activate</button>
																		</MenuItem>
																		<MenuItem>
																			<button className={classNames(buttonVariants({ variant: "orangeBtn" }))}>deactivate</button>
																		</MenuItem>
																		<MenuItem>
																			<button className={classNames(buttonVariants({ variant: "yellowBtn" }))}>Edit</button>
																		</MenuItem>
																		<MenuItem>
																			<button className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>delete</button>
																		</MenuItem>
																	</MenuItems>
																</Menu>
															</div>
														</div>
													</div>
												</li>
											))
										) : (
											<div className="text-center w-full py-4 rounded-sm flex flex-col justify-center items-center bg-white size-full">
												<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No events to display</h3>
												<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">event snapshot will appear once available.</p>
											</div>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="col-span-full divide-y divide-gray-200  bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400 rounded-md">
						<div className="px-4 py-5 sm:px-6 text-center capitalize text-sm/6 font-medium text-gray-500">family health</div>
						<div className="px-4 py-2.5 sm:p-6">
							<dl className="grid grid-cols-1 gap-5 sm:grid-cols-4">
								{familyHealth.map((item) => (
									<div key={item.id} className="rounded-lg bg-white px-4 py-5 shadow-sm sm:px-6 flex flex-col justify-center items-center">
										<dt className="truncate text-sm font-medium text-gray-500 capitalize">{item.name}</dt>
										<dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
									</div>
								))}
							</dl>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
						<div className="relative border border-gray-400 rounded-md overflow-clip">
							<div className="absolute inset-0 rounded-lg  lg:rounded-bl-4xl" />
							<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
								<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 flex flex-col size-full min-h-96">
									<div className="px-4 py-5 sm:px-6 capitalize text-center text-sm/6 font-medium text-gray-500">assignments</div>
									<div className="px-4 py-2 sm:px-6 border-b border-gray-400">
										<dl className="size-full flex gap-2.5">
											<div className="flex-1 flex flex-col justify-evenly items-center">
												<dt className="capitalize text-sm font-medium text-gray-500">active</dt>
												<dd className="text-3xl font-semibold tracking-tight text-gray-900">{assignments.active}</dd>
											</div>
											<div className="flex-1 flex flex-col justify-evenly items-center">
												<dt className="capitalize text-sm font-medium text-gray-500">pending</dt>
												<dd className="text-3xl font-semibold tracking-tight text-gray-900">{assignments.pending}</dd>
											</div>
											<div className="flex-1 flex flex-col justify-evenly items-center">
												<dt className="capitalize text-sm font-medium text-gray-500">completed</dt>
												<dd className="text-3xl font-semibold tracking-tight text-gray-900">{assignments.completed}</dd>
											</div>
											<div className="flex-1 flex flex-col justify-evenly items-center">
												<dt className="capitalize text-sm font-medium text-gray-500">total</dt>
												<dd className="text-3xl font-semibold tracking-tight text-gray-900">{assignments.total}</dd>
											</div>
										</dl>
									</div>

									<div className="size-full bg-gray-200">
										{assignments.list.length > 0 ? (
											<table className="size-full divide-y divide-gray-400">
												<thead className="bg-white">
													<tr>
														<th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 capitalize">
															name
														</th>
														<th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 xl:table-cell capitalize">
															status
														</th>
														<th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell capitalize">
															due date
														</th>

														<th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell capitalize">
															source
														</th>

														<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 capitalize">
															priority
														</th>
														<th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
															<span className="sr-only">action options</span>
														</th>
													</tr>
												</thead>
												<tbody className="divide-y divide-gray-400 bg-white">
													{assignments.list.map((assignment) => (
														<tr key={assignment?._id}>
															<td className="w-full max-w-0 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none capitalize truncate">
																{assignment?.name}
																<dl className="font-normal xl:hidden">
																	<dt className="sr-only sm:hidden">status</dt>
																	<dd className="mt-1 truncate text-gray-500 xl:hidden capitalize">{assignment?.status}</dd>
																	<dd className="mt-1 truncate text-gray-500 sm:hidden capitalize">{assignment?.dueDate}</dd>
																	<dd className="mt-1 truncate text-gray-500 sm:hidden capitalize">{assignment?.source}</dd>
																</dl>
															</td>
															<td className="hidden px-3 py-4 text-sm text-gray-500 xl:table-cell capitalize">{assignment?.status}</td>
															<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell capitalize">{assignment?.dueDate}</td>
															<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell capitalize">{assignment?.source}</td>
															<td className="px-3 py-4 text-sm text-gray-500 capitalize">{assignment?.priority}</td>
															<td className="py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-0">
																<span className="sr-only">action options</span>
																<Menu as="div" className="relative hidden sm:block">
																	<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
																		<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
																	</MenuButton>
																	<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
																		<MenuItem>
																			<button className={classNames(buttonVariants({ variant: "greenBtn" }))}>activate</button>
																		</MenuItem>
																		<MenuItem>
																			<button className={classNames(buttonVariants({ variant: "orangeBtn" }))}>deactivate</button>
																		</MenuItem>
																		<MenuItem>
																			<button className={classNames(buttonVariants({ variant: "yellowBtn" }))}>Edit</button>
																		</MenuItem>
																		<MenuItem>
																			<button className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>delete</button>
																		</MenuItem>
																	</MenuItems>
																</Menu>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										) : (
											<div className="text-center w-full py-4 rounded-sm flex flex-col justify-center items-center size-full bg-white">
												<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No assignments to display</h3>
												<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">An assignments snapshot will appear here once available.</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="relative border border-gray-400 rounded-md overflow-clip">
							<div className="absolute inset-0 rounded-lg  max-lg:rounded-b-4xl lg:rounded-br-4xl" />
							<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
								<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 flex flex-col size-full min-h-96">
									<div className="px-4 py-5 sm:px-6 capitalize text-sm/6 font-medium text-gray-500 text-center">meetings</div>
									<div className="px-4 py-2 sm:px-6 border-b border-gray-400">
										<dl className="size-full flex gap-2.5">
											<div className="flex-1 flex flex-col justify-evenly items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">upcoming</dt>
												<dd className="text-3xl font-semibold tracking-tight text-gray-900">{meetings.upcoming}</dd>
											</div>
											<div className="flex-1 flex flex-col justify-evenly items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">total</dt>
												<dd className="text-3xl font-semibold tracking-tight text-gray-900">{meetings.total}</dd>
											</div>
										</dl>
									</div>
									<div className="size-full bg-gray-200">
										<ol role="list" className="divide-y divide-gray-400 text-sm/6 size-full">
											{meetings.list.length > 0 ? (
												meetings.list.map((meeting) => (
													<li key={meeting._id} className="px-4 relative flex gap-x-6 py-6 xl:static bg-white">
														<img alt="" src={meeting.imageUrl} className="size-14 flex-none rounded-full" />
														<div className="flex-auto">
															<h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{meeting.name}</h3>
															<dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
																<div className="flex items-start gap-x-3">
																	<dt className="mt-0.5">
																		<span className="sr-only">Date</span>
																		<CalendarIcon aria-hidden="true" className="size-5 text-gray-400" />
																	</dt>
																	<dd>
																		<time dateTime={meeting.datetime}>
																			{meeting.date} at {meeting.time}
																		</time>
																	</dd>
																</div>
																<div className="mt-2 flex items-start gap-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400/50 xl:pl-3.5">
																	<dt className="mt-0.5">
																		<span className="sr-only">Location</span>
																		<MapPinIcon aria-hidden="true" className="size-5 text-gray-400" />
																	</dt>
																	<dd>{meeting.location}</dd>
																</div>
															</dl>
														</div>
														<Menu as="div" className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center">
															<MenuButton className="relative flex items-center rounded-full text-gray-500 hover:text-gray-600">
																<span className="absolute -inset-2" />
																<span className="sr-only">Open options</span>
																<EllipsisVerticalIcon aria-hidden="true" className="size-5" />
															</MenuButton>

															<MenuItems transition className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
																<div className="py-1">
																	<MenuItem>
																		<a href="#" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
																			Edit
																		</a>
																	</MenuItem>
																	<MenuItem>
																		<a href="#" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
																			Cancel
																		</a>
																	</MenuItem>
																</div>
															</MenuItems>
														</Menu>
													</li>
												))
											) : (
												<div className="text-center w-full py-4 rounded-sm flex flex-col justify-center items-center bg-white size-full">
													<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No meetings to display</h3>
													<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">A snapshot of your meetings will appear once available.</p>
												</div>
											)}
										</ol>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
