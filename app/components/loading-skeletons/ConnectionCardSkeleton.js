import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon, EllipsisVerticalIcon, EnvelopeIcon, HeartIcon, MinusIcon, PhoneIcon, PlusIcon, UserMinusIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect } from "react";
import { buttonVariants } from "../shadcn/button";
import { format } from "date-fns";
import { useDeleteFamilyMemberMutation, useManageFavoriteConnectionsMutation, useSendFriendRequestMutation, useUnfriendMutation } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { useTheme } from "../providers/ThemeProvider";
import { nanoid } from "nanoid";
import Link from "next/link";
import ImageCard from "../cards/ImageCard";

export default function ConnectionCardSkeleton({ connection, editFunction, settings }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<div className="rounded-lg text-center p-8 shadow-md shadow-gray-400 dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400 aspect-square group relative bg-gray-300 animate-pulse">
			{connection?.favored && (
				<div className="p-2 flex justify-center items-center absolute top-0 left-0 px-4 py-5 sm:px-6">
					<HeartIcon className="text-red-500 size-6 animate-ping" />
				</div>
			)}
			<div className="absolute top-0 right-0 left-0 px-4 py-5 sm:px-6 hidden group-hover:flex justify-end items-center">
				<Menu as="div" className="relative">
					<MenuButton className={classNames(buttonVariants({ variant: "blueCircularBtn" }))}>
						<EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
					</MenuButton>
					<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
						<MenuItem>
							<button className={classNames(buttonVariants({ variant: "ghostBtn" }), "hover:bg-blue-500 hover:text-white")} />
						</MenuItem>
						<MenuItem>
							<button className={classNames(buttonVariants({ variant: "ghostBtn" }), "hover:bg-blue-500 hover:text-white")} />
						</MenuItem>
						<MenuItem>
							<button className={classNames(buttonVariants({ variant: "ghostBtn" }), "hover:bg-blue-500 hover:text-white")} />
						</MenuItem>
					</MenuItems>
				</Menu>
			</div>
			<div className="px-4">
				<ImageCard
					image={connection?.member?.image ?? connection?.image}
					settings={{
						alt: "family connection image",
						styles: {
							image: "object-contain object-center",
							background: "mx-auto size-32 shrink-0 rounded-full bg-gray-200 outline -outline-offset-1 outline-black/5 dark:bg-gray-700 dark:outline-white/10 aspect-square"
						}
					}}
				/>
			</div>
			<div className="px-4 shink mt-2.5">
				<dl className="size-full flex flex-col justify-evenly items-center text-sm">
					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">relation</dt>
						<dd className="capitalize">{(connection?.member?.online ?? connection?.online) ? <span className="inline-flex items-center rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-500/10 dark:text-green-500 dark:inset-ring-green-500/10 animate-pulse h-5 w-14" /> : <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 inset-ring inset-ring-gray-600/20 dark:bg-gray-500/10 dark:text-gray-500 dark:inset-ring-gray-500/10 h-5 w-14" />}</dd>
					</div>
					<div className="w-full mt-2">
						<dt className="sr-only capitalize font-semibold">name</dt>
						<dd className="capitalize flex justify-center items-center gap-2.5">
							<div className="h-5 w-10 bg-gray-200 rounded-md flex-auto" />
							<div className="h-5 w-10 bg-gray-200 rounded-md flex-auto" />
						</dd>
					</div>
					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">nationality</dt>
						<dd className="capitalize h-5 w-28 bg-gray-200 rounded-md mx-auto mt-3" />
					</div>
				</dl>
			</div>
		</div>
	);
}
