"use client";
import React, { useState } from "react";
import { buttonVariants } from "../shadcn/button";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function ManageFamilyPlans({ open, closingFunction }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [formContent, setFormContent] = useState({});

	const handleChanges = ({ target }) => {
		const { name, value, files } = target;
		setFormContent((prev) => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-50">
			<div className="fixed inset-0" />

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 top-16 right-0 flex max-w-md xl:pl-16">
						<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
							<form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
								<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
									<div className={classNames("px-4 py-[1.61rem] sm:px-6 bg-linear-to-br from-orange-500 to-orange-700")}>
										<div className="flex items-center justify-between">
											<DialogTitle className="text-base font-semibold text-white capitalize">Manage family plans</DialogTitle>
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
													product's name
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="name" name="name" type="text" value={formContent?.name} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="productType" className="block text-sm/6 font-medium text-gray-900 capitalize">
													product type
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="productType" name="productType" type="text" value={formContent?.productType} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														<option>select one</option>
													</select>
												</div>
											</div>
											<div>
												<label htmlFor="brand" className="block text-sm/6 font-medium text-gray-900 capitalize">
													brand
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="brand" name="brand" type="text" value={formContent?.brand} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="brandImage" className="block text-sm/6 font-medium text-gray-900 capitalize">
													brand image
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="brandImage" name="brandImage" type="file" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="category" className="block text-sm/6 font-medium text-gray-900 capitalize">
													parent category
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="category" name="category" type="text" value={formContent?.category} className="block w-full rounded-md bg-white px-3 py-1.5 text-base ext-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														<option value="">select one</option>
													</select>
												</div>
											</div>
											<div>
												<label htmlFor="subCategory" className="block text-sm/6 font-medium text-gray-900 capitalize">
													sub-category
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="subCategory" name="subCategory" type="text" value={formContent?.subCategory} className="block w-full rounded-md bg-white px-3 py-1.5 ext-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														<option value="">select one</option>
													</select>
												</div>
											</div>
											<div>
												<label htmlFor="price" className="block text-sm/6 font-medium text-gray-900 capitalize">
													price
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="price" name="price" type="text" value={formContent?.price} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="stock" className="block text-sm/6 font-medium text-gray-900 capitalize">
													stock quantity
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="stock" name="stock" type="number" min={0} value={formContent?.stock} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="discount" className="block text-sm/6 font-medium text-gray-900 capitalize">
													discount (optional)
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="discount" name="discount" type="number" min={0} value={formContent?.discount} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="store" className="block text-sm/6 font-medium text-gray-900 capitalize">
													store
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="store" name="store" type="text" value={formContent?.store} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														<option value="">select one</option>
													</select>
												</div>
											</div>
											<div>
												<label htmlFor="owner" className="block text-sm/6 font-medium text-gray-900 capitalize">
													product's owner
												</label>
												<div className="mt-2">
													<select onChange={handleChanges} id="owner" name="owner" type="text" value={formContent?.owner} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 capitalize">
														<option>select one</option>
													</select>
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
