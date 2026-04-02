"use client";
import { useLazyLoginToAccountQuery } from "@/app/lib/redux/data-fetching/global-api";
import { currentDepartment } from "@/app/lib/state-management/global-state";
import { dynamicLayoutThemeColor } from "@/app/lib/util/frontend-helper-functions";
import { loginSchema } from "@/app/lib/util/global-helper-functions/zod-validations";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { buttonVariants } from "../shadcn/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { fromZodError } from "zod-validation-error";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const department = useAtomValue(currentDepartment);

	const router = useRouter();

	const [theme, setTheme] = useState(null);

	useEffect(() => {
		if (department) {
			const departmentTheme = dynamicLayoutThemeColor(department);
			setTheme(departmentTheme);
		}
	}, [department]);

	const [formContent, setFormContent] = useState({
		email: "",
		password: "",
		department: ""
	});

	const clearForm = () => {
		setFormContent({
			email: "",
			password: "",
			department
		});
	};

	useEffect(() => {
		if (department)
			setFormContent((content) => ({
				...content,
				department
			}));
	}, [department]);

	const [login, loginResults] = useLazyLoginToAccountQuery();

	async function initiateLogin(verifiedUser) {
		const login = await signIn("credentials", { email: verifiedUser.email, password: verifiedUser.password, department, redirect: false });

		if (login.ok) {
			toast.success("login successful.");

			router.push("/dashboard");
		} else {
			toast.error("Login failed. Check your username or password then try again!");
			// console.log("login error", login.error);
		}
	}

	useEffect(() => {
		if (loginResults.isError) {
			const message = typeof loginResults.error === "string" ? loginResults.error : loginResults.error.message;
			toast.error(message);
		} else if (loginResults.isSuccess) {
			toast.success(loginResults.data.message);

			const { results } = loginResults.data;

			initiateLogin(results);

			clearForm();
		}
	}, [loginResults.isFetching]);

	const handleChanges = ({ target }) => {
		const { name, value } = target;
		setFormContent((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = loginSchema.safeParse(formContent);

		if (validation.success) {
			login(validation.data);
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	return (
		department && (
			<div className={classNames(theme?.base, "min-h-screen flex flex-col justify-center items-center")}>
				<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-lg sm:min-w-md">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<img alt="Your Company" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" className="mx-auto h-10 w-auto dark:hidden" />
						<img alt="Your Company" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" className="mx-auto h-10 w-auto not-dark:hidden" />
						<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Sign in to your {department} account</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
									Email address
								</label>
								<div className="mt-2">
									<input onChange={handleChanges} id="email" name="email" type="email" required autoComplete="email" value={formContent.email} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
										Password
									</label>
									<div className="text-sm">
										<Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
											Forgot password?
										</Link>
									</div>
								</div>
								<div className="mt-2">
									<input onChange={handleChanges} id="password" name="password" type="password" required autoComplete="current-password" value={formContent.password} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
								</div>
							</div>

							<div>
								<button type="submit" disabled={loginResults.isFetching} className={classNames(buttonVariants({ variant: "indigoBtn" }), "w-full")}>
									{loginResults.isLoading ? (
										<>
											processing <Loader2 className="w-5 h-auto animate-spin inline-block ml-3" />
										</>
									) : (
										"sign in"
									)}
								</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
							Not a member?
							<Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 capitalize ml-0.5">
								create an account
							</Link>
						</p>
					</div>
				</div>
			</div>
		)
	);
}
