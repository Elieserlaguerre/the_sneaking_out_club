"use client";
import { useLazyGetCommentRepliesQuery, useReactToCommentMutation } from "@/app/lib/redux/data-fetching/global-api";
import { Fade, Popper } from "@mui/material";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { formatPostDate } from "@/app/lib/util/frontend";
import { EllipsisVerticalIcon, FaceFrownIcon, HandThumbDownIcon, HandThumbUpIcon, HeartIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "../shadcn/button";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import toast from "react-hot-toast";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaSurprise } from "react-icons/fa";
import { BsEmojiAngryFill } from "react-icons/bs";
import { FaLaughBeam } from "react-icons/fa";
import ResponseCard from "./ResponseCard";

export default function CommentCard({ comment }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const [popperData, setPopperData] = useState({
		anchor: null,
		commentId: null
	});

	const handlePopperOpen = (event, commentId) => {
		setPopperData({
			anchor: event.currentTarget,
			commentId
		});
	};

	const handlePopperClose = () => {
		setPopperData({
			anchor: null,
			commentId: null
		});
	};

	const [createReaction, createReactionResults] = useReactToCommentMutation();

	useEffect(() => {
		if (createReactionResults.isError) {
			const message = typeof createReactionResults.error === "string" ? createReactionResults.error : createReactionResults.error.message;
			toast.error(message);
		} else if (createReactionResults.isSuccess) {
			// toast.success(createReactionResults.data.message);
		}
	}, [createReactionResults.isLoading, createReactionResults.isSuccess, createReactionResults.isError]);

	const handlePostReaction = (reaction, comment) => {
		createReaction({ type: reaction, user: user?._id, userType: user?.docType, comment });
	};

	const selectedReactions = (comment) => {
		const type = comment?.reaction?.type;
		if (type) {
			return (
				<button type="button" onClick={() => handlePostReaction(type, comment._id)} className={classNames(type === "like" ? "text-blue-500" : type === "dislike" ? "text-yellow-500" : type === "love" ? "text-red-500" : type === "laugh" ? "text-yellow-400" : type === "wow" ? "text-yellow-500" : type === "sad" ? "text-orange-500" : type === "angry" ? "text-red-500" : null, "text-left capitalize text-sm font-medium cursor-pointer hover:underline")}>
					{comment?.reaction?.type}
				</button>
			);
		} else {
			return (
				<button type="button" onClick={() => handlePostReaction("like", comment._id)} className="text-left capitalize text-sm font-medium text-gray-600 cursor-pointer hover:underline">
					like
				</button>
			);
		}
	};

	const [reply, setReply] = useState(false);

	const replyToComment = () => {
		setReply((prev) => !prev);
	};

	const pageSizes = [
		{
			id: nanoid(),
			value: 10
		},
		{
			id: nanoid(),
			value: 20
		},
		{
			id: nanoid(),
			value: 30
		},
		{
			id: nanoid(),
			value: 40
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

	const [replies, setReplies] = useState([]);
	const [openResponseContainer, setOpenResponseContainer] = useState(false);

	const [getReplies, getRepliesResults] = useLazyGetCommentRepliesQuery();

	useEffect(() => {
		if (getRepliesResults.isError) {
			const message = typeof getRepliesResults.error === "string" ? getRepliesResults.error : getRepliesResults.error.message;
			toast.error(message);
		} else if (getRepliesResults.isSuccess) {
			// toast.success(getRepliesResults.data.message);
			const { results } = getRepliesResults.data;
			setOpenResponseContainer(true);
			setTotalPages(results?.totalPages ?? 0);
			setReplies(results?.comments ?? []);
		}
	}, [getRepliesResults.isFetching, getRepliesResults.isSuccess, getRepliesResults.isError]);

	const handleReplyQueries = () => {
		getReplies({ post: comment.post, comment: comment._id, page, limit, filters: JSON.stringify(filters), userId: user._id });
	};

	const responsePrompts = (responseLength) => {
		if (responseLength > 1) {
			if (openResponseContainer === true) return <span>Get more resplies</span>;
			else return <span onClick={handleReplyQueries}>View all {responseLength} replies</span>;
		} else {
			if (openResponseContainer === true) return <span onClick={() => setOpenResponseContainer(false)}>Hide response</span>;
			return <span onClick={handleReplyQueries}>View response</span>;
		}
	};

	return (
		<div className="size-full flex justify-between items-start gap-1.5">
			<div className="size-9 border border-gray-500 rounded-full flex justify-center items-center overflow-clip">
				<ImageCard
					image={comment?.creator?.image}
					settings={{
						alt: "commentor's image",
						styles: {
							image: "object-contain object-center",
							background: "bg-gray-300"
						}
					}}
				/>
			</div>
			<div className="w-full">
				<div className="flex justify-between items-center group">
					<div className="bg-gray-200 p-1 rounded-md flex-auto">
						<div className="capitalize font-medium text-sm text-nowraps text-left">
							{comment.creator.firstName} {comment.creator.lastName}
						</div>
						<div className="text-left">{comment.message}</div>
					</div>
					<div className="w-5">
						<Menu as="div" className="relative hidden group-hover:block">
							<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
								<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
							</MenuButton>
							<MenuItems transition className="absolute right-0 z-20 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
								<MenuItem>
									<button className={classNames(buttonVariants({ variant: "blueBtn" }))}>report comment</button>
								</MenuItem>
								{openResponseContainer && (
									<MenuItem>
										<button onClick={() => setOpenResponseContainer(false)} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
											hide responses
										</button>
									</MenuItem>
								)}

								{comment.creator._id === user._id && (
									<MenuItem>
										<button className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>delete comment </button>
									</MenuItem>
								)}
							</MenuItems>
						</Menu>
					</div>
				</div>
				<div className="p-1 rounded-md flex justify-between items-center gap-3">
					<div className="flex gap-3 justify-start items-center">
						<div className="text-left capitalize text-sm font-medium text-gray-600 cursor-pointer hover:underline">{formatPostDate(comment.createdAt, { comments: true })}</div>
						<div className="raltive" onMouseEnter={(e) => handlePopperOpen(e, comment._id)} onMouseLeave={handlePopperClose}>
							<div className="text-left capitalize text-sm font-medium text-gray-600 cursor-pointer hover:underline relative">
								{selectedReactions(comment)}
								<Popper open={popperData.commentId === comment._id} anchorEl={popperData.anchor} placement="top-start" transition className="z-20">
									{({ TransitionProps }) => (
										<Fade {...TransitionProps} timeout={200}>
											<div className="rounded-full px-3 py-2 shadow-xl border border-gray-300 bg-white">
												<div className="flex items-center gap-2">
													<button type="button" onClick={() => handlePostReaction("like", comment._id)} className="hover:scale-125 transition text-2xl cursor-pointer">
														👍
													</button>

													<button type="button" onClick={() => handlePostReaction("dislike", comment._id)} className="hover:scale-125 transition text-2xl cursor-pointer">
														👎
													</button>

													<button type="button" onClick={() => handlePostReaction("love", comment._id)} className="hover:scale-125 transition text-2xl cursor-pointer">
														❤️
													</button>

													<button type="button" onClick={() => handlePostReaction("laugh", comment._id)} className="hover:scale-125 transition text-2xl cursor-pointer">
														😂
													</button>

													<button type="button" onClick={() => handlePostReaction("wow", comment._id)} className="hover:scale-125 transition text-2xl cursor-pointer">
														😮
													</button>

													<button type="button" onClick={() => handlePostReaction("sad", comment._id)} className="hover:scale-125 transition text-2xl cursor-pointer">
														😢
													</button>

													<button type="button" onClick={() => handlePostReaction("angry", comment._id)} className="hover:scale-125 transition text-2xl cursor-pointer">
														😡
													</button>
												</div>
											</div>
										</Fade>
									)}
								</Popper>
							</div>
						</div>
						<div onClick={replyToComment} className="text-left capitalize text-sm font-medium text-gray-600 cursor-pointer hover:underline">
							reply
						</div>
					</div>

					{comment?.totalReactions > 0 && (
						<div className="flex justify-evenly items-center gap-0.5">
							<div className={classNames("text-sm text-gray-600 font-medium")}>{comment.totalReactions}</div>
							<div className="flex justify-start items-center">
								{comment.reactionCounts.like > 0 && (
									<button className={classNames(buttonVariants({ variant: "blueCircularBtn" }), "text-sm text-gray-600 font-medium border border-white -mr-2.5 z-16")}>
										<HandThumbUpIcon className="size-3" />
									</button>
								)}
								{comment.reactionCounts.dislike > 0 && (
									<button className={classNames(buttonVariants({ variant: "redCircularBtn" }), "text-sm text-gray-600 font-medium border border-white -mr-2.5 z-15")}>
										<HandThumbDownIcon className="size-3" />
									</button>
								)}
								{comment.reactionCounts.love > 0 && (
									<button className={classNames(buttonVariants({ variant: "redCircularBtn" }), "text-sm text-gray-600 font-medium border border-white -mr-2.5 z-14")}>
										<HeartIcon className="size-3" />
									</button>
								)}
								{comment.reactionCounts.laugh > 0 && (
									<button className={classNames(buttonVariants({ variant: "yellowCircularBtn" }), "text-sm text-gray-600 font-medium border border-white -mr-2.5 z-13")}>
										<FaLaughBeam className="size-3" />
									</button>
								)}
								{comment.reactionCounts.wow > 0 && (
									<button className={classNames(buttonVariants({ variant: "yellowCircularBtn" }), "text-sm text-gray-900 font-medium border border-white -mr-2.5 z-12")}>
										<FaSurprise className="size-3 fill-white" />
									</button>
								)}
								{comment.reactionCounts.sad > 0 && (
									<button className={classNames(buttonVariants({ variant: "yellowCircularBtn" }), "text-sm text-gray-900 font-medium border border-white -mr-2.5 z-11 ")}>
										<FaceFrownIcon className="size-3" />
									</button>
								)}
								{comment.reactionCounts.angry > 0 && (
									<button className={classNames(buttonVariants({ variant: "redCircularBtn" }), "text-sm text-gray-900 font-medium border border-white -mr-2.5")}>
										<BsEmojiAngryFill className="size-3" />
									</button>
								)}
							</div>
						</div>
					)}
				</div>
				{reply && (
					<div className="ml-8 mt-4 group">
						<ResponseCard comment={comment} cancelFunction={replyToComment} />
					</div>
				)}
				{comment.responseCount > 0 && (
					<div className="rounded-lg bg-white shadow-sm mt-2">
						{openResponseContainer && (
							<div className="px-4 py-5 sm:p-6 flex flex-col gap-1.5">
								{replies?.map((comment) => (
									<CommentCard key={comment._id} comment={comment} />
								))}
							</div>
						)}
						<div className="text-left text-sm font-medium text-gray-600 cursor-pointer hover:underline">{responsePrompts(replies.length)}</div>
					</div>
				)}
			</div>
		</div>
	);
}
