"use client";
import { useCreateCommentMutation, useRespondToCommentsMutation } from "@/app/lib/redux/data-fetching/global-api";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { CameraIcon, EllipsisVerticalIcon, PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "../shadcn/button";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import toast from "react-hot-toast";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { responseSchema } from "@/app/lib/util/global/zod-validations";
import { fromZodError } from "zod-validation-error";

export default function ResponseCard({ comment, cancelFunction }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [formContent, setFormContent] = useState({
		post: "",
		parentComment: "",
		message: "",
		creator: "",
		creatorType: ""
	});

	const clearForm = () => {
		setFormContent({
			post: "",
			parentComment: "",
			message: "",
			creator: "",
			creatorType: ""
		});
	};

	const user = useAtomValue(currentUser);

	useEffect(() => {
		if (user) {
			setFormContent({
				post: comment?.post,
				parentComment: comment?._id,
				message: "",
				creator: user?._id,
				creatorType: user?.docType
			});
		}
	}, [user, comment]);

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

	const closeResponseComponent = () => {
		clearForm();
		cancelFunction();
	};

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;
		setFormContent((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const additionalResponseOptions = [
		{
			id: nanoid(),
			name: "upload file",
			icon: CameraIcon
		}
	];

	const [respond, responseResults] = useRespondToCommentsMutation();

	useEffect(() => {
		if (responseResults.isError) {
			const message = typeof responseResults.error === "string" ? responseResults.error : responseResults.error.message;
			toast.error(message);
		} else if (responseResults.isSuccess) {
			toast.success(responseResults.data.message);

			closeResponseComponent();
		}
	}, [responseResults.isLoading, responseResults.isSuccess, responseResults.isError]);

	const submitResponse = (e) => {
		e.preventDefault();

		const validation = responseSchema.safeParse(formContent);

		if (validation.success) {
			respond(validation.data);
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	return (
		<div className="size-full flex justify-between items-start gap-1.5">
			<div className="size-8 border border-gray-500 rounded-full flex justify-center items-center overflow-clip">
				<ImageCard
					image={user?.image}
					settings={{
						alt: "user's image",
						styles: {
							image: "object-contain object-center",
							background: "bg-gray-300"
						}
					}}
				/>
			</div>
			<div className="w-full">
				<div className="flex justify-between items-center">
					<div className="flex-auto min-h-10">
						<input onChange={handleChanges} type="text" name="message" className="text-left size-full p-1 bg-gray-200 rounded-md min-h-10 border border-gray-400" value={formContent.message} />
					</div>
					<div className="w-6">
						<Menu as="div" className="relative hidden group-hover:block">
							<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
								<EllipsisVerticalIcon aria-hidden="true" className="w-5 text-gray-900" />
							</MenuButton>
							<MenuItems transition className="absolute right-0 z-30 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
								<MenuItem>
									<button onClick={closeResponseComponent} type="button" className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
										cancel
									</button>
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
				</div>
				<div className="p-1 rounded-md flex justify-between items-center gap-3">
					<dl className="flex gap-3 justify-start items-center">
						{additionalResponseOptions.map((option) => (
							<div key={option.id} className="text-left capitalize text-sm font-medium text-gray-600 cursor-pointer hover:underline">
								<dt className="capitalize sr-only">{option.name}</dt>
								<dd>
									<option.icon className="size-4 hover:scale-105 cursor-pointer hover:fill-green-500" />
								</dd>
							</div>
						))}
					</dl>

					<div className="flex justify-evenly items-center gap-0.5">
						<button type="button" onClick={submitResponse} className={classNames(buttonVariants({ variant: "greenCircularBtn" }), "text-sm text-gray-600 font-medium border border-white -mr-2.5 z-16")}>
							<PaperAirplaneIcon className="size-3" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
