import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon, EllipsisVerticalIcon, EnvelopeIcon, HeartIcon, MinusIcon, PhoneIcon, PlusIcon, UserMinusIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect } from "react";
import { buttonVariants } from "../shadcn/button";
import ImageCard from "./ImageCard";
import { format } from "date-fns";
import { useDeleteFamilyMemberMutation, useManageFavoriteConnectionsMutation, useSendFriendRequestMutation, useUnfriendMutation } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { useTheme } from "../providers/ThemeProvider";
import { nanoid } from "nanoid";
import Link from "next/link";

export default function ConnectionCard({ connection, editFunction, settings }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const options = [
		{
			id: nanoid(),
			label: "view profile",
			action: "view profile",
			button: buttonVariants({ variant: "ghostBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: null,
			type: "link",
			destination: `/view/profiles/${connection?.member?._id}/${connection?.member?.docType}`
		},
		settings?.connectionRequest && {
			id: nanoid(),
			label: "friend request",
			action: "friend request",
			button: buttonVariants({ variant: "ghostBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: UserPlusIcon,
			type: "button"
		},
		settings?.myConnections && {
			id: nanoid(),
			label: "add favorite",
			action: "add favorite",
			button: buttonVariants({ variant: "ghostBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: null,
			type: "button"
		},
		settings.myFavorites && {
			id: nanoid(),
			label: "remove favorite",
			action: "remove favorite",
			button: buttonVariants({ variant: "ghostBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: null,
			type: "button"
		},
		settings?.connectionRequest === false && {
			id: nanoid(),
			label: "unfriend",
			action: "unfriend",
			button: buttonVariants({ variant: "destructiveBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: UserMinusIcon,
			type: "button"
		}
	];

	const [sendFriendRequest, sendFriendRequestResults] = useSendFriendRequestMutation();

	useEffect(() => {
		if (sendFriendRequestResults.isError) {
			const message = typeof sendFriendRequestResults.error === "string" ? sendFriendRequestResults.error : sendFriendRequestResults.error.message;
			toast.error(message);
		} else if (sendFriendRequestResults.isSuccess) {
			toast.success(sendFriendRequestResults.data.message);
		}
	}, [sendFriendRequestResults.isLoading, sendFriendRequestResults.isSuccess, sendFriendRequestResults.isError]);

	const handleOptionSelection = (selection) => {
		switch (selection) {
			case "friend request":
				sendFriendRequest({ sender: user._id, senderType: user.docType, recipient: connection?.member?._id ?? connection?._id, recipientType: connection?.member?.docType ?? connection?.docType, event: "FRIEND_REQUEST" });
				break;
			case "add favorite":
				manageFavor({ userId: user._id, action: selection, connectionId: connection?.member?._id ?? connection?._id });
				break;
			case "remove favorite":
				manageFavor({ userId: user._id, action: selection, connectionId: connection?.member?._id ?? connection?._id });
				break;

			case "unfriend":
				unfriend({ userId: user._id, connectionId: connection?.member?._id ?? connection?._id });
				break;
			default:
				throw new Error("selection is not authorized.");
		}
	};

	const [manageFavor, manageFavorResults] = useManageFavoriteConnectionsMutation();

	useEffect(() => {
		if (manageFavorResults.isError) {
			const message = typeof manageFavorResults.error === "string" ? manageFavorResults.error : manageFavorResults.error.message;
			toast.error(message);
		} else if (manageFavorResults.isSuccess) {
			toast.success(manageFavorResults.data.message);
		}
	}, [manageFavorResults.isLoading, manageFavorResults.isSuccess, manageFavorResults.isError]);

	const [unfriend, unfriendResults] = useUnfriendMutation();

	useEffect(() => {
		if (unfriendResults.isError) {
			const message = typeof unfriendResults.error === "string" ? unfriendResults.error : unfriendResults.error.message;
			toast.error(message);
		} else if (unfriendResults.isSuccess) {
			toast.success(unfriendResults.data.message);
		}
	}, [unfriendResults.isLoading, unfriendResults.isSuccess, unfriendResults.isError]);

	return (
		<div className="rounded-lg bg-white text-center p-8 shadow-md shadow-gray-400 dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400 aspect-square group relative">
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
						{options.map((option) => {
							if (option.type === "link") {
								return (
									<MenuItem key={option?.id ?? nanoid()}>
										<Link href={option?.destination} className={classNames(option?.button, option?.hover)}>
											{option?.icon && <option.icon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />}
											{option?.label}
										</Link>
									</MenuItem>
								);
							} else {
								return (
									<MenuItem key={option?.id ?? nanoid()}>
										<button onClick={() => handleOptionSelection(option?.action)} className={classNames(option?.button, option?.hover)}>
											{option?.icon && <option.icon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />}
											{option?.label}
										</button>
									</MenuItem>
								);
							}
						})}
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
							background: "mx-auto size-32 shrink-0 rounded-full bg-gray-300 outline -outline-offset-1 outline-black/5 dark:bg-gray-700 dark:outline-white/10 aspect-square"
						}
					}}
				/>
			</div>
			<div className="px-4 shink mt-2.5">
				<dl className="size-full flex flex-col justify-evenly items-center text-sm">
					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">relation</dt>
						<dd className="capitalize">{(connection?.member?.online ?? connection?.online) ? <span className="inline-flex items-center rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-500/10 dark:text-green-500 dark:inset-ring-green-500/10 animate-pulse">online</span> : <span className="inline-flex items-center rounded-full bg-gray-300 px-2 py-1 text-xs font-medium text-gray-700 inset-ring inset-ring-gray-600/20 dark:bg-gray-500/10 dark:text-gray-500 dark:inset-ring-gray-500/10">offline</span>}</dd>
					</div>
					<div className="w-full mt-2">
						<dt className="sr-only capitalize font-semibold">name</dt>
						<dd className="capitalize">
							{connection?.member?.firstName ?? connection?.firstName} {connection?.member?.lastName ?? connection?.lastName}
						</dd>
					</div>
					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">nationality</dt>
						<dd className="capitalize">{connection?.member?.nationality ?? connection?.nationality}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
