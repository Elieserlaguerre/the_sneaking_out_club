"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState } from "react";
import { buttonVariants } from "../shadcn/button";
import { states } from "@/app/lib/util/frontend-helper-functions";
import { CameraIcon } from "@heroicons/react/20/solid";
import { nanoid } from "nanoid";
import ImageCard from "../cards/ImageCard";
import { calculateAge } from "@/app/lib/util/global-helper-functions";
import { useUploadMutation } from "@/app/lib/hooks/useUploadMutation";
import { useAtomValue } from "jotai";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { manageFamilyMemberSchema } from "@/app/lib/util/global-helper-functions/zod-validations";
import { fromZodError } from "zod-validation-error";
import toast from "react-hot-toast";
import { useAddFamilyMemberMutation } from "@/app/lib/redux/data-fetching/parents-api";
import { Loader2 } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function ManageFamilyMembers({ open, closingFunction, settings }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const department = useAtomValue(currentDepartment);

	const theme = useTheme();

	const [formContent, setFormContent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		relation: "",
		dateOfBirth: "",
		age: "",
		nationality: "",
		gender: "",
		introduction: "",
		image: "",
		cloudinarySubfolder: ""
	});

	const clearForm = () => {
		setFormContent({
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
			address1: "",
			address2: "",
			city: "",
			state: "",
			zipCode: "",
			country: "",
			relation: "",
			dateOfBirth: "",
			age: "",
			nationality: "",
			gender: "",
			introduction: "",
			image: "",
			cloudinarySubfolder: ""
		});
	};

	const [name, setName] = useState("");

	useEffect(() => {
		if (formContent.firstName && formContent.lastName) setName(`${formContent.firstName} ${formContent.lastName}`);
		else setName("upload image");
	}, [formContent.firstName, formContent.lastName]);

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;
		if (name === "image") {
			uploadImage(files[0]);
		} else {
			setFormContent((prev) => ({
				...prev,
				[name]: value
			}));
		}
	};

	const gender = [
		{
			id: nanoid(),
			name: "male",
			value: "Male"
		},
		{
			id: nanoid(),
			name: "female",
			value: "Female"
		},
		{
			id: nanoid(),
			name: "other",
			value: "Other"
		}
	];

	useEffect(() => {
		const age = calculateAge(formContent.dateOfBirth);

		setFormContent((prev) => ({
			...prev,
			age: age ?? ""
		}));
	}, [formContent.dateOfBirth]);

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
				image: results
			}));
		}
	}, [uploadImageResults.isSuccess, uploadImageResults.isError]);

	console.log("formContent", formContent);

	const [addFamilyMember, addFamilyMemberResults] = useAddFamilyMemberMutation();

	useEffect(() => {
		if (addFamilyMemberResults.isError) {
			const message = typeof addFamilyMemberResults.error === "string" ? addFamilyMemberResults.error : addFamilyMemberResults.error.message;
			toast.error(message);
		} else if (addFamilyMemberResults.isSuccess) {
			toast.success(addFamilyMemberResults.data.message);

			const { results } = addFamilyMemberResults.data;

			// clearForm();
		}
	}, [addFamilyMemberResults.isSuccess, addFamilyMemberResults.isError]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = manageFamilyMemberSchema.safeParse(formContent);

		if (validation.success) {
			if (settings?.editMode === true) {
			} else {
				addFamilyMember(validation.data);
			}
		} else {
			const error = fromZodError(validation.error);
			console.log("error", error);

			error.details.map((error) => toast.error(error.message));
		}
	};

	const handleDrwerClosure = () => {
		clearForm();
		closingFunction();
	};

	return (
		<Dialog open={open} onClose={handleDrwerClosure} className="relative z-50">
			<div className="fixed inset-0" />

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-2xl xl:pl-16">
						<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-3xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
							<form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
								<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
									<div className={classNames("px-4 py-[1.61rem] sm:px-6 bg-linear-to-br from-orange-500 to-orange-700")}>
										<div className="flex items-center justify-between">
											<DialogTitle className="text-base font-semibold text-white capitalize">Manage family member</DialogTitle>
											<div className="ml-3 flex h-7 items-center">
												<button type="button" onClick={handleDrwerClosure} className="relative rounded-md bg-transparent text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
													<span className="absolute -inset-2.5" />
													<span className="sr-only">Close panel</span>
													<XMarkIcon aria-hidden="true" className="text-white w-6 h-6" />
												</button>
											</div>
										</div>
									</div>
									<div className="divide-y divide-gray-200 px-4 sm:px-6 grow overflow-y-auto pb-4">
										<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 pt-6">
											<div>
												<label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													First name
												</label>
												<div className="mt-2.5">
													<input onChange={handleChanges} value={formContent.firstName} type="text" name="firstName" id="firstName" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>
											<div>
												<label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													Last name
												</label>
												<div className="mt-2.5">
													<input onChange={handleChanges} value={formContent.lastName} type="text" name="lastName" id="lastName" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>

											<div className="">
												<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													Email
												</label>
												<div className="mt-2.5">
													<input onChange={handleChanges} value={formContent.email} type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>
											<div className="">
												<label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													Phone number
												</label>
												<div className="relative mt-2.5">
													<input onChange={handleChanges} value={formContent.phone} type="tel" name="phone" id="phone" className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>
											<div>
												<label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													password
												</label>
												<div className="mt-2.5">
													<input onChange={handleChanges} value={formContent.password} type="password" name="password" id="password" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>
											<div>
												<label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													confirm password
												</label>
												<div className="mt-2.5">
													<input onChange={handleChanges} value={formContent.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>
											<div className="sm:col-span-2">
												<label htmlFor="address1" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													address 1
												</label>
												<div className="mt-2.5">
													<input onChange={handleChanges} value={formContent.address1} type="text" name="address1" id="address1" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>
											<div className="sm:col-span-2">
												<label htmlFor="address2" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													address 2
												</label>
												<div className="mt-2.5">
													<input onChange={handleChanges} value={formContent.address2} type="text" name="address2" id="address2" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>

											<div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-0">
												<div>
													<label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
														city
													</label>
													<div className="mt-2.5">
														<input onChange={handleChanges} value={formContent.city} type="text" name="city" id="city" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
													</div>
												</div>
												<div>
													<label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
														state
													</label>
													<div className="mt-2.5 relative ">
														<select onChange={handleChanges} value={formContent.state} id="state" name="state" className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
															<option>select a state</option>
															{states.map((state) => (
																<option key={state.name} value={state.name}>
																	{state.abbreviation}
																</option>
															))}
														</select>
													</div>
												</div>
												<div>
													<label htmlFor="zipCode" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
														zip code
													</label>
													<div className="mt-2.5">
														<input onChange={handleChanges} value={formContent.zipCode} type="text" name="zipCode" id="zipCode" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
													</div>
												</div>
											</div>
											<div className="mt-2.5">
												<label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													country
												</label>
												<div className="mt-2.5">
													<input onChange={handleChanges} value={formContent.country} type="text" name="country" id="country" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>
											<div className="mt-2.5">
												<label htmlFor="relation" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
													relation
												</label>
												<div className="mt-2.5">
													<input onChange={handleChanges} value={formContent.relation} type="text" name="relation" id="relation" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
												</div>
											</div>
											<div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-2 gap-x-8">
												<div className="flex flex-col min-h-fit p-px border border-gray-400 rounded-md divide-y divide-gray-200 overflow-hidden">
													<div className="p-4">
														<p className="capitalize text-center font-semibold">{name}</p>
													</div>
													<div className="py-8 px-2 flex-1 aspect-square">
														{uploadImageResults.isLoading ? (
															<div className="size-full aspect-square flex justify-center items-center bg-gray-400 rounded-full">
																<Loader2 className={classNames(theme.text.secondary, "size-6/12 aspect-square animate-spin inline-block")} />
															</div>
														) : (
															<ImageCard
																image={formContent.image}
																settings={{
																	alt: "user registration image",
																	styles: {
																		image: "object-contain object-center",
																		background: "size-full aspect-square rounded-full"
																	}
																}}
															/>
														)}
													</div>
													<div className="p-4 flex justify-center items-center">
														<label htmlFor="image" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
															<CameraIcon className="size-6 fill-white stroke-gray-900" />
														</label>
													</div>
												</div>
												<div className="grid grid-cols-1 gap-4">
													<div>
														<label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
															date of birth
														</label>
														<div className="mt-2.5">
															<input onChange={handleChanges} value={formContent.dateOfBirth} type="date" name="dateOfBirth" id="dateOfBirth" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
														</div>
													</div>

													<div>
														<label htmlFor="age" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
															age
														</label>
														<div className="mt-2.5">
															<input readOnly={true} value={formContent.age} type="text" name="age" id="age" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
														</div>
													</div>

													<div className="">
														<label htmlFor="gender" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
															gender
														</label>
														<div className="mt-2.5">
															<select onChange={handleChanges} value={formContent.gender} type="text" name="gender" id="gender" className="block w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 capitalize">
																<option>gender</option>
																{gender.map((gender, i) => (
																	<option key={gender.id} value={gender.value}>
																		{gender.name}
																	</option>
																))}
															</select>
														</div>
													</div>

													<div>
														<label htmlFor="nationality" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
															nationality
														</label>
														<div className="mt-2.5">
															<input onChange={handleChanges} value={formContent.nationality} type="text" name="nationality" id="nationality" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="what is your nationality?" />
														</div>
													</div>
												</div>

												<div className="hidden">
													<label htmlFor="image" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
														avatar image
													</label>
													<div className="mt-2.5">
														<input onChange={handleChanges} type="file" name="image" id="image" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
													</div>
												</div>
											</div>
											<div className="flex p-px sm:col-span-full">
												<div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
													<div className="col-span-full">
														<label htmlFor="introduction" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
															introduction
														</label>
														<div className="mt-2.5">
															<textarea onChange={handleChanges} value={formContent.introduction} type="text" name="introduction" id="introduction" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Introduce yourself" rows={12}></textarea>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="flex shrink-0 justify-evenly items-center px-4 py-4">
									<button type="submit" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
										submit
									</button>
									<button type="button" onClick={handleDrwerClosure} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
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
