"use client";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { useTheme } from "../providers/ThemeProvider";
import { buttonVariants } from "../shadcn/button";
import { IoArrowRedoOutline } from "react-icons/io5";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { dynamicPostContentDisplay } from "@/app/lib/util/frontend";
import { useDeleteSavedPostMutation, useReportSavedItemMutation } from "@/app/lib/redux/data-fetching/global-api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import ManageCollections from "../overlays/modals/ManageCollections";
import SharePost from "../overlays/modals/SharePost";

export default function SavedCard({ item }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const theme = useTheme();

	const [deleteItem, deleteItemResults] = useDeleteSavedPostMutation();

	useEffect(() => {
		if (deleteItemResults.isError) {
			const message = typeof deleteItemResults.error === "string" ? deleteItemResults.error : deleteItemResults.error.message;
			toast.error(message);
		} else if (deleteItemResults.isSuccess) {
			toast.success(deleteItemResults.data.message);
		}
	}, [deleteItemResults.isLoading, deleteItemResults.isSuccess, deleteItemResults.isError]);

	const [openCollectionModal, setOpenCollectionModal] = useState(false);
	const [openShareModal, setOpenShareModal] = useState(false);

	const handleCollectionModal = () => {
		setOpenCollectionModal((prev) => !prev);
	};

	const handleShareModal = () => {
		setOpenShareModal((prev) => !prev);
	};

	const [report, reportResults] = useReportSavedItemMutation();

	useEffect(() => {
		if (reportResults.isError) {
			const message = typeof reportResults.error === "string" ? reportResults.error : reportResults.error.message;
			toast.error(message);
		} else if (reportResults.isSuccess) {
			toast.success(reportResults.data.message);
		}
	}, [reportResults.isLoading, reportResults.isSuccess, reportResults.isError]);

	const handleReporting = () => {
		if (item && user) {
			report({
				postId: item.content._id,
				userId: user._id
			});
		}
	};

	return (
		<div className="rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
			<div className="px-4 py-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
				<div className="size-full bg-gray-200 flex flex-col justify-center items-center">{dynamicPostContentDisplay(item.content?.type, item?.content)}</div>
				<div className="size-full md:col-span-2 xl:col-span-3">
					<div className="divide-y divide-gray-200  rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div className="px-4 py-1.5 sm:px-6 flex justify-between items-center">
							<span className="text-xl font-bold truncate">{item.content?.caption ?? item.content?.message}</span>
							<div className="">
								<Menu as="div" className="relative">
									<MenuButton className={classNames(buttonVariants({ variant: "ghostBtn" }), "bg-gray-300! hover:bg-green-500! group cursor-pointer")}>
										<EllipsisHorizontalIcon aria-hidden="true" className="size-5 text-gray-900 group-hover:text-white" />
									</MenuButton>
									<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
										<MenuItem>
											<button onClick={handleCollectionModal} className={classNames(buttonVariants({ variant: "greenBtn" }))}>
												change collection
											</button>
										</MenuItem>
										<MenuItem>
											<button onClick={handleReporting} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
												report
											</button>
										</MenuItem>
										<MenuItem>
											<button onClick={() => deleteItem({ itemId: item?._id, userId: user?._id })} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
												delete
											</button>
										</MenuItem>
									</MenuItems>
								</Menu>
							</div>
						</div>
						<div className="px-4 sm:px-6 flex justify-start items-center gap-1.5">
							<div className={classNames(theme.sectionNavbar.root, "size-9 rounded-full overflow-clip p-0.5")}>
								<ImageCard
									image={item.content?.creator?.image}
									settings={{
										alt: "image of the saved content's creator",
										styles: {
											image: "object-cover object-center",
											background: "size-full rounded-full "
										}
									}}
								/>
							</div>
							<div className="flex justify-start items-center gap-1.5">
								<div className="text-sm text-gray-500">saved from</div>
								<div className="capitalize text-sm font-medium">
									{item.content?.creator?.firstName} {item.content?.creator?.lastName}
								</div>
							</div>
						</div>
						<div className="px-4 py-4 sm:px-6">
							<div className="xl:w-2/5 flex justify-evenly items-center gap-2">
								{!item?.location && (
									<div className="flex-3">
										<button onClick={handleCollectionModal} className={classNames(buttonVariants({ variant: "blueBtn" }), "w-full cursor-pointer")}>
											add to collection
										</button>
									</div>
								)}
								<div className={classNames(item.location && "flex-1")}>
									<button onClick={handleShareModal} className={classNames(buttonVariants({ variant: "ghostBtn" }), "bg-gray-300! hover:bg-green-500! group cursor-pointer w-full")}>
										<IoArrowRedoOutline className="size-5 cursor-pointer group-hover:text-white" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden">
				<ManageCollections open={openCollectionModal} closingFunction={handleCollectionModal} savedItem={item} />
				<SharePost open={openShareModal} closingFunction={handleShareModal} post={item?.content} />
			</div>
		</div>
	);
}
