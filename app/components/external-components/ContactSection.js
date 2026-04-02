"use client";
import { currentDepartment } from "@/app/lib/state-management/global-state";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useAtomValue } from "jotai";
import { buttonVariants } from "../shadcn/button";
import { useEffect, useState } from "react";
import { contactUsSchema } from "@/app/lib/util/global-helper-functions/zod-validations";
import { useContactUsMutation } from "@/app/lib/redux/data-fetching/global-api";
import toast from "react-hot-toast";
import { fromZodError } from "zod-validation-error";
import { Loader2 } from "lucide-react";

export default function ContactSection() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const department = useAtomValue(currentDepartment);

	const dynamicButtonStyle = (department) => {
		switch (department) {
			case "members":
				return buttonVariants({ variant: "blueBtn" });
			case "parents":
				return buttonVariants({ variant: "orangeBtn" });
			case "teachers":
				return buttonVariants({ variant: "greenBtn" });
			case "admin":
				return buttonVariants({ variant: "indigoBtn" });
			case "careers":
				return buttonVariants({ variant: "cyanBtn" });
			default:
				throw new Error("Department not recognized.");
		}
	};

	const [formContent, setFormContent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		subject: "",
		message: ""
	});

	const clearForm = () => {
		setFormContent({
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			subject: "",
			message: ""
		});
	};

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;
		setFormContent((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const [sendMessage, sendMessageResults] = useContactUsMutation();

	useEffect(() => {
		if (sendMessageResults.isError) {
			const message = typeof sendMessageResults.error === "string" ? sendMessageResults.error : sendMessageResults.error.message;
			toast.error(message);
		} else if (sendMessageResults.isSuccess) {
			toast.success(sendMessageResults.data.message);

			clearForm();
		}
	}, [sendMessageResults.isLoading]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = contactUsSchema.safeParse(formContent);

		if (validation.success) {
			sendMessage({ ...validation.data, department });
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	return (
		<div id="contact_section" className="relative isolate bg-white">
			<div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
				<div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
					<div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
						<div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
							<svg aria-hidden="true" className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200">
								<defs>
									<pattern x="100%" y={-1} id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width={200} height={200} patternUnits="userSpaceOnUse">
										<path d="M130 200V.5M.5 .5H200" fill="none" />
									</pattern>
								</defs>
								<rect width="100%" height="100%" strokeWidth={0} className="fill-white" />
								<svg x="100%" y={-1} className="overflow-visible fill-gray-50">
									<path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
								</svg>
								<rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
							</svg>
							<div aria-hidden="true" className="absolute top-[calc(100%-13rem)] -left-56 hidden transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]">
								<div
									style={{
										clipPath: "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)"
									}}
									className="aspect-1155/678 w-288.75 bg-linear-to-br from-[#80caff] to-[#4f46e5] opacity-10"
								/>
							</div>
						</div>
						<h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl uppercase">contact us</h2>
						<p className="mt-6 text-lg/8 text-gray-600">If you have any questions, please feel free to get in touch with us via phone, text, email, or stop by one of our locations.</p>

						<div className="mt-10 divide-y divide-gray-200">
							<div className="text-xl font-semibold tracking-tight text-pretty text-gray-900 uppercase">contact information</div>
							<div className="px-4 py-5 sm:p-6">
								<dl className="space-y-4 text-base/7 text-gray-600 grid grid-cols-1 sm:grid-cols-2">
									<div className="flex gap-x-4">
										<dt className="flex-none">
											<span className="sr-only">Telephone</span>
											<PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
										</dt>
										<dd>
											<a href="tel:+1 (555) 234-5678" className="hover:text-gray-900">
												+1 (555) 234-5678
											</a>
										</dd>
									</div>
									<div className="flex gap-x-4">
										<dt className="flex-none">
											<span className="sr-only">Email</span>
											<EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
										</dt>
										<dd>
											<a href="mailto:support@thesneakingoutclub.com" className="hover:text-gray-900">
												support@thesneakingoutclub.com
											</a>
										</dd>
									</div>
									<div className="flex gap-x-4">
										<dt className="flex-none">
											<span className="sr-only">Address</span>
											<MapPinIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
										</dt>
										<dd>
											545 Mavis Island
											<br />
											Chicago, IL 99191
										</dd>
									</div>
								</dl>
							</div>
						</div>

						<div className="mt-10 divide-y divide-gray-200">
							<div className="text-xl font-semibold tracking-tight text-pretty text-gray-900 uppercase">business hours</div>
							<div className="px-4 py-5 sm:p-6">
								<dl className="text-base/7 text-gray-600 grid grid-cols-1 sm:grid-cols-3 gap-3">
									<div className="flex flex-col justify-center items-center gap-x-4">
										<dt className="flex-none">
											<span className="sr-only">week days</span>
											Monday - Friday
										</dt>
										<dd className="text-sm">9:00 AM – 6:00 PM</dd>
									</div>
									<div className="flex flex-col justify-center items-center gap-x-4">
										<dt className="flex-none">
											<span className="sr-only">Saturday</span>
											Saturday
										</dt>
										<dd>Closed</dd>
									</div>
									<div className="flex flex-col justify-center items-center gap-x-4">
										<dt className="flex-none">
											<span className="sr-only">Sunday</span>
											Sunday
										</dt>
										<dd>Closed</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				</div>
				<form onSubmit={handleSubmit} method="POST" className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
					<div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<div>
								<label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
									First name
								</label>
								<div className="mt-2.5">
									<input onChange={handleChanges} id="first-name" name="firstName" value={formContent.firstName} type="text" autoComplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
								</div>
							</div>
							<div>
								<label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
									Last name
								</label>
								<div className="mt-2.5">
									<input onChange={handleChanges} id="last-name" name="lastName" value={formContent.lastName} type="text" autoComplete="family-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
								</div>
							</div>
							<div>
								<label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
									Email
								</label>
								<div className="mt-2.5">
									<input onChange={handleChanges} id="email" name="email" value={formContent.email} type="email" autoComplete="email" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
								</div>
							</div>
							<div>
								<label htmlFor="phoneNumber" className="block text-sm/6 font-semibold text-gray-900">
									Phone number
								</label>
								<div className="mt-2.5">
									<input onChange={handleChanges} id="phoneNumber" name="phone" value={formContent.phone} type="tel" autoComplete="tel" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
								</div>
							</div>
							<div className="sm:col-span-2">
								<label htmlFor="subject" className="block text-sm/6 font-semibold text-gray-900">
									subject
								</label>
								<div className="mt-2.5">
									<input onChange={handleChanges} id="subject" name="subject" value={formContent.subject} type="tel" autoComplete="tel" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
								</div>
							</div>
							<div className="sm:col-span-2">
								<label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
									Message
								</label>
								<div className="mt-2.5">
									<textarea onChange={handleChanges} id="message" name="message" value={formContent.message} rows={5} className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
								</div>
							</div>
						</div>
						<div className="mt-8 flex justify-end">
							<button type="submit" disabled={sendMessageResults.isLoading} className={dynamicButtonStyle(department)}>
								{sendMessageResults.isLoading ? (
									<>
										processing... <Loader2 className="w-5 h-auto animate-spin inline-block ml-3" />
									</>
								) : (
									"send message"
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
