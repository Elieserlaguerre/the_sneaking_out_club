"use client";
import { Dialog, DialogPanel, DialogTitle, Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { useAtom, useAtomValue } from "jotai";
import { currentDepartment, currentUser, groupPreview } from "@/app/lib/state-management/global-state";
import { groupSchema } from "@/app/lib/util/global/zod-validations";
import { fromZodError } from "zod-validation-error";
import toast from "react-hot-toast";
import { useTheme } from "../../providers/ThemeProvider";
import { nanoid } from "zod";
import { useUploadMutation } from "@/app/lib/hooks/useUploadMutation";
import { useCreateGroupMutation } from "@/app/lib/redux/data-fetching/global-api";
import { TextareaAutosize } from "@mui/material";

export default function CreateAndManageGroup({ open, closingFunction, settings }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [formContent, setFormContent] = useAtom(groupPreview);

	const clearForm = () => {
		setFormContent({
			name: "",
			about: "",
			privacy: "",
			visibility: "",
			members: [],
			image: "",
			events: [],
			owner: "",
			ownerType: "",
			managers: []
		});
	};

	useEffect(() => {
		if (open === true && settings.edit === true) {
			setFormContent({
				name: settings?.group?.name ?? "",
				about: settings?.group?.about ?? "",
				privacy: settings?.group?.privacy ?? "",
				visibility: settings?.group?.visibility ?? "",
				members: settings?.group?.members ?? [],
				image: settings?.group?.image ?? "",
				events: settings?.group?.events ?? [],
				owner: settings?.group?.owner ?? "",
				ownerType: settings?.group?.ownerType ?? "",
				managers: settings?.group?.managers ?? [],
				groupId: settings?.group?._id ?? ""
			});
		}
	}, [open, settings]);

	const user = useAtomValue(currentUser);

	const department = useAtomValue(currentDepartment);

	const [uploadImage, uploadImageResults] = useUploadMutation();

	useEffect(() => {
		if (uploadImageResults.isError) {
			const message = typeof uploadImageResults.error === "string" ? uploadImageResults.error : uploadImageResults.error.message;
			toast.error(message);
		} else if (uploadImageResults.isSuccess) {
			toast.success(uploadImageResults.data.message);
			const { results } = uploadImageResults.data;
			setFormContent((content) => ({
				...content,
				image: results
			}));
		}
	}, [uploadImageResults.isLoading, uploadImageResults.isSuccess, uploadImageResults.isError]);

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;

		if (name === "image") {
			uploadImage(files[0], {
				folder: user.cloudinarySubfolder,
				userId: user._id,
				department: department
			});
		} else {
			setFormContent((content) => ({
				...content,
				[name]: value
			}));

			if (name === "owner") {
				setFormContent((content) => ({
					...content,
					ownerType: user.docType
				}));
			}
		}
	};

	const [createGroup, createGroupResults] = useCreateGroupMutation();

	useEffect(() => {
		if (createGroupResults.isError) {
			const message = typeof createGroupResults.error === "string" ? createGroupResults.error : createGroupResults.error.message;
			toast.error(message);
		} else if (createGroupResults.isSuccess) {
			toast.success(createGroupResults.data.message);
			// clearForm();
			closingFunction();
		}
	}, [createGroupResults.isLoading, createGroupResults.isSuccess, createGroupResults.isError]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = groupSchema.safeParse(formContent);

		if (validation.success) {
			if (settings.edit === true)
				return; //edit group
			else createGroup(validation.data);
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	const theme = useTheme();

	const privacyOptions = [
		{
			id: nanoid(),
			name: "select one",
			value: ""
		},
		{
			id: nanoid(),
			name: "public",
			value: "public"
		},
		{
			id: nanoid(),
			name: "private",
			value: "private"
		}
	];

	const visibilityOptions = [
		{
			id: nanoid(),
			name: "select one",
			value: ""
		},
		{
			id: nanoid(),
			name: "visible",
			value: "visible"
		},
		{
			id: nanoid(),
			name: "hidden",
			value: "hidden"
		}
	];

	const ownerOptions = [
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

	const [connections, setConnections] = useState([]);
	const [selectedFriend, setSelectedFriend] = useState("");
	const [managers, setManagers] = useState([]);

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
											<DialogTitle className="text-base font-semibold text-white capitalize">{settings?.edit === true ? "edit" : "create"} group</DialogTitle>
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
													group's name
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="name" name="name" type="text" value={formContent?.name} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="privacy" className="block text-sm/6 font-medium text-gray-900 capitalize">
													choose privacy
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="privacy" name="privacy" type="text" value={formContent?.privacy} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														{privacyOptions.map((option) => (
															<option key={option.name} value={option.value}>
																{option.name}
															</option>
														))}
													</select>
												</div>
											</div>

											<div>
												<label htmlFor="visibility" className="block text-sm/6 font-medium text-gray-900 capitalize">
													visibility
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="visibility" name="visibility" type="text" value={formContent?.visibility} className="block w-full rounded-md bg-white px-3 py-1.5 text-base ext-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														{visibilityOptions.map((option) => (
															<option key={option.name} value={option.value}>
																{option.name}
															</option>
														))}
													</select>
												</div>
											</div>

											<div>
												<label htmlFor="image" className="block text-sm/6 font-medium text-gray-900 capitalize">
													group image
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

											<Field>
												<Label className="block text-sm/6 font-medium text-gray-900 capitalize">invite friends (optional) </Label>
												<Listbox value={selectedFriend} onChange={setSelectedFriend} className={classNames("block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2")} as="div">
													<ListboxButton>{selectedFriend?.firstName}</ListboxButton>
													<ListboxOptions anchor="bottom">
														{connections?.map((friend) => (
															<ListboxOption key={friend?._id} value={friend} className="data-focus:bg-blue-100">
																{friend?.name}
															</ListboxOption>
														))}
													</ListboxOptions>
												</Listbox>
											</Field>

											<Field>
												<Label className="block text-sm/6 font-medium text-gray-900 capitalize">add managers (optional) </Label>
												<Listbox value={""} onChange={""} className={classNames("block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2")} as="div">
													<ListboxButton>{""}</ListboxButton>
													<ListboxOptions anchor="bottom">
														{connections?.map((friend) => (
															<ListboxOption key={friend?._id} value={friend} className="data-focus:bg-blue-100">
																{friend?.name}
															</ListboxOption>
														))}
													</ListboxOptions>
												</Listbox>
											</Field>

											<div>
												<label htmlFor="about" className="block text-sm/6 font-medium text-gray-900 capitalize">
													about
												</label>
												<div className="mt-2">
													<TextareaAutosize aria-label="group description" minRows={3} value={formContent.about} placeholder="group description" name="about" onChange={handleChanges} className="border border-gray-400 w-full p-1.5 rounded-md" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="flex shrink-0 justify-evenly items-center px-4 py-4">
									<button type="submit" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
										create
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
