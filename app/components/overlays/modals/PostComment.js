"use client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ImageCard from "../../cards/ImageCard";
import { useTheme } from "../../providers/ThemeProvider";
import { commentSchema } from "@/app/lib/util/global/zod-validations";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { useCreateCommentMutation, useLazyGetPostCommentsQuery, useReactToCommentMutation } from "@/app/lib/redux/data-fetching/global-api";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";
import { fromZodError } from "zod-validation-error";
import CommentCard from "../../cards/CommentCard";

export default function PostComment({ post, open, closingFunction }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const user = useAtomValue(currentUser);

	const dynamicContentDisplay = (type) => {
		switch (type) {
			case "text":
				return <p className="text gray-900">{post?.caption}</p>;
			case "image":
				break;
			case "video":
				break;
			default:
				throw new Error("Post type not recognized.");
		}
	};

	const [formContent, setFormContent] = useState({
		post: "",
		message: "",
		creator: "",
		creatorType: ""
	});

	const clearForm = () => {
		setFormContent({
			post: post?._id,
			message: "",
			creator: user?._id,
			creatorType: user?.docType
		});
	};

	useEffect(() => {
		if (user) {
			setFormContent((content) => ({
				...content,
				post: post._id,
				creator: user._id,
				creatorType: user.docType
			}));
		}
	}, [user, post]);

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;
		setFormContent((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = commentSchema.safeParse(formContent);

		if (validation.success) {
			createComment(validation.data);
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	const [createComment, createCommentResults] = useCreateCommentMutation();

	useEffect(() => {
		if (createCommentResults.isError) {
			const message = typeof createCommentResults.error === "string" ? createCommentResults.error : createCommentResults.error.message;
			toast.error(message);
		} else if (createCommentResults.isSuccess) {
			// toast.success(createCommentResults.data.message);
			clearForm();
		}
	}, [createCommentResults.isLoading, createCommentResults.isSuccess, createCommentResults.isError]);

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

	const [comments, setComments] = useState([]);

	const [getComments, getCommentsResults] = useLazyGetPostCommentsQuery();

	useEffect(() => {
		if (getCommentsResults.isError) {
			const message = typeof getCommentsResults.error === "string" ? getCommentsResults.error : getCommentsResults.error.message;
			toast.error(message);
		} else if (getCommentsResults.isSuccess) {
			// toast.success(getCommentsResults.data.message);

			const { results } = getCommentsResults.data;

			setTotalPages(results?.totalPages ?? 0);
			setComments(results?.comments ?? []);
		}
	}, [getCommentsResults.isFetching, getCommentsResults.isSuccess, getCommentsResults.isError]);

	useEffect(() => {
		if (open === true) {
			getComments({ post: post?._id, page, limit, filters: JSON.stringify(filters), userId: user?._id });
		}
	}, [post, open, user]);

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

	return (
		<Dialog open={open} onClose={closingFunction} className="z-10">
			<DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50" />

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel transition className="overflow-hidden transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10 h-[85vh] flex flex-col">
						<form onSubmit={handleSubmit} className="flex-auto flex flex-col divide-y divide-gray-300 size-full">
							<div className={classNames(theme.sectionNavbar.root, "p-4 rounded-t-md flex justify-between items-center")}>
								<DialogTitle as="h3" className={classNames(theme.text.navbar, "text-base font-semibold text-center capitalize flex-auto")}>
									{`${post.creator.firstName} ${post.creator.lastName}'s`} post
								</DialogTitle>
								<button type="button" data-autofocus onClick={closingFunction} className={classNames(buttonVariants({ variant: "WhiteCircularBtn" }), "hover:bg-red-500 hover:text-white")}>
									<XMarkIcon />
								</button>
							</div>
							<div className="mt-3 text-center sm:mt-5 flex-auto overflow-y-auto flex flex-col divide-y divide-gray-300">
								{post?.type !== "text" && post?.caption && (
									<div className="px-4 py-5 sm:px-6">
										<p>{post.caption}</p>
									</div>
								)}
								<div className="px-4 py-5 sm:p-6 flex flex-col justify-center items-center min-h-52">{dynamicContentDisplay(post?.type)}</div>
								<div className="px-4 py-4 sm:px-6">
									<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
										{comments.map((comment) => (
											<li key={comment?._id} className="py-4">
												<CommentCard comment={comment} />
											</li>
										))}
									</ul>
								</div>
							</div>
							{/* footer */}
							<div className="mt-5 sm:mt-6 sm:px-6 flex justify-between items-center gap-x-6 bg-white w-full">
								<div className="border border-gray-500 size-10 rounded-full overflow-clip">
									<ImageCard
										image={post?.creator?.image}
										settings={{
											alt: "user image",
											styles: {
												image: "object-contain object-center object-center",
												background: "size-full bg-gray-300"
											}
										}}
									/>
								</div>
								<div className="flex-auto">
									<input onChange={handleChanges} type="text" name="message" id="comment" value={formContent?.message} className="bg-gray-200 rounded-full w-full px-2.5 py-3.5 h-full" placeholder={`Comment as ${post.creator.firstName} ${post?.creator?.lastName}`} />
								</div>
								<div className="flex justify-evenly items-center gap-1.5">
									<button type="submit">
										<PaperAirplaneIcon className="size-8 fill-gray-500 cursor-pointer hover:fill-green-500" />
									</button>
								</div>
							</div>
						</form>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
