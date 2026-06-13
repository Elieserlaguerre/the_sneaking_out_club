"use client";
import { useSharePostMutation } from "@/app/lib/redux/data-fetching/global-api";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { buttonVariants } from "../../shadcn/button";
import { useTheme } from "../../providers/ThemeProvider";
import ImageCard from "../../cards/ImageCard";
import { formatPostDate } from "@/app/lib/util/frontend";
import { nanoid } from "nanoid";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { sharePostSchema } from "@/app/lib/util/global/zod-validations";
import { fromZodError } from "zod-validation-error";
import { TextareaAutosize } from "@mui/material";

export default function SharePost({ open, closingFunction, post }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const shareTypes = [
		{
			id: nanoid(),
			name: "public",
			value: "public"
		},
		{
			id: nanoid(),
			name: "friends",
			value: "friends"
		},
		{
			id: nanoid(),
			name: "close friends",
			value: "close friends"
		},
		{
			id: nanoid(),
			name: "don't show to",
			value: "don't show to"
		},
		{
			id: nanoid(),
			name: "only show to",
			value: "only show to"
		}
	];

	const [formContent, setFormContent] = useState({
		type: "share",
		visibility: shareTypes[0].value,
		caption: "",
		sharedPost: "",
		creator: "",
		creatorType: ""
	});

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;
		setFormContent((prev) => ({
			...prev,
			[name]: value,
			sharedPost: post._id
		}));
	};

	useEffect(() => {
		if (user) {
			setFormContent((content) => ({
				...content,
				creator: user._id,
				creatorType: user.docType
			}));
		}

		if (post) {
			setFormContent((content) => ({
				...content,
				sharedPost: post._id
			}));
		}
	}, [open, user, post]);

	const clearPost = () => {
		setFormContent({
			type: "share",
			visibility: shareTypes[0].value,
			caption: "",
			sharedPost: post?._id ?? "",
			creator: user?._id ?? "",
			creatorType: user?.docType ?? ""
		});
	};

	const [share, sharePost] = useSharePostMutation();

	useEffect(() => {
		if (sharePost.isError) {
			const message = typeof sharePost.error === "string" ? sharePost.error : sharePost.error.message;
			toast.error(message);
		} else if (sharePost.isSuccess) {
			toast.success(sharePost.data.message);
			clearPost();
			closingFunction()
		}
	}, [sharePost.isLoading, sharePost.isSuccess, sharePost.isError]);

	const theme = useTheme();

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = sharePostSchema.safeParse(formContent);

		if (validation.success) {
			share(validation.data);
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-10">
			<DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50" />

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div>
							<div className={classNames(theme.sectionNavbar.root, "p-4 rounded-t-md")}>
								<DialogTitle as="h3" className="text-base font-semibold text-white text-center capitalize">
									share post
								</DialogTitle>
							</div>
							<div className="mt-3 sm:mt-5 divide-y divide-gray-400 ">
								<form onSubmit={handleSubmit} className="overflow-hidden bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
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
											<select onChange={handleChanges} name="visibility" value={formContent.visibility} className="capitalize text-sm font-medium bg-gray-200  p-1.5">
												{shareTypes.map((type) => (
													<option key={type.id} value={type.value}>
														{type.name}
													</option>
												))}
											</select>
										</div>
									</div>
									<div className="py-2.5">
										<TextareaAutosize onChange={handleChanges} name="caption" value={formContent.caption} aria-label="caption" minRows={3} placeholder="Say something about this..." className="size-full rounded-md p-1" />
									</div>
									<div className="px-4 py-4 sm:px-6 flex justify-end items-center">
										<button type="submit" className={classNames(buttonVariants({ variant: "blueBtn" }))}>
											share now
										</button>
									</div>
								</form>
								<div className="divide-y divide-gray-200 overflow-hidden bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
									<div className="py-5 capitalize font-medium">send through messages</div>
									<div className="px-4 py-5 sm:p-6"></div>
								</div>
							</div>
						</div>
						<div className="mt-5 sm:mt-6 flex justify-center items-center">
							<button type="button" data-autofocus onClick={closingFunction} className={classNames(buttonVariants({ variant: "destructiveBtn" }), "w-full")}>
								Cancel
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
