"use client";

import { nanoid } from "nanoid";
import React, { useState } from "react";
import ImageCard from "../cards/ImageCard";
import { dynamicPostContentDisplay, formatPostDate } from "@/app/lib/util/frontend";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "../shadcn/button";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { Fade, Popper } from "@mui/material";
import { ChatBubbleBottomCenterTextIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { IoArrowRedoOutline } from "react-icons/io5";
import { EMOJI_MAP } from "@/app/lib/util/frontend/variables";

export default function PostCardSkeleton({ post }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const options = [
		{
			id: nanoid(),
			name: "",
			icon: ""
		},
		{
			id: nanoid(),
			name: "",
			icon: ""
		},

		{
			id: nanoid(),
			name: "",
			icon: ""
		}
	];

	const user = useAtomValue(currentUser);

	const [anchorEl, setAnchorEl] = useState(null);

	const handlePopperOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopperClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const [reaction, setReaction] = useState(null);

	const reactionEmojies = (type) => {
		if (reaction && post._id.toString() === reaction.post.toString()) {
			return (
				<button onClick={() => handlePostReaction(type)} className="hover:scale-125 transition text-2xl cursor-pointer">
					{EMOJI_MAP[type]}
				</button>
			);
		} else {
			return (
				<button onClick={() => handlePostReaction("like")} className="hover:scale-125 transition text-2xl cursor-pointer">
					<HandThumbUpIcon className="size-6 cursor-pointer" />
				</button>
			);
		}
	};

	return (
		<div className="divide-y divide-gray-200 rounded-lg shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 bg-gray-300 animate-pulse">
			<div className="px-4 py-3.5 sm:px-6 flex flex-col justify-evenly">
				<div className="flex justify-between items-center">
					<div className="flex justify-evenly items-center gap-2.5">
						<div className="border border-gray-400 size-10 rounded-full overflow-clip">
							<ImageCard
								image={post?.creator?.image}
								settings={{
									alt: "post creator",
									styles: {
										image: "object-contain object-center",
										background: "size-full bg-gray-200"
									}
								}}
							/>
						</div>
						<div className="flex-auto">
							<p className="capitalize text-sm font-medium h-5 bg-gray-200 w-30 rounded-md">
								{post?.creator?.firstName} {post?.creator?.lastName}
							</p>
							<p className="capitalize text-sm font-medium text-gray-100">{formatPostDate(new Date())}</p>
						</div>
					</div>

					<div className="flex justify-evenly items-center gap-1">
						<div className="size-full">
							<Menu as="div" className="relative sm:block">
								<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
									<EllipsisHorizontalIcon aria-hidden="true" className="w-5 text-gray-900" />
								</MenuButton>
								<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
									{options.map((option) => (
										<MenuItem key={option.id}>
											<button className={classNames(buttonVariants({ variant: "ghostBtn" }), "hover:bg-blue-500 hover:text-white")}>{option?.name}</button>
										</MenuItem>
									))}
								</MenuItems>
							</Menu>
						</div>
						{post?.creator?._id === user?._id && (
							<div className="size-full">
								<button className={classNames(buttonVariants({ variant: "grayCircularBtn" }), "hover:bg-red-500 hover:text-white")}>
									<XMarkIcon className="size-6" />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="h-36"></div>
			<div className="px-4 py-4 sm:px-6 flex justify-between items-center">
				<dl className="flex justify-evenly items-center gap-2.5">
					<div className="flex justify-evenly items-center gap-1 text-gray-100">
						<dt className="relative" onMouseEnter={handlePopperOpen} onMouseLeave={handlePopperClose}>
							{reactionEmojies("like")}
							<Popper open={open} anchorEl={anchorEl} placement="top-start" transition>
								{({ TransitionProps }) => (
									<Fade {...TransitionProps} timeout={200}>
										<div className="rounded-full px-3 py-2 shadow-xl border border-gray-300 bg-white">
											<div className="flex items-center gap-2">
												<button className="hover:scale-125 transition text-2xl cursor-pointer">👍</button>

												<button className="hover:scale-125 transition text-2xl cursor-pointer">👎</button>

												<button className="hover:scale-125 transition text-2xl cursor-pointer">❤️</button>

												<button className="hover:scale-125 transition text-2xl cursor-pointer">😂</button>

												<button className="hover:scale-125 transition text-2xl cursor-pointer">😮</button>

												<button className="hover:scale-125 transition text-2xl cursor-pointer">😢</button>

												<button className="hover:scale-125 transition text-2xl cursor-pointer">😡</button>
											</div>
										</div>
									</Fade>
								)}
							</Popper>
						</dt>
						<dd>{post?.totalReactions ?? 0}</dd>
					</div>
					<div className="flex justify-evenly items-center gap-1 text-gray-100">
						<dt>
							<ChatBubbleBottomCenterTextIcon className="size-6 cursor-pointer" />
						</dt>
						<dd>{post?.commentCount ?? 0}</dd>
					</div>
					<div className="flex justify-evenly items-center gap-1 text-gray-100">
						<dt>
							<IoArrowRedoOutline className="size-6 cursor-pointer" />
						</dt>
						<dd>{post?.shareCount ?? 0}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
