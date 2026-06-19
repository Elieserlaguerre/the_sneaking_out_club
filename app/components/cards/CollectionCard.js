"use client";
import React, { useEffect } from "react";
import { useTheme } from "../providers/ThemeProvider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "../shadcn/button";
import { getInitials } from "@/app/lib/util/global";
import ImageCard from "./ImageCard";
import { useDeleteCollectionMutation, useEditCollectionMutation } from "@/app/lib/redux/data-fetching/global-api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";

export default function CollectionCard({ collection, reset, edit }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const user = useAtomValue(currentUser);

	const [deleteCollection, deleteCollectionResults] = useDeleteCollectionMutation();

	useEffect(() => {
		if (deleteCollectionResults.isError) {
			const message = typeof deleteCollectionResults.error === "string" ? deleteCollectionResults.error : deleteCollectionResults.error.message;
			toast.error(message);
		} else if (deleteCollectionResults.isSuccess) {
			toast.success(deleteCollectionResults.data.message);

			reset();
		}
	}, [deleteCollectionResults.isLoading, deleteCollectionResults.isSuccess, deleteCollectionResults.isError]);

	const handleCollectionEdit = () => {
		edit(collection);
	};

	return (
		<div className="rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 cursor-pointer hover:bg-gray-200">
			<div className="px-4 py-5 sm:p-6 flex justify-start items-center gap-2.5">
				<div className={classNames(theme.base, "size-10 rounded-md flex justify-center items-center p-0.5")}>
					{collection?.image?.publicId ? (
						<ImageCard
							image={collection.image}
							settings={{
								alt: "collection's cover image",
								styles: {
									image: "object-contain object-center",
									background: "size-full"
								}
							}}
						/>
					) : (
						<span className={classNames(theme.text.primary, "font-bold")}>{getInitials(collection.name)}</span>
					)}
				</div>
				<div className="flex-1 px-0.5">
					<p className="capitalize font-medium truncate">{collection.name}</p>
				</div>
				<div>
					<Menu as="div" className="relative">
						<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400 bg-white">
							<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
						</MenuButton>
						<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
							<MenuItem>
								<button onClick={handleCollectionEdit} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
									Edit
								</button>
							</MenuItem>
							<MenuItem>
								<button onClick={() => deleteCollection({ collectionId: collection?._id, userId: user?._id, userType: user?.docType })} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
									delete
								</button>
							</MenuItem>
						</MenuItems>
					</Menu>
				</div>
			</div>
		</div>
	);
}
