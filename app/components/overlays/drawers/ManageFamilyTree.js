"use client";

import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { fromZodError } from "zod-validation-error";
import toast from "react-hot-toast";
import { useUploadMutation } from "@/app/lib/hooks/useUploadMutation";
import { useAtomValue } from "jotai";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { manageFamilyTreeSchema } from "@/app/lib/util/global/zod-validations";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { nanoid } from "nanoid";
import ImageCard from "../../cards/ImageCard";
import { useCreateFamilyTreeMutation, useUpdateFamilyTreeMutation } from "@/app/lib/redux/data-fetching/parents-api";

export default function ManageFamilyTree({ open, closingFunction, settings }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const department = useAtomValue(currentDepartment);

	const [formContent, setFormContent] = useState({
		name: "",
		motto: "",
		phone: "",
		email: "",
		origin: "",
		lineage: [],
		rootFamily: [],
		branches: [],
		familyHead: "",
		spouse: "",
		founder: "",
		established: "",
		crest: "",
		creator: ""
	});

	console.log("formContent", formContent);

	const clearForm = () => {
		setFormContent({
			name: "",
			motto: "",
			phone: "",
			email: "",
			origin: "",
			lineage: [],
			rootFamily: [],
			branches: [],
			familyHead: "",
			spouse: "",
			founder: "",
			established: "",
			crest: "",
			creator: ""
		});
	};

	const [uploadCrest, uploadCrestResult] = useUploadMutation({
		folder: user?.cloudinarySubfolder,
		userId: user?._id,
		department
	});

	useEffect(() => {
		if (uploadCrestResult.isError) {
			const message = typeof uploadCrestResult.error === "string" ? uploadCrestResult.error : uploadCrestResult.error.message;
			toast.error(message);
		} else if (uploadCrestResult.isSuccess) {
			toast.success(uploadCrestResult.data.message);

			const { results } = uploadCrestResult.data;

			setFormContent((content) => ({
				...content,
				crest: results
			}));
		}
	}, [uploadCrestResult.isLoading, uploadCrestResult.isSuccess, uploadCrestResult.isError]);

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;

		if (name === "crest") uploadCrest(files[0]);
		else
			setFormContent((prev) => ({
				...prev,
				[name]: value
			}));
	};

	const [createFamilyTree, createFamilyTreeResults] = useCreateFamilyTreeMutation();

	useEffect(() => {
		if (createFamilyTreeResults.isError) {
			const message = typeof createFamilyTreeResults.error === "string" ? createFamilyTreeResults.error : createFamilyTreeResults.error.message;
			toast.error(message);
		} else if (createFamilyTreeResults.isSuccess) {
			toast.success(createFamilyTreeResults.data.message);

			clearForm();
			closingFunction();
		}
	}, [createFamilyTreeResults.isLoading, createFamilyTreeResults.isSuccess, createFamilyTreeResults.isError]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = manageFamilyTreeSchema.safeParse(formContent);

		if (validation.success) {
			if (settings.mode === "edit") updateFamilyTree({ update: validation.data, treeId: settings.selectedDocument._id });
			else createFamilyTree(validation.data);
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	const documentCreator = [
		{
			id: nanoid(),
			name: "select one",
			value: "select one"
		},
		{
			id: nanoid(),
			name: user?.name,
			value: user?._id
		}
	];

	useEffect(() => {
		if (settings.mode === "edit")
			setFormContent({
				name: settings?.selectedDocument?.name ?? "",
				motto: settings?.selectedDocument?.motto ?? "",
				phone: settings?.selectedDocument?.phone ?? "",
				email: settings?.selectedDocument?.email ?? "",
				origin: settings?.selectedDocument?.origin ?? "",
				lineage: settings?.selectedDocument?.lineage ?? [],
				rootFamily: settings?.selectedDocument?.rootFamily ?? [],
				branches: settings?.selectedDocument?.branches ?? [],
				familyHead: settings?.selectedDocument?.familyHead ?? "",
				spouse: settings?.selectedDocument?.spouse ?? "",
				founder: settings?.selectedDocument?.founder ?? "",
				established: settings?.selectedDocument?.established ?? "",
				crest: settings?.selectedDocument?.crest ?? "",
				creator: settings?.selectedDocument?.creator ?? ""
			});
	}, [settings.mode]);

	const [updateFamilyTree, updateFamilyTreeResults] = useUpdateFamilyTreeMutation();

	useEffect(() => {
		if (updateFamilyTreeResults.isError) {
			const message = typeof updateFamilyTreeResults.error === "string" ? updateFamilyTreeResults.error : updateFamilyTreeResults.error.message;
			toast.error(message);
		} else if (updateFamilyTreeResults.isSuccess) {
			toast.success(updateFamilyTreeResults.data.message);

			clearForm();
			closingFunction();
		}
	}, [updateFamilyTreeResults.isLoading, updateFamilyTreeResults.isSuccess, updateFamilyTreeResults.isError]);

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-50">
			<div className="fixed inset-0" />

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-md xl:pl-16">
						<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
							<form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
								<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
									<div className={classNames("px-4 py-[1.61rem] sm:px-6 bg-linear-to-br from-orange-500 to-orange-700")}>
										<div className="flex items-center justify-between">
											<DialogTitle className="text-base font-semibold text-white capitalize">
												{settings.mode === "edit" ? "edit " : "create "}
												family tree
											</DialogTitle>
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
													family name
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="name" name="name" type="text" value={formContent?.name} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="motto" className="block text-sm/6 font-medium text-gray-900 capitalize">
													family motto (optional)
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="motto" name="motto" type="text" value={formContent?.motto} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 capitalize">
													email
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="email" name="email" type="email" value={formContent?.email} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900 capitalize">
													phone
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="phone" name="phone" type="tel" value={formContent?.phone} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="origin" className="block text-sm/6 font-medium text-gray-900 capitalize">
													family's origin
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="origin" name="origin" type="text" value={formContent?.origin} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="crest" className="block text-sm/6 font-medium text-gray-900 capitalize">
													family crest
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="crest" name="crest" type="file" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>

											<div>
												<label htmlFor="established" className="block text-sm/6 font-medium text-gray-900 capitalize">
													established
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="established" name="established" type="date" value={formContent?.established} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="creator" className="block text-sm/6 font-medium text-gray-900 capitalize">
													document creator
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="creator" name="creator" type="text" value={formContent?.creator} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														{documentCreator.map((creator) => (
															<option key={creator.id} value={creator.value}>
																{creator.name}
															</option>
														))}
													</select>
												</div>
											</div>

											{formContent.crest && (
												<div className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400">
													<div className="px-4 py-5 sm:px-6 capitalize text-center">family crest</div>
													<div className="px-4 py-5 sm:p-6">
														<ImageCard
															image={formContent.crest}
															settings={{
																alt: "family crest image",
																styles: {
																	image: "object-contain object-center",
																	background: ""
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
