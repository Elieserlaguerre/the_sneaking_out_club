"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { CameraIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useCloudinaryUploadMutation, useDeleteUserRegistrationMutation, useLazyGetUserRegistrationQuery, useUpdateUserRegistrationMutation } from "@/app/lib/redux/data-fetching/global-api";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";
import AdditionalInfoSkeleton from "../loading-skeletons/AdditionalInfoSkeleton";
import Image from "../cards/ImageCard";
import { buttonVariants } from "../shadcn/button";
import { additionalInfoSchema, cloudinarySingleUploadSchema } from "@/app/lib/util/global-helper-functions/zod-validations";
import { nanoid } from "nanoid";
import { calculateAge } from "@/app/lib/util/global-helper-functions";
import { signIn } from "next-auth/react";
import { loginUser } from "@/app/lib/database/helpers";
import { useUploadMutation } from "@/app/lib/hooks/useUploadMutation";

export default function AdditionalInfoForm() {
	const { userId } = useParams();
	const router = useRouter();

	const [formContent, setFormContent] = useState({
		dateOfBirth: "",
		age: "",
		nationality: "",
		gender: "",
		introduction: "",
		image: "",
		cloudinarySubfolder: ""
	});

	const [name, setName] = useState("upload image");

	console.log("formContent", formContent);

	const clearForm = () => {
		setFormContent({
			dateOfBirth: "",
			age: "",
			nationality: "",
			gender: "",
			introduction: "",
			image: "",
			cloudinarySubfolder: ""
		});
	};

	const department = useAtomValue(currentDepartment);

	const [getUser, getUserResults] = useLazyGetUserRegistrationQuery({ refetchOnMountOrArgChange: true, refetchOnReconnect: true });

	useEffect(() => {
		if (getUserResults.isError) {
			const message = typeof getUserResults.error === "string" ? getUserResults.error : getUserResults.error.message;
			if (message === "user not found.") {
				router.push("/register");
			} else {
				toast.error(message);
			}
		} else if (getUserResults.isSuccess) {
			// toast.success(getUserResults.data.message);
			const { results } = getUserResults.data;

			setFormContent({
				dateOfBirth: results?.dateOfBirth ?? "",
				age: results?.age ?? "",
				gender: results?.gender ?? "",
				nationality: results?.nationality ?? "",
				introduction: results?.introduction ?? "",
				cloudinarySubfolder: results?.cloudinarySubfolder
			});

			if (results?.firstName && results?.lastName) setName(`${results.firstName} ${results.lastName}`);
		}
	}, [getUserResults.isFetching]);

	useEffect(() => {
		if (userId && department) getUser({ userId, department });
	}, [userId, department]);

	const [updateUser, updateUserResults] = useUpdateUserRegistrationMutation();

	useEffect(() => {
		if (updateUserResults.isError) {
			const message = typeof updateUserResults.error === "string" ? updateUserResults.error : updateUserResults.error.message;
			if (message === "user not found.") {
				toast.error(message);
				router.push("/register");
			} else {
				toast.error(message);
			}
		} else if (updateUserResults.isSuccess) {
			toast.success(updateUserResults.data.message);

			clearForm();

			router.push("/login");
		}
	}, [updateUserResults.isLoading]);

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

	useEffect(() => {
		const age = calculateAge(formContent.dateOfBirth);

		setFormContent((prev) => ({
			...prev,
			age: age ?? ""
		}));
	}, [department, formContent.dateOfBirth]);

	const [uploadImage, uploadImageResults] = useUploadMutation({
		folder: formContent.cloudinarySubfolder,
		userId,
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

	const handleSubmit = (e) => {
		e.preventDefault();
		if (department) {
			const validation = additionalInfoSchema.safeParse(formContent);

			if (validation.success) {
				updateUser({ ...validation.data, department, userId });
			} else {
				const error = fromZodError(validation.error);
				console.log("error", error);

				error.details.map((error) => toast.error(error.message));
			}
		}
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

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

	const deleteRegistrationSchema = z.object({
		userId: z.string().trim().nonempty({ message: "registrant's ID is required." })
	});

	const [cancelRegistration, cancelRegistrationResults] = useDeleteUserRegistrationMutation();

	useEffect(() => {
		if (cancelRegistrationResults.isError) {
			const message = typeof cancelRegistrationResults.error === "string" ? cancelRegistrationResults.error : cancelRegistrationResults.error.message;
			if (message === "user does not exist.") {
				router.push("/");
			} else {
				toast.error(message);
			}
		} else if (cancelRegistrationResults.isSuccess) {
			toast.success(cancelRegistrationResults.data.message);

			clearForm();
			router.push("/");
		}
	}, [cancelRegistrationResults.isLoading]);

	const handleAccountDeletion = () => {
		const validation = deleteRegistrationSchema.safeParse({ userId });
		if (validation.success) {
			cancelRegistration({ userId: validation.data.userId, department });
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	return (
		<div className="isolate bg-white px-6 py-24 sm:py-16 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">additional Information</h2>
			</div>
			<form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20" autoComplete="on">
				<div className="grid grid-cols-1 gap-8 xl:grid-cols-6 xl:grid-rows-2 w-full">
					{getUserResults.isFetching ? (
						<AdditionalInfoSkeleton />
					) : (
						<>
							<div className="flex flex-col min-h-98 p-px xl:col-span-3 border border-gray-400 rounded-md divide-y divide-gray-200 overflow-hidden">
								<div className="p-4">
									<p className="capitalize text-center font-semibold">{name}</p>
								</div>
								<div className="p-4 flex-1">
									<Image
										image={formContent.image}
										settings={{
											alt: "user registration image",
											styles: {
												image: "object-contain object-center",
												background: "size-60 aspect-square rounded-full"
											}
										}}
									/>
								</div>
								<div className="p-4 flex justify-center items-center">
									<label htmlFor="image" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
										<CameraIcon className="size-6 fill-white stroke-gray-900" />
									</label>
								</div>
							</div>
							<div className="grid grid-cols-1 gap-4 xl:col-span-3">
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

								<div className="hidden">
									<label htmlFor="image" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
										avatar image
									</label>
									<div className="mt-2.5">
										<input onChange={handleChanges} type="file" name="image" id="image" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>
							</div>
							<div className="flex p-px xl:col-span-full">
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
						</>
					)}
				</div>

				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
					{getUserResults.isFetching ? (
						<>
							<button type="submit" disabled={true} className={classNames(buttonVariants({ variant: "greenBtn" }), "animate-pulse")} />

							<button type="button" disabled={true} className={classNames(buttonVariants({ variant: "destructiveBtn" }), "animate-pulse")} />
						</>
					) : (
						<>
							<button type="submit" disabled={updateUserResults.isLoading} className={classNames(buttonVariants({ variant: "greenBtn" }), "w-full")}>
								{updateUserResults.isLoading ? (
									<>
										please wait... <Loader2 className="w-5 h-auto animate-spin inline-block ml-3" />
									</>
								) : (
									"submit"
								)}
							</button>
							<button type="button" onClick={handleAccountDeletion} disabled={cancelRegistrationResults.isLoading} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
								{cancelRegistrationResults.isLoading ? (
									<>
										please wait... <Loader2 className="w-5 h-auto animate-spin inline-block ml-3" />
									</>
								) : (
									"cancel registration"
								)}
							</button>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
