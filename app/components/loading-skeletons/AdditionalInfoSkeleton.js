import React, { Fragment } from "react";
import { buttonVariants } from "../shadcn/button";

export default function AdditionalInfoSkeleton() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<Fragment>
			<div className="flex justify-center items-center h-96 p-px xl:col-span-3">
				<div className="border border-gray-400 bg-gray-400 animate-pulse w-full h-full flex flex-col justify-between items-center rounded-md">
					<div className="w-full py-4">
						<h2 className="capitalize text-center bg-gray-300 py-3 animate-pulse w-1/2 mx-auto rounded-md" />
					</div>
					<div className="flex flex-col justify-evenly items-center grow h-32 w-full">
						<div className="w-10/12 h-[83%] md:w-5/12 md:h-[41%] xl:w-9/12 xl:h-[75%] rounded-full bg-gray-300 animate-pulse" />
						<p className="mt-4 capitalize font-semibold text-gray-700 text-lg py-3 bg-gray-300 w-1/2 rounded-md" />
					</div>
					<div className="flex justify-center items-center">
						<label htmlFor="image" className={classNames(buttonVariants({ variant: "greenBtn" }), "mb-3 w-12 animate-pulse")} />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 xl:col-span-3">
				<div>
					<label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 capitalize bg-gray-400 py-3 w-1/2 rounded-md animate-pulse" />

					<div className="mt-2.5">
						<div type="date" id="dateOfBirth" className="block w-full rounded-md border-0 px-3.5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-400 animate-pulse" />
					</div>
				</div>
				<div>
					<label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 capitalize bg-gray-400 py-3 w-1/2 rounded-md animate-pulse" />

					<div className="mt-2.5">
						<div type="date" id="dateOfBirth" className="block w-full rounded-md border-0 px-3.5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-400 animate-pulse" />
					</div>
				</div>
				<div>
					<label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 capitalize bg-gray-400 py-3 w-1/2 rounded-md animate-pulse" />

					<div className="mt-2.5">
						<div type="date" id="dateOfBirth" className="block w-full rounded-md border-0 px-3.5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-400 animate-pulse" />
					</div>
				</div>
				<div>
					<label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 capitalize bg-gray-400 py-3 w-1/2 rounded-md animate-pulse" />

					<div className="mt-2.5">
						<div type="date" id="dateOfBirth" className="block w-full rounded-md border-0 px-3.5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-400 animate-pulse" />
					</div>
				</div>
			</div>
			<div className="flex p-px xl:col-span-full">
				<div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
					<div>
						<label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 capitalize bg-gray-400 py-3 w-1/2 rounded-md animate-pulse" />

						<div className="mt-2.5">
							<div type="date" id="dateOfBirth" className="block w-full rounded-md border-0 px-3.5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-400 animate-pulse" />
						</div>
					</div>
					<div>
						<label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 capitalize bg-gray-400 py-3 w-1/2 rounded-md animate-pulse" />

						<div className="mt-2.5">
							<div type="date" id="dateOfBirth" className="block w-full rounded-md border-0 px-3.5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-400 animate-pulse" />
						</div>
					</div>
					<div>
						<label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 capitalize bg-gray-400 py-3 w-1/2 rounded-md animate-pulse" />

						<div className="mt-2.5">
							<div type="date" id="dateOfBirth" className="block w-full rounded-md border-0 px-3.5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-400 animate-pulse" />
						</div>
					</div>
					<div>
						<label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 capitalize bg-gray-400 py-3 w-1/2 rounded-md animate-pulse" />

						<div className="mt-2.5">
							<div type="date" id="dateOfBirth" className="block w-full rounded-md border-0 px-3.5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-400 animate-pulse" />
						</div>
					</div>
					<div className="col-span-full">
						<label htmlFor="introduction" className="block text-sm font-semibold leading-6 text-gray-900 capitalize py-3 w-1/2 rounded-md animate-pulse bg-gray-400" />
						<div className="mt-2.5">
							<textarea type="text" name="introduction" id="introduction" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-400 animate-pulse" placeholder="introduce yourself" rows={5} />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
