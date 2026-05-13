"use client";
import { useTheme } from "@/app/components/providers/ThemeProvider";
import { buttonVariants } from "@/app/components/shadcn/button";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChatBubbleLeftRightIcon, EllipsisVerticalIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
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

	const connections = [
		{
			_id: nanoid(),
			firstName: "Michael",
			lastName: "Foster",
			image: {
				publicId: nanoid(),
				url: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			},
			projectName: "ios-app",
			commit: "2d89f0c8",
			branch: "main",
			date: "1h",
			dateTime: "2023-01-23T11:00",
			docType: "Parent"
		},
		{
			_id: nanoid(),
			firstName: "Lindsay",
			lastName: "Walton",
			image: {
				publicId: nanoid(),
				url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			},
			projectName: "mobile-api",
			commit: "249df660",
			branch: "main",
			date: "3h",
			dateTime: "2023-01-23T09:00",
			docType: "Parent"
		},
		{
			_id: nanoid(),
			firstName: "Courtney",
			lastName: "Henry",
			image: {
				publicId: nanoid(),
				url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			},
			projectName: "ios-app",
			commit: "11464223",
			branch: "main",
			date: "12h",
			dateTime: "2023-01-23T00:00",
			docType: "Parent"
		},
		{
			_id: nanoid(),
			firstName: "Courtney",
			lastName: "Henry",
			image: {
				publicId: nanoid(),
				url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			},

			projectName: "company-website",
			commit: "dad28e95",
			branch: "main",
			date: "2d",
			dateTime: "2023-01-21T13:00",
			docType: "Parent"
		},
		{
			_id: nanoid(),
			firstName: "Michael",
			lastName: "Foster",
			image: {
				publicId: nanoid(),
				url: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			},

			projectName: "relay-service",
			commit: "624bc94c",
			branch: "main",
			date: "5d",
			dateTime: "2023-01-18T12:34",
			docType: "Parent"
		},
		{
			_id: nanoid(),
			firstName: "Courtney",
			lastName: "Henry",
			image: {
				publicId: nanoid(),
				url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			},

			projectName: "api.protocol.chat",
			commit: "e111f80e",
			branch: "main",
			date: "1w",
			dateTime: "2023-01-16T15:54",
			docType: "Parent"
		},
		{
			_id: nanoid(),
			firstName: "Michael",
			lastName: "Foster",
			image: {
				publicId: nanoid(),
				url: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			},

			projectName: "api.protocol.chat",
			commit: "5e136005",
			branch: "main",
			date: "1w",
			dateTime: "2023-01-16T11:31",
			docType: "Parent"
		},
		{
			_id: nanoid(),
			firstName: "Whitney",
			lastName: "Francis",
			image: {
				publicId: nanoid(),
				url: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			},

			projectName: "ios-app",
			commit: "5c1fd07f",
			branch: "main",
			date: "2w",
			dateTime: "2023-01-09T08:45",
			docType: "Parent"
		}
	];

	return (
		<div className="relative bg-gray-200">
			<div className={classNames(theme.base, "capitalize h-96")} />
			<div className="w-11/12 mx-auto grid grid-cols-7 -mt-32 lg:-mt-64 gap-8">
				<div className="col-span-full lg:col-span-5 max-w-2xl px-4 sm:px-6 lg:px-8 lg:pt-8 lg:max-w-7xl min-h-screen flex flex-col justify-between gap-2.5 bg-white rounded-t-md">
					<span className="sr-only">parents dashboard</span>
					<section className="grid grid-cols-1 lg:grid-cols-4">
						<div className="flex flex-col gap-1.5">
							<div className="capitalize text-sm/6 text-gray-500 font-medium text-center">connection requests</div>
							<div className="text-gray-900 text-3xl/10 text-center">0</div>
						</div>
						<div className="flex flex-col gap-1.5">
							<div className="capitalize text-sm/6 text-gray-500 font-medium text-center">total connections</div>
							<div className="text-gray-900 text-3xl/10 text-center">0</div>
						</div>
						<div className="flex flex-col gap-1.5">
							<div className="capitalize text-sm/6 text-gray-500 font-medium text-center">promotions</div>
							<div className="text-gray-900 text-3xl/10 text-center">0</div>
						</div>
						<div className="flex flex-col gap-1.5">
							<div className="capitalize text-sm/6 text-gray-500 font-medium text-center">new programs</div>
							<div className="text-gray-900 text-3xl/10 text-center">0</div>
						</div>
					</section>
					<section className="grid grid-cols-1 lg:grid-cols-2">
						<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
							<div className="px-4 py-5 sm:px-6 capitalize text-sm/6 text-gray-500 text-center">family overview</div>
							<div className="px-4 py-5 sm:p-6 text-gray-900">
								<dl className="size-full flex flex-col gap-2.5">
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">family tree</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">branches</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">total members</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
								</dl>
							</div>
						</div>
						<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
							<div className="px-4 py-5 sm:px-6 capitalize text-sm/6 font-medium text-gray-500 text-center">family plans</div>
							<div className="px-4 py-5 sm:p-6">
								<dl className="size-full flex flex-col gap-2.5">
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">pending</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">active</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">complete</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
								</dl>
							</div>
						</div>

						<div className="col-span-full divide-y divide-gray-200  bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
							<div className="px-4 py-5 sm:px-6 text-center capitalize text-sm/6 font-medium text-gray-500">family health</div>
							<div className="px-4 py-5 sm:p-6">
								<dl className="size-full grid grid-cols-1 lg:grid-cols-4 gap-2.5">
									<div className="flex flex-col justify-center items-center gap-1.5">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">healthy</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex flex-col justify-center items-center gap-1.5">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">sick</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex flex-col justify-center items-center gap-1.5">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">recovering</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex flex-col justify-center items-center gap-1.5">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">dead</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
								</dl>
							</div>
						</div>
					</section>
					<section className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
						<div>
							<div className="px-4 py-5 sm:px-6 capitalize text-sm/6 font-medium text-gray-500 text-center">assignments</div>
							<div className="px-4 py-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2">
								<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
									<div className="px-4 py-5 sm:px-6 text-sm/6 font-medium text-gray-500 capitalize">sent</div>
									<div className="px-4 sm:px-6">
										<dl className="size-full flex flex-col gap-2.5">
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">pending</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">active</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">completed</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
										</dl>
									</div>
								</div>
								<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
									<div className="px-4 py-5 sm:px-6 text-sm/6 font-medium text-gray-500 capitalize">received</div>
									<div className="px-4 sm:px-6">
										<dl className="size-full flex flex-col gap-2.5">
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">pending</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">active</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">completed</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
										</dl>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div className="px-4 py-5 sm:px-6 capitalize text-sm/6 font-medium text-gray-500 text-center">meetings</div>
							<div className="px-4 py-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2">
								<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
									<div className="px-4 py-5 sm:px-6 text-sm/6 font-medium text-gray-500 capitalize">sent</div>
									<div className="px-4 sm:px-6">
										<dl className="size-full flex flex-col gap-2.5">
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">total</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">upcoming</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
										</dl>
									</div>
								</div>
								<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
									<div className="px-4 py-5 sm:px-6 text-sm/6 font-medium text-gray-500 capitalize">received</div>
									<div className="px-4 sm:px-6">
										<dl className="size-full flex flex-col gap-2.5">
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">total</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
											<div className="flex justify-between items-center">
												<dt className="capitalize text-sm/6 font-medium text-gray-500">upcoming</dt>
												<dd className="text-gray-700 text-2xl">0</dd>
											</div>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="grid grid-cols-1 lg:grid-cols-2">
						<div className="divide-y divide-gray-200 bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
							<div className="px-4 py-5 sm:px-6 capitalize text-center text-sm/6 font-medium text-gray-500">messages</div>
							<div className="px-4 py-5 sm:px-6">
								<dl className="size-full flex flex-col gap-2.5 mt-4">
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">total messages</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">read</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">unread</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
								</dl>
							</div>
						</div>
						<div>
							<div className="px-4 py-5 sm:px-6 capitalize text-sm/6 font-medium text-gray-500 text-center">schedules</div>
							<div className="px-4 py-5 sm:p-6">
								<dl className="size-full flex flex-col gap-2.5 mt-4">
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">created</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">active</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">inactive</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
								</dl>
							</div>
						</div>
					</section>
					<section className="grid grid-cols-1 lg:grid-cols-2">
						<div>
							<div className="px-4 py-5 sm:px-6 capitalize text-center text-sm/6 font-medium text-gray-500">events</div>
							<div className="px-4 py-5 sm:px-6 text-gray-900 text-2xl">
								<dl className="size-full flex flex-col gap-2.5">
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">total</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">upcoming</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
								</dl>
							</div>
						</div>
						<div>
							<div className="px-4 py-5 sm:px-6 capitalize text-center text-sm/6 font-medium text-gray-500">reports</div>
							<div className="px-4 py-5 sm:px-6">
								<dl className="size-full flex flex-col gap-2.5">
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">seen</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
									<div className="flex justify-between items-center">
										<dt className="capitalize text-sm/6 font-medium text-gray-500">unseen</dt>
										<dd className="text-gray-700 text-2xl">0</dd>
									</div>
								</dl>
							</div>
						</div>
					</section>
				</div>
				<div className="hidden lg:flex flex-col col-span-2 min-h-screen bg-white rounded-t-md overflow-hidden">
					<div className={classNames(theme.sectionNavbar.root, theme.text.navbar, "px-4 py-5 sm:p-6 lg:p-8 text-sm/6 font-medium text-gray-500 capitalize")}>favorite connections</div>
					<div className="px-4 py-5 sm:p-6 flex-1">
						<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
							{connections.map((connection) => (
								<li key={nanoid()} className="py-4">
									<div className="flex items-center gap-x-3">
										<img alt="" src={connection.image.url} className="size-10 flex-none rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5" />
										<div className="grow flex flex-col gap-1.5">
											<h3 className="flex-auto truncate text-sm/6 font-semibold text-gray-900">
												{connection.firstName} {connection.lastName}
											</h3>
											<div className="text-gray-500 flex items-center gap-3">
												<div className="size-2.5 bg-green-500 animate-ping rounded-full" />
												<span className="capitalize font-medium text-sm">online</span>
											</div>
										</div>
										<div className="grow flex justify-evenly items-center gap-2.5">
											<ChatBubbleLeftRightIcon className="size-6 text-gray-500 hover:text-blue-500 cursor-pointer" />
											<EnvelopeIcon className="size-6 text-gray-500 hover:text-blue-500 cursor-pointer" />
										</div>
										<Menu as="div" className="relative hidden sm:block">
											<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
												<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
											</MenuButton>
											<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
												<MenuItem>
													<Link href={`view/profiles/${connection._id}/${connection.docType}`} className={classNames(buttonVariants({ variant: "blueBtn" }))}>
														view profile
													</Link>
												</MenuItem>
												<MenuItem>
													<button className={classNames(buttonVariants({ variant: "yellowBtn" }))}>remove favorite</button>
												</MenuItem>
												<MenuItem>
													<button className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>unfriend</button>
												</MenuItem>
											</MenuItems>
										</Menu>
									</div>
								</li>
							))}
						</ul>
					</div>
					<div className={classNames(theme.sectionNavbar.root, theme.text.navbar, "px-4 py-4 sm:px-6 flex justify-center items-center")}>
						<Pagination count={totalPages} page={page} siblingCount={0} variant="outlined" onChange={handlePagination} className="pagination__black-background pagination__yellow-highlight" />
					</div>
				</div>
			</div>
		</div>
	);
}
