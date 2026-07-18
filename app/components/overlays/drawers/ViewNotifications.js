"use client";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { useAtomValue } from "jotai";
import React, { Fragment, useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { useTheme } from "../../providers/ThemeProvider";
import { Pagination } from "@mui/material";
import { nanoid } from "nanoid";
import { Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowPathIcon, EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useCancelFriendRequestMutation, useCancelGroupJoinRequestMutation, useDeleteUserNotificationMutation, useLazyGetUserNotificationsQuery, useNotificationResponseMutation, useRespondToJoinRequestMutation } from "@/app/lib/redux/data-fetching/global-api";
import toast from "react-hot-toast";
import EmptyNotifications from "../../empty-states/EmptyNotifications";
import { add, milliseconds } from "date-fns";

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

	const [getNotifications, getNotificationsResults] = useLazyGetUserNotificationsQuery({ pollingInterval: milliseconds({ minutes: 5 }) });

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

	const [response, responseResults] = useNotificationResponseMutation();

	useEffect(() => {
		if (responseResults.isError) {
			const message = typeof responseResults.error === "string" ? responseResults.error : responseResults.error.message;
			toast.error(message);
		} else if (responseResults.isSuccess) {
			toast.success(responseResults.data.message);
		}
	}, [responseResults.isLoading, responseResults.isSuccess, responseResults.isError]);

	const handleNotificationResponse = (decision, notification) => {
		switch (decision) {
			case "accept":
				response({
					response: decision,
					sender: user._id,
					senderType: user.docType,
					recipient: notification.sender._id,
					recipientType: notification.sender.docType,
					notificationId: notification._id,
					event: "FRIEND_REQUEST_ACCEPTED"
				});
				break;
			case "decline":
				response({
					response: decision,
					sender: user._id,
					senderType: user.docType,
					recipient: notification.sender._id,
					recipientType: notification.sender.docType,
					notificationId: notification._id,
					event: "FRIEND_REQUEST_DENIED"
				});
				break;
			default:
				throw new Error("Notification response not authorized.");
		}
	};

	const refreshNotifications = () => {
		getNotifications({ userId: user._id, page, limit, filters: JSON.stringify(filters), department });
	};

	const [cancelRequest, cancelRequestResults] = useCancelFriendRequestMutation();

	useEffect(() => {
		if (cancelRequestResults.isError) {
			const message = typeof cancelRequestResults.error === "string" ? cancelRequestResults.error : cancelRequestResults.error.message;
			toast.error(message);
		} else if (cancelRequestResults.isSuccess) {
			toast.success(cancelRequestResults.data.message);
		}
	}, [cancelRequestResults.isLoading, cancelRequestResults.isSuccess, cancelRequestResults.isError]);

	const [cancelJoinRequest, cancelJoinRequestResults] = useCancelGroupJoinRequestMutation();

	useEffect(() => {
		if (cancelJoinRequestResults.isError) {
			const message = typeof cancelJoinRequestResults.error === "string" ? cancelJoinRequestResults.error : cancelJoinRequestResults.error.message;
			toast.error(message);
		} else if (cancelJoinRequestResults.isSuccess) {
			toast.success(cancelJoinRequestResults.data.message);
		}
	}, [cancelJoinRequestResults.isLoading, cancelJoinRequestResults.isSuccess, cancelJoinRequestResults.isError]);

	const [groupJoinResponse, groupJoinResponseResults] = useRespondToJoinRequestMutation();

	useEffect(() => {
		if (groupJoinResponseResults.isError) {
			const message = typeof groupJoinResponseResults.error === "string" ? groupJoinResponseResults.error : groupJoinResponseResults.error.message;
			toast.error(message);
		} else if (groupJoinResponseResults.isSuccess) {
			toast.success(groupJoinResponseResults.data.message);
		}
	}, [groupJoinResponseResults.isLoading, groupJoinResponseResults.isSuccess, groupJoinResponseResults.isError]);

	const dynamicNotificationResponses = (event, notification) => {
		switch (event) {
			case "notifications.friend_request":
				return (
					<Fragment>
						{notification.creator !== user?._id && (
							<div className="flex justify-evenly items-center gap-2.5 w-full mt-2.5">
								<button type="button" onClick={() => handleNotificationResponse("accept", notification)} className={classNames(buttonVariants({ variant: "greenBtn" }), "flex-auto cursor-pointer")}>
									accept
								</button>
								<button type="button" onClick={() => handleNotificationResponse("decline", notification)} className={classNames(buttonVariants({ variant: "destructiveBtn" }), "flex-auto cursor-pointer")}>
									decline
								</button>
							</div>
						)}

						{notification.creator === user?._id && (
							<div className="flex justify-evenly items-center gap-2.5 w-full mt-2.5">
								<button type="button" onClick={() => cancelRequest({ notificationId: notification._id, action: "cancel request" })} className={classNames(buttonVariants({ variant: "destructiveBtn" }), "flex-auto cursor-pointer")}>
									cancel request
								</button>
							</div>
						)}
					</Fragment>
				);
			case "notifications.join_group_request":
				return (
					<div>
						{notification.creator !== user._id && (
							<div className="flex justify-evenly items-center gap-2.5 w-full mt-2.5">
								<button type="button" onClick={() => groupJoinResponse({ responseType: "accept", requestId: notification?.metaData?.joinRequestId, key: notification?.key, userId: user._id, userType: user.docType, event: "GROUP_JOIN_REQUEST_ACCEPTED" })} className={classNames(buttonVariants({ variant: "greenBtn" }), "flex-auto cursor-pointer")}>
									accept
								</button>
								<button
									type="button"
									onClick={() => {
										groupJoinResponse({ responseType: "decline", requestId: notification?.metaData?.joinRequestId, key: notification?.key, userId: user._id, userType: user.docType, event: "GROUP_JOIN_REQUEST_DENIED" });
										closingFunction();
									}}
									className={classNames(buttonVariants({ variant: "destructiveBtn" }), "flex-auto cursor-pointer")}>
									decline
								</button>
							</div>
						)}
						{notification.creator === user._id && (
							<div className="flex justify-evenly items-center gap-2.5 w-full mt-2.5">
								<button
									type="button"
									onClick={() => {
										cancelJoinRequest({ key: notification?.key, requestId: notification?.metaData?.joinRequestId });
										closingFunction();
									}}
									className={classNames(buttonVariants({ variant: "destructiveBtn" }), "flex-auto cursor-pointer")}>
									cancel
								</button>
							</div>
						)}
					</div>
				);
			case "":
				break;
			default:
				return;
		}
	};

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-50">
			<div className="fixed inset-0" />

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-lg xl:pl-16">
						<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
							<div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
								<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
									<div className={classNames(theme.base, "px-4 py-[1.61rem] sm:px-6 bg-black")}>
										<div className="flex items-center justify-between">
											<DialogTitle className="text-base font-semibold text-white capitalize flex gap-1.5 items-center">
												notifications
												<ArrowPathIcon onClick={refreshNotifications} className="size-5 cursor-pointer" />
											</DialogTitle>
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
												{notifications.length === 0 ? (
													<EmptyNotifications />
												) : (
													notifications.map((notification) => (
														<li key={notification._id} className="flex justify-between gap-x-6 py-5">
															<div className="flex-auto flex min-w-0 gap-x-4">
																<img alt="" src={notification?.sender?.image?.url} className="size-12 flex-none rounded-full bg-gray-50 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10 object-cover" />
																<div className="min-w-0 flex-auto">
																	<p className="text-sm/6 font-semibold text-gray-900 dark:text-white capitalize">{notification.title}</p>
																	<p className="mt-1 flex text-xs/5 text-gray-500 dark:text-gray-400">{notification.message}</p>
																	{dynamicNotificationResponses(notification?.event, notification)}
																</div>
															</div>
															<div className="flex shrink-0 items-start gap-x-6">
																<Menu as="div" className="relative flex-none">
																	<MenuButton className="relative block text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
																		<span className="absolute -inset-2.5" />
																		<span className="sr-only">Open options</span>
																		<EllipsisVerticalIcon aria-hidden="true" className="size-5" />
																	</MenuButton>
																	<MenuItems transition className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white p-2 shadow-lg outline outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 flex flex-col justify-center items-center">
																		<MenuItem>
																			<button type="button" onClick={() => deleteNotification({ notificationId: notification._id, action: "delete" })} className={classNames(buttonVariants({ variant: "destructiveBtn" }), "w-full")}>
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
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
