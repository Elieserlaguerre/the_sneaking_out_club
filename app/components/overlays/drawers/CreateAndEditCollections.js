"use client";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { nanoid } from "zod";
import { useAtomValue } from "jotai";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { useTheme } from "../../providers/ThemeProvider";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ImageCard from "../../cards/ImageCard";
import { useUploadMutation } from "@/app/lib/hooks/useUploadMutation";
import toast from "react-hot-toast";
import { fromZodError } from "zod-validation-error";
import { useCreateCollectionMutation, useEditCollectionMutation } from "@/app/lib/redux/data-fetching/global-api";
import { collectionSchema } from "@/app/lib/util/global/zod-validations";

export default function CreateAndEditCollections({ open, closingFunction, settings }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);
	const department = useAtomValue(currentDepartment);

	const [formContent, setFormContent] = useState({
		name: "",
		owner: "",
		ownerType: "",
		image: ""
	});

	const clearForm = () => {
		setFormContent({
			name: "",
			owner: "",
			ownerType: "",
			image: ""
		});
	};

	const [upload, uploadResults] = useUploadMutation({
		folder: user?.cloudinarySubfolder,
		userId: user?._id,
		department
	});

	useEffect(() => {
		if (uploadResults.isError) {
			const message = typeof uploadResults.error === "string" ? uploadResults.error : uploadResults.error.message;
			toast.error(message);
		} else if (uploadResults.isSuccess) {
			toast.success(uploadResults.data.message);
		}
	}, [uploadResults.isLoading, uploadResults.isSuccess, uploadResults.isError]);

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;

		if (name === "image") {
			upload(files[0]);
		} else {
			setFormContent((prev) => ({
				...prev,
				[name]: value
			}));
		}
	};

	const ownerOptions = [
		{
			id: nanoid(),
			name: "select one",
			value: null
		},
		{
			id: nanoid(),
			name: user?.name ?? "",
			value: user?._id ?? ""
		}
	];

	const ownerTypeOptions = [
		{
			id: nanoid(),
			name: "select one",
			value: null
		},
		{
			id: nanoid(),
			name: user?.docType ?? "",
			value: user?.docType ?? ""
		}
	];

	const theme = useTheme();

	const [createCollection, createCollectionResults] = useCreateCollectionMutation();

	useEffect(() => {
		if (createCollectionResults.isError) {
			const message = typeof createCollectionResults.error === "string" ? createCollectionResults.error : createCollectionResults.error.message;
			toast.error(message);
		} else if (createCollectionResults.isSuccess) {
			toast.success(createCollectionResults.data.message);
			clearForm();
			closingFunction();
		}
	}, [createCollectionResults.isLoading, createCollectionResults.isSuccess, createCollectionResults.isError]);

	const [editCollection, editCollectionResults] = useEditCollectionMutation();

	useEffect(() => {
		if (editCollectionResults.isError) {
			const message = typeof editCollectionResults.error === "string" ? editCollectionResults.error : editCollectionResults.error.message;
			toast.error(message);
		} else if (editCollectionResults.isSuccess) {
			toast.success(editCollectionResults.data.message);
			clearForm();
			closingFunction();
		}
	}, [editCollectionResults.isLoading, editCollectionResults.isSuccess, editCollectionResults.isError]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = collectionSchema.safeParse(formContent);

		if (validation.success) {
			if (settings?.edit === true) editCollection({ ...validation.data, collectionId: settings.collection._id });
			else createCollection(validation.data);
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	useEffect(() => {
		if (open === true && settings.edit === true) {
			setFormContent({
				name: settings?.collection?.name,
				owner: settings?.collection?.owner,
				ownerType: settings?.collection?.ownerType,
				image: settings?.collection?.image
			});
		} else {
			clearForm();
		}
	}, [open, settings]);

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-50">
			<div className="fixed inset-0" />

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-md xl:pl-16">
						<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
							<form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
								<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
									<div className={classNames(theme.base, "px-4 py-[1.61rem] sm:px-6")}>
										<div className="flex items-center justify-between">
											<DialogTitle className="text-base font-semibold text-white capitalize">{settings?.edit ? "edit" : "create"} collection</DialogTitle>
											<div className="ml-3 flex h-7 items-center">
												<button type="button" onClick={closingFunction} className="relative rounded-md bg-transparent text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
													<span className="absolute -inset-2.5" />
													<span className="sr-only">Close panel</span>
													<XMarkIcon aria-hidden="true" className="text-white w-6 h-6" />
												</button>
											</div>
										</div>
									</div>
									<div className="divide-y divide-gray-200 px-4 sm:px-6 grow overflow-y-auto pb-4">
										<div className="space-y-6 pt-6 h-full flex flex-col">
											<div>
												<label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 capitalize">
													name
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="name" name="name" type="text" value={formContent?.name} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>

											<div>
												<label htmlFor="image" className="block text-sm/6 font-medium text-gray-900 capitalize">
													cover image (optional)
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="image" name="image" type="file" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>

											<div>
												<label htmlFor="owner" className="block text-sm/6 font-medium text-gray-900 capitalize">
													owner
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="owner" name="owner" type="text" value={formContent?.owner} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														{ownerOptions.map((option) => (
															<option key={option.name} value={option.value}>
																{option.name}
															</option>
														))}
													</select>
												</div>
											</div>

											<div>
												<label htmlFor="ownerType" className="block text-sm/6 font-medium text-gray-900 capitalize">
													owner type
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="ownerType" name="ownerType" type="text" value={formContent?.ownerType} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														{ownerTypeOptions.map((option) => (
															<option key={option.name} value={option.value}>
																{option.name}
															</option>
														))}
													</select>
												</div>
											</div>

											{formContent.image && (
												<div className="divide-y divide-gray-200 flex-1">
													<div className="py-2 text-sm/6 font-medium capitalize">cover image</div>
													<div className="py-5 size-full">
														<ImageCard
															image={formContent.image}
															settings={{
																alt: "collection's cover image",
																styles: {
																	image: "object-contain object-center",
																	background: "bg-gray-200 size-full"
																}
															}}
														/>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="flex shrink-0 justify-evenly items-center px-4 py-4">
									<button type="submit" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
										submit
									</button>
									<button type="button" onClick={closingFunction} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
										Cancel
									</button>
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
