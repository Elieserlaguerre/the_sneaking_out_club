"use client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { useAtomValue } from "jotai";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import ImageCard from "../../cards/ImageCard";
import { PhotoIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useTheme } from "../../providers/ThemeProvider";
import { useUploadMutation } from "@/app/lib/hooks/useUploadMutation";
import toast from "react-hot-toast";
import { fromZodError } from "zod-validation-error";
import { postSchema } from "@/app/lib/util/global/zod-validations";
import { nanoid } from "nanoid";
import { useCreateGroupPostMutation, useCreatePostMutation } from "@/app/lib/redux/data-fetching/global-api";
import { useParams } from "next/navigation";

export default function CreateGroupPost() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [openModal, setOpenModal] = useState(false);

	const handleModalOpenning = () => {
		setOpenModal(true);
	};

	const closeModal = () => {
		setOpenModal(false);
	};

	const user = useAtomValue(currentUser);
	const department = useAtomValue(currentDepartment);
	const { groupId } = useParams();
	const theme = useTheme();

	const [formContent, setFormContent] = useState({
		type: "text",
		caption: "",
		message: "",
		visibility: "public",
		media: "",
		duration: "",
		format: "",
		creator: "",
		creatorType: ""
	});

	const clearForm = () => {
		setFormContent({
			type: "text",
			caption: "",
			message: "",
			visibility: "public",
			media: "",
			duration: "",
			format: "",
			creator: "",
			creatorType: ""
		});
	};

	useEffect(() => {
		setFormContent((content) => ({
			...content,
			creator: user?._id,
			creatorType: user?.docType
		}));
	}, [user, formContent.creator, formContent.docType]);

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;

		if (formContent.type !== "text" && name === "caption") {
			uploadFile(files[0]);
		} else {
			setFormContent((prev) => ({
				...prev,
				[name]: value
			}));
		}
	};

	const [uploadFile, uploadFileResults] = useUploadMutation({
		folder: user?.cloudinarySubfolder,
		userId: user?._id,
		department
	});

	useEffect(() => {
		if (uploadFileResults.isError) {
			const message = typeof uploadFileResults.error === "string" ? uploadFileResults.error : uploadFileResults.error.message;
			toast.error(message);
		} else if (uploadFileResults.isSuccess) {
			toast.success(uploadFileResults.data.message);
			const { results } = uploadFileResults.data;
			setFormContent((prev) => ({
				...prev,
				media: results
			}));
		}
	}, [uploadFileResults.isLoading, uploadFileResults.isSuccess, uploadFileResults.isError]);

	const [createPost, createPostResults] = useCreateGroupPostMutation();

	useEffect(() => {
		if (createPostResults.isError) {
			const message = typeof createPostResults.error === "string" ? createPostResults.error : createPostResults.error.message;
			toast.error(message);
		} else if (createPostResults.isSuccess) {
			toast.success(createPostResults.data.message);
			clearForm();
			closeModal();
		}
	}, [createPostResults.isLoading, createPostResults.isSuccess, createPostResults.isError]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = postSchema.safeParse(formContent);

		if (validation.success) {
			createPost({ ...validation.data, section: groupId, sectionType: "Group" });
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	const visibilityOptions = [
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

	return (
		<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 shrink-0">
			<div className="p-4  sm:px-6 flex justify-between items-center gap-x-6">
				<div className="border border-gray-500 size-10 rounded-full overflow-clip">
					<ImageCard
						image={user?.image}
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
					<input onSelect={handleModalOpenning} type="text" name="post" id="post" className="bg-gray-200 rounded-full w-full px-2.5 py-3.5 h-full" placeholder={`What's on your mind, ${user?.firstName}?`} />
				</div>
				<div className="h-full min-w-20 flex justify-evenly items-center gap-1.5">
					<VideoCameraIcon className="size-8 fill-red-500 cursor-pointer hover:fill-red-400" />
					<PhotoIcon className="size-8 fill-green-500 cursor-pointer hover:fill-green-400" />
				</div>
			</div>
			<div className="px-4 py-4 sm:px-6 hidden">
				<Dialog open={openModal} onClose={closeModal} className="relative z-10">
					<DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50" />

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<DialogPanel transition className="relative transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10 flex flex-col">
								<form onSubmit={handleSubmit} className="flex flex-col size-full flex-1">
									<div className="flex-1 flex flex-col">
										<div className={classNames(theme?.sectionNavbar.root, theme.text.navbar, "p-5 rounded-t-md flex justify-between items-center")}>
											<DialogTitle as="h3" className="text-base font-semibold text-center capitalize flex-auto">
												create post
											</DialogTitle>
											<button type="button" onClick={closeModal} className={classNames(buttonVariants({ variant: "WhiteCircularBtn" }))}>
												<XMarkIcon />
											</button>
										</div>
										<div className="mt-3 sm:mt-5 divide-y divide-gray-300 rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 flex-1 flex flex-col">
											<div className="px-4 py-2.5 sm:px-6 flex gap-x-2.5 items-center">
												<div className="border border-gray-500 size-10 rounded-full overflow-clip">
													<ImageCard
														image={user?.image}
														settings={{
															alt: "user image",
															styles: {
																image: "object-contain object-center object-center",
																background: "size-full bg-gray-300"
															}
														}}
													/>
												</div>
												<div className="flex flex-col">
													<span className="capitalize font-medium">
														{user?.firstName} {user?.lastName}
													</span>
													<div className="flex justify-evenly items-center gap-1 mt-1">
														<select onChange={handleChanges} name="type" id="type" value={formContent.type} className="border border-gray-400 rounded-sm px-1 capitalize">
															<option value="text">Text</option>
															<option value="image">Image</option>
															<option value="video">Video</option>
														</select>
														<select onChange={handleChanges} name="visibility" id="visibility" value={formContent.visibility} className="border border-gray-400 rounded-sm px-1 capitalize">
															{visibilityOptions.map((option) => (
																<option key={option.id} value={option.value}>
																	{option.name}
																</option>
															))}
														</select>
													</div>
												</div>
											</div>
											<div className="px-4 py-5 sm:p-6 size-full flex-1 flex flex-col">
												{formContent.type === "text" ? (
													<input onChange={handleChanges} type="text" name="message" id="message" className="bg-gray-200 rounded-full w-full px-2.5 py-3.5 h-full" placeholder={`What's on your mind, ${user?.lastName}?`} />
												) : (
													<div className="divide-y divide-gray-200 size-full h-28 flex flex-col gap-1.5 flex-1">
														<div className="">
															<input onChange={handleChanges} type="text" name="caption" id="caption" placeholder="Add a caption (optional)" className="rounded-md w-full px-2.5 py-3.5 size-full" />
														</div>
														<div>
															<label htmlFor="upload_file" className="px-4 py-5 sm:p-6 border border-gray-300 bg-gray-200 flex-auto flex justify-center items-center rounded-md">
																<div className="border border-dashed border-gray-400 bg-white rounded-md h-20 flex justify-center items-center p-4 cursor-pointer">
																	<span className="font-medium text-gray-900">Click to upload {formContent.type} </span>
																</div>
															</label>
															<div className="px-4 py-4 sm:px-6 hidden">
																<input onChange={handleChanges} type="file" name="media" id="upload_file" className="bg-gray-200 rounded-full w-full px-2.5 py-3.5 h-full" />
															</div>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
									<div className="mt-5 sm:mt-6 grid sm:grid-flow-row-dense sm:grid-cols-2 gap-3">
										<button type="submit" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
											post
										</button>
										<button type="button" data-autofocus onClick={closeModal} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
											Cancel
										</button>
									</div>
								</form>
							</DialogPanel>
						</div>
					</div>
				</Dialog>
			</div>
		</div>
	);
}
