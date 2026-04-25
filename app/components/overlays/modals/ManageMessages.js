"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { buttonVariants } from "../shadcn/button";
import { useSetAtom } from "jotai";
import { openMessages } from "@/app/lib/state-management/global-state";

export default function ManageMessages({ open }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const setOpen = useSetAtom(openMessages);

	const closingFunction = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-10">
			<DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50" />

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div>
							<div className="bg-linear-to-br from-blue-500 to-blue-700 p-4 rounded-t-md">
								<DialogTitle as="h3" className="text-base font-semibold text-white text-center capitalize">
									new message
								</DialogTitle>
							</div>
							<div className="mt-3 text-center sm:mt-5">
								<p className="text-sm text-gray-500 dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.</p>
							</div>
						</div>
						<div className="mt-5 sm:mt-6 grid sm:grid-flow-row-dense sm:grid-cols-2 gap-3">
							<button type="button" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
								submit
							</button>
							<button type="button" data-autofocus onClick={closingFunction} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
								Cancel
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
