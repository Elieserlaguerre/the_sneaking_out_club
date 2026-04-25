"use client";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { useTheme } from "../../providers/ThemeProvider";
import { Pagination } from "@mui/material";
import { nanoid } from "nanoid";
import { Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useDeleteUserNotificationMutation, useLazyGetUserNotificationsQuery } from "@/app/lib/redux/data-fetching/global-api";
import toast from "react-hot-toast";
import EmptyNotifications from "../../empty-states/EmptyNotifications";

export default function ViewNotifications({ open, closingFunction }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const department = useAtomValue(currentDepartment);

	const theme = useTheme();

	const [notifications, setNotifications] = useState([]);

	const pageSizes = [
		{
			id: nanoid(),
			value: 25
		},
		{
			id: nanoid(),
			value: 50
		},
		{
			id: nanoid(),
			value: 75
		},
		{
			id: nanoid(),
			value: 100
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

	const [getNotifications, getNotificationsResults] = useLazyGetUserNotificationsQuery();

	useEffect(() => {
		if (getNotificationsResults.isError) {
			const message = typeof getNotificationsResults.error === "string" ? getNotificationsResults.error : getNotificationsResults.error.message;
			toast.error(message);
		} else if (getNotificationsResults.isSuccess) {
			// toast.success(getNotificationsResults.data.message);

			const { results } = getNotificationsResults.data;
			// console.log("results", results);

			setNotifications(results.notifications);
			setTotalPages(results.totalPages);
		}
	}, [getNotificationsResults.isFetching, getNotificationsResults.isSuccess, getNotificationsResults.isError]);

	useEffect(() => {
		if (user) {
			getNotifications({ userId: user._id, page, limit, filters: JSON.stringify(filters), department });
		}
	}, [user, page, limit, filters]);

	const [deleteNotification, deleteNotificationResults] = useDeleteUserNotificationMutation();

	useEffect(() => {
		if (deleteNotificationResults.isError) {
			const message = typeof deleteNotificationResults.error === "string" ? deleteNotificationResults.error : deleteNotificationResults.error.message;
			toast.error(message);
		} else if (deleteNotificationResults.isSuccess) {
			toast.success(deleteNotificationResults.data.message);
		}
	}, [deleteNotificationResults.isLoading, deleteNotificationResults.isSuccess, deleteNotificationResults.isError]);

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-50">
			<div className="fixed inset-0" />

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-lg xl:pl-16">
						<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
							<form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
								<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
									<div className={classNames(theme.base, "px-4 py-[1.61rem] sm:px-6 bg-black")}>
										<div className="flex items-center justify-between">
											<DialogTitle className="text-base font-semibold text-white capitalize">notifications</DialogTitle>
											<div className="ml-3 flex h-7 items-center">
												<button type="button" onClick={closingFunction} className="relative rounded-md bg-transparent text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
													<span className="absolute -inset-2.5" />
													<span className="sr-only">Close panel</span>
													<XMarkIcon aria-hidden="true" className="text-white w-6 h-6" />
												</button>
											</div>
										</div>
									</div>
									<div className="divide-y divide-gray-200 grow overflow-y-auto pb-4">
										<div className="space-y-6 pt-6 h-full max-w-md mx-auto px-4">
											<ul role="list" className="divide-y divide-gray-100 dark:divide-white/5 flex flex-col size-full">
												{getNotificationsResults.isFetching ? (
													""
												) : notifications.length === 0 ? (
													<EmptyNotifications />
												) : (
													notifications.map((notification) => (
														<li key={notification._id} className="flex justify-between gap-x-6 py-5">
															<div className="flex min-w-0 gap-x-4">
																<img alt="" src={notification.from.image.url} className="size-12 flex-none rounded-full bg-gray-50 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10 object-cover" />
																<div className="min-w-0 flex-auto">
																	<p className="text-sm/6 font-semibold text-gray-900 dark:text-white capitalize">{notification.title}</p>
																	<p className="mt-1 flex text-xs/5 text-gray-500 dark:text-gray-400">{notification.message}</p>
																</div>
															</div>
															<div className="flex shrink-0 items-start gap-x-6">
																<Menu as="div" className="relative flex-none">
																	<MenuButton className="relative block text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
																		<span className="absolute -inset-2.5" />
																		<span className="sr-only">Open options</span>
																		<EllipsisVerticalIcon aria-hidden="true" className="size-5" />
																	</MenuButton>
																	<MenuItems transition className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
																		<MenuItem>
																			<button onClick={() => deleteNotification({ notificationId: notification._id })} className={classNames(buttonVariants({ variant: "destructiveBtn" }), "w-full")}>
																				delete<span className="sr-only">notification</span>
																			</button>
																		</MenuItem>
																	</MenuItems>
																</Menu>
															</div>
														</li>
													))
												)}
											</ul>
										</div>
									</div>
								</div>
								<div className={classNames(theme.base, "flex shrink-0 justify-evenly items-center px-4 py-4")}>
									<Pagination count={totalPages} defaultPage={page} siblingCount={0} variant="outlined" onChange={handlePagination} className="pagination__black-background pagination__yellow-highlight" />
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
