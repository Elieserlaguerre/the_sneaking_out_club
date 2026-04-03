"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fromZodError } from "zod-validation-error";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { buttonVariants } from "../shadcn/button";
import { states } from "@/app/lib/util/frontend-helper-functions";
import { useUserRegistrationMutation } from "@/app/lib/redux/data-fetching/global-api";
import { registrationFormSchema } from "@/app/lib/util/global-helper-functions/zod-validations";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";

export default function RegisterPage() {
	const department = useAtomValue(currentDepartment);

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
		country: ""
	});

	const router = useRouter();

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
			country: ""
		});
	};

	const [createUser, createUserResults] = useUserRegistrationMutation();

	useEffect(() => {
		if (createUserResults.isError) {
			if (typeof createUserResults.error === "string") {
				toast.error(createUserResults.error);
			} else {
				toast.error(createUserResults.error.message);
			}
		} else if (createUserResults.isSuccess) {
			toast.success(createUserResults.data.message);

			clearForm();

			const { results } = createUserResults.data;

			router.push(`/register/${results._id}/additional-information`);
		}
	}, [createUserResults.isLoading]);

	const handleChanges = (e) => {
		setFormContent((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (department) {
			const validation = registrationFormSchema.safeParse(formContent);
			if (validation.success) {
				createUser({ user: validation.data, department: department });
			} else {
				const error = fromZodError(validation.error);
				console.log("validation error", error);
				error.details.map((error) => toast.error(error.message));
			}
		}
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const handleRegistrationCancellation = () => {
		clearForm();

		router.push("/");
	};

	return (
		<div className="bg-white px-6 py-24 sm:py-16 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Personal Information</h2>
			</div>
			<form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20" autoComplete="on">
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
					<div className="mt-2.5 sm:col-span-full">
						<label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
							country
						</label>
						<div className="mt-2.5">
							<input onChange={handleChanges} value={formContent.country} type="text" name="country" id="country" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>
				</div>
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
					<button type="submit" disabled={createUserResults.isLoading} className={classNames(buttonVariants({ variant: "greenBtn" }))}>
						{createUserResults.isLoading ? (
							<>
								processing <Loader2 className="w-5 h-auto animate-spin inline-block ml-3" />
							</>
						) : (
							"submit"
						)}
					</button>
					<button type="button" onClick={handleRegistrationCancellation} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
						canel
					</button>
				</div>
			</form>
		</div>
	);
}
