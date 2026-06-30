"use client";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "../shadcn/button";
import { ChatBubbleBottomCenterTextIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { IoArrowRedoOutline } from "react-icons/io5";
import { nanoid } from "nanoid";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { Popper, Fade } from "@mui/material";
import toast from "react-hot-toast";
import { useDeletePostMutation, useReactToPostMutation, useSavePostMutation } from "@/app/lib/redux/data-fetching/global-api";
import { EMOJI_MAP } from "@/app/lib/util/frontend/variables";
import PostComment from "../overlays/modals/PostComment";
import { dynamicPostContentDisplay, formatPostDate } from "@/app/lib/util/frontend";
import SharePost from "../overlays/modals/SharePost";

export default function PostCard({ post }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const existingConnection = user?.connections?.some((connection) => connection?.member?.toString() === post?.creator?._id?.toString());

	const options = [
		{
			id: nanoid(),
			name: "save post",
			icon: ""
		},
		{
			id: nanoid(),
			name: "hide post",
			icon: ""
		},

		{
			id: nanoid(),
			name: "report post",
			icon: ""
		}
	];

	const [menuOptions, setMenuOptions] = useState(options);

	const isOwner = user?._id?.toString() === post?.creator?._id;

	useEffect(() => {
		if (user) {
			setMenuOptions((options) =>
				options.map((option) => {
					if (!isOwner) {
						return (
							{
								id: nanoid(),
								name: existingConnection ? `unfollow ${user?.firstName}` : `follow ${user?.firstName}`,
								icon: ""
							},
							{
								id: nanoid(),
								name: `block ${post?.creator?.firstName}`,
								icon: ""
							}
						);
					}

					return option;
				})
			);
		}
	}, [user, post]);

	const [anchorEl, setAnchorEl] = useState(null);

	const handlePopperOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopperClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const [reaction, setReaction] = useState(null);

	const [postReaction, postReactionResults] = useReactToPostMutation();

	useEffect(() => {
		if (postReactionResults.isError) {
			const message = typeof postReactionResults.error === "string" ? postReactionResults.error : postReactionResults.error.message;
			toast.error(message);
		} else if (postReactionResults.isSuccess) {
			// toast.success(postReactionResults.data.message);
			const { results } = postReactionResults.data;
			setReaction(results);
		}
	}, [postReactionResults.isLoading, postReactionResults.isSuccess, postReactionResults.isError]);

	const handlePostReaction = (reaction) => {
		postReaction({ type: reaction, user: user?._id, userType: user?.docType, post: post._id });
	};

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

	useEffect(() => {
		if (post.reaction) {
			setReaction(post.reaction);
		}
	}, [post]);

	const [savePost, savePostResults] = useSavePostMutation();

	useEffect(() => {
		if (savePostResults.isError) {
			const message = typeof savePostResults.error === "string" ? savePostResults.error : savePostResults.error.message;
			toast.error(message);
		} else if (savePostResults.isSuccess) {
			toast.success(savePostResults.data.message);
		}
	}, [savePostResults.isLoading, savePostResults.isSuccess, savePostResults.isError]);

	const handleMenuOptions = (option) => {
		switch (option) {
			case "save post":
				savePost({ user: user._id, userType: user.docType, content: post._id, contentType: post.docType });
				break;
			case "hide post":
				break;
			case "report post":
				break;
			default:
				break;
		}
	};

	const [openCommentModal, setOpenCommentModal] = useState(false);

	const openComments = () => {
		setOpenCommentModal(true);
	};

	const closeComments = () => {
		setOpenCommentModal(false);
	};

	const [openShareModal, setOpenShareModal] = useState(false);

	const handlePostSharing = () => {
		setOpenShareModal((prev) => !prev);
	};

	const [deletePost, deletePostResults] = useDeletePostMutation();

	useEffect(() => {
		if (deletePostResults.isError) {
			const message = typeof deletePostResults.error === "string" ? deletePostResults.error : deletePostResults.error.message;
			toast.error(message);
		} else if (deletePostResults.isSuccess) {
			toast.success(deletePostResults.data.message);
		}
	}, [deletePostResults.isLoading, deletePostResults.isSuccess, deletePostResults.isError]);

	const handlePostDeletion = () => {
		deletePost({ postId: post._id, userId: user._id });
	};

	return (
		<div className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
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
										background: "size-full bg-gray-300"
									}
								}}
							/>
						</div>
						<div className="flex-auto">
							<p className="capitalize text-sm font-medium">
								{post?.creator?.firstName} {post?.creator?.lastName}
							</p>
							<p className="capitalize text-sm font-medium">{formatPostDate(post.createdAt)}</p>
						</div>
					</div>

					<div className="flex justify-evenly items-center gap-1">
						<div className="size-full">
							<Menu as="div" className="relative sm:block">
								<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
									<EllipsisHorizontalIcon aria-hidden="true" className="w-5 text-gray-900" />
								</MenuButton>
								<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
									{menuOptions.map((option) => (
										<MenuItem key={option.id}>
											<button onClick={() => handleMenuOptions(option?.name)} className={classNames(buttonVariants({ variant: "ghostBtn" }), "hover:bg-blue-500 hover:text-white")}>
												{option?.name}
											</button>
										</MenuItem>
									))}
								</MenuItems>
							</Menu>
						</div>
						{post?.creator?._id === user?._id && (
							<div className="size-full">
								<button onClick={handlePostDeletion} className={classNames(buttonVariants({ variant: "grayCircularBtn" }), "hover:bg-red-500 hover:text-white")}>
									<XMarkIcon className="size-6" />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="">{dynamicPostContentDisplay(post.type, post)}</div>
			<div className="px-4 py-4 sm:px-6 flex justify-between items-center">
				<dl className="flex justify-evenly items-center gap-2.5">
					<div className="flex justify-evenly items-center gap-1">
						<dt className="relative" onMouseEnter={handlePopperOpen} onMouseLeave={handlePopperClose}>
							{reactionEmojies(reaction?.type)}
							<Popper open={open} anchorEl={anchorEl} placement="top-start" transition>
								{({ TransitionProps }) => (
									<Fade {...TransitionProps} timeout={200}>
										<div className="rounded-full px-3 py-2 shadow-xl border border-gray-300 bg-white">
											<div className="flex items-center gap-2">
												<button onClick={() => handlePostReaction("like")} className="hover:scale-125 transition text-2xl cursor-pointer">
													👍
												</button>

												<button onClick={() => handlePostReaction("dislike")} className="hover:scale-125 transition text-2xl cursor-pointer">
													👎
												</button>

												<button onClick={() => handlePostReaction("love")} className="hover:scale-125 transition text-2xl cursor-pointer">
													❤️
												</button>

												<button onClick={() => handlePostReaction("laugh")} className="hover:scale-125 transition text-2xl cursor-pointer">
													😂
												</button>

												<button onClick={() => handlePostReaction("wow")} className="hover:scale-125 transition text-2xl cursor-pointer">
													😮
												</button>

												<button onClick={() => handlePostReaction("sad")} className="hover:scale-125 transition text-2xl cursor-pointer">
													😢
												</button>

												<button onClick={() => handlePostReaction("angry")} className="hover:scale-125 transition text-2xl cursor-pointer">
													😡
												</button>
											</div>
										</div>
									</Fade>
								)}
							</Popper>
						</dt>
						<dd>{post?.totalReactions ?? 0}</dd>
					</div>
					<div className="flex justify-evenly items-center gap-1">
						<dt onClick={openComments}>
							<ChatBubbleBottomCenterTextIcon className="size-6 cursor-pointer" />
						</dt>
						<dd>{post?.commentCount ?? 0}</dd>
					</div>
					<div className="flex justify-evenly items-center gap-1">
						<dt onClick={handlePostSharing}>
							<IoArrowRedoOutline className="size-6 cursor-pointer" />
						</dt>
						<dd>{post?.shareCount ?? 0}</dd>
					</div>
				</dl>
				<div className="hidden">
					<PostComment post={post} open={openCommentModal} closingFunction={closeComments} />
					<SharePost open={openShareModal} closingFunction={handlePostSharing} post={post} />
				</div>
			</div>
		</div>
	);
}
