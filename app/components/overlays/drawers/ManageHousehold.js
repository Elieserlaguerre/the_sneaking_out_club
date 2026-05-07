"use client";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useUploadMutation } from "@/app/lib/hooks/useUploadMutation";
import { useAtomValue } from "jotai";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { nanoid } from "nanoid";
import { manageHouseholdSchema } from "@/app/lib/util/global/zod-validations";
import { fromZodError } from "zod-validation-error";
import toast from "react-hot-toast";
import { useCreateHouseholdMutation, useEditHouseholdMutation } from "@/app/lib/redux/data-fetching/parents-api";
import ImageCard from "../../cards/ImageCard";
import { format } from "date-fns";

export default function ManageHousehold({ open, closingFunction, settings }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const department = useAtomValue(currentDepartment);

	const [formContent, setFormContent] = useState({
		name: "",
		motto: "",
		origin: "",
		crest: "",
		familyTree: "",
		generationLevel: "",
		members: [],
		childFamilies: [],
		established: "",
		creator: ""
	});

	const clearForm = () => {
		setFormContent({
			name: "",
			motto: "",
			origin: "",
			crest: "",
			familyTree: "",
			members: [],
			childFamilies: [],
			generationLevel: "",
			established: "",
			creator: ""
		});
	};

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;
		if (name === "crest") uploadImage(files[0]);
		setFormContent((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const [uploadImage, uploadImageResults] = useUploadMutation({
		folder: user?.cloudinarySubfolder,
		userId: user?._id,
		department
	});

	useEffect(() => {
		if (uploadImageResults.isError) {
			const message = typeof uploadImageResults.error === "string" ? uploadImageResults.error : uploadImageResults.error.message;

			if (message === "user not found.") {
				router.push("/register");
			} else {
				toast.error(message);
			}
		} else if (uploadImageResults.isSuccess) {
			const { results } = uploadImageResults.data;

			setFormContent((content) => ({
				...content,
				crest: results
			}));
		}
	}, [uploadImageResults.isSuccess, uploadImageResults.isError]);

	const [editHousehold, editHouseholdResults] = useEditHouseholdMutation();

	useEffect(() => {
		if (editHouseholdResults.isError) {
			const message = typeof editHouseholdResults.error === "string" ? editHouseholdResults.error : editHouseholdResults.error.message;
			toast.error(message);
		} else if (editHouseholdResults.isSuccess) {
			toast.success(editHouseholdResults.data.message);
			clearForm();
			closingFunction();
		}
	}, [editHouseholdResults.isLoading, editHouseholdResults.isSuccess, editHouseholdResults.isError]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = manageHouseholdSchema.safeParse(formContent);

		if (validation.success) {
			if (settings.edit === true) editHousehold({ familyId: settings.selectedDocument._id, update: validation.data, currentUser: user._id });
			else createHousehold(validation.data);
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	const generations = [
		{
			id: nanoid(),
			name: "select one",
			value: ""
		},
		{
			id: nanoid(),
			name: "1",
			value: 1
		},
		{
			id: nanoid(),
			name: "2",
			value: 2
		},
		{
			id: nanoid(),
			name: "3",
			value: 3
		},
		{
			id: nanoid(),
			name: "4",
			value: 4
		},
		{
			id: nanoid(),
			name: "5",
			value: 5
		},
		{
			id: nanoid(),
			name: "6",
			value: 6
		},
		{
			id: nanoid(),
			name: "7",
			value: 7
		},
		{
			id: nanoid(),
			name: "8",
			value: 8
		},
		{
			id: nanoid(),
			name: "9",
			value: 9
		},
		{
			id: nanoid(),
			name: "10",
			value: 10
		}
	];

	const [createHousehold, createHouseholdResults] = useCreateHouseholdMutation();

	useEffect(() => {
		if (createHouseholdResults.isError) {
			const message = typeof createHouseholdResults.error === "string" ? createHouseholdResults.error : createHouseholdResults.error.message;
			toast.error(message);
		} else if (createHouseholdResults.isSuccess) {
			toast.success(createHouseholdResults.data.message);

			clearForm();
			closingFunction();
		}
	}, [createHouseholdResults.isLoading, createHouseholdResults.isSuccess, createHouseholdResults.isError]);

	useEffect(() => {
		if (settings.selectedDocument) {
			setFormContent((content) => ({
				...content,
				name: settings?.selectedDocument?.name,
				motto: settings?.selectedDocument?.motto,
				origin: settings?.selectedDocument?.origin,
				crest: settings?.selectedDocument?.crest,
				familyTree: settings?.selectedDocument?.familyTree,
				members: settings?.selectedDocument?.members ?? [],
				childFamilies: settings?.selectedDocument?.childFamilies ?? [],
				generationLevel: settings?.selectedDocument.generationLevel,
				established: settings?.selectedDocument.established,
				creator: settings?.selectedDocument.creator
			}));
		} else {
			if (settings.edit === false) clearForm();
		}
	}, [settings.edit, settings.selectedDocument]);

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
											<DialogTitle className="text-base font-semibold text-white capitalize">{settings.edit ? "edit" : "create"} household</DialogTitle>
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
													motto
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="motto" name="motto" type="text" value={formContent?.motto} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize" />
												</div>
											</div>
											<div>
												<label htmlFor="origin" className="block text-sm/6 font-medium text-gray-900 capitalize">
													origin
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="origin" name="origin" type="text" value={formContent?.origin} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize" />
												</div>
											</div>
											<div>
												<label htmlFor="crest" className="block text-sm/6 font-medium text-gray-900 capitalize">
													crest
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="crest" name="crest" type="file" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="familyTree" className="block text-sm/6 font-medium text-gray-900 capitalize">
													family tree
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="familyTree" name="familyTree" type="text" value={formContent?.familyTree} className="block w-full rounded-md bg-white px-3 py-1.5 text-base ext-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														<option value="">select one</option>
														<option value={user?.familyTree?._id}>{user?.familyTree?.name}</option>
													</select>
												</div>
											</div>
											<div>
												<label htmlFor="generationLevel" className="block text-sm/6 font-medium text-gray-900 capitalize">
													generation
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="generationLevel" name="generationLevel" type="text" value={formContent?.generationLevel} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														{generations.map((generation) => (
															<option key={generation.id} value={generation.value}>
																{generation.name}
															</option>
														))}
													</select>
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
													creator
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="creator" name="creator" type="text" value={formContent?.creator} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														<option>select one</option>
														<option value={user?._id}>{user?.name}</option>
													</select>
												</div>
											</div>

											<div className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
												<div className="px-4 py-5 sm:px-6 text-center font-medium text-sm/6 capitalize">family crest</div>
												<div className="py-5">
													<ImageCard
														image={formContent.crest}
														settings={{
															alt: "family crest image",
															styles: {
																image: "object-contain object-center",
																background: "aspect-square"
															}
														}}
													/>
												</div>
											</div>
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
