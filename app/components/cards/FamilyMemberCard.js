import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon, EllipsisVerticalIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect } from "react";
import { buttonVariants } from "../shadcn/button";
import ImageCard from "./ImageCard";
import { format } from "date-fns";
import { useDeleteFamilyMemberMutation } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { useTheme } from "../providers/ThemeProvider";

export default function FamilyMemberCard({ member, editFunction }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [deleteFamilyMember, deleteFamilyMemberResults] = useDeleteFamilyMemberMutation();

	useEffect(() => {
		if (deleteFamilyMemberResults.isError) {
			const message = typeof deleteFamilyMemberResults.error === "string" ? deleteFamilyMemberResults.error : deleteFamilyMemberResults.error.message;
			toast.error(message);
		} else if (deleteFamilyMemberResults.isSuccess) {
			toast.success(deleteFamilyMemberResults.data.message);
		}
	}, [deleteFamilyMemberResults.isLoading, deleteFamilyMemberResults.isSuccess, deleteFamilyMemberResults.isError]);

	const handleMemberDeletion = () => {
		deleteFamilyMember({ userId: member._id, docType: member.docType });
	};

	const user = useAtomValue(currentUser);

	return (
		<div className="rounded-lg bg-white text-center p-8 shadow-md shadow-gray-400 dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400 aspect-square group relative">
			<div className="absolute top-0 right-0 left-0 px-4 py-5 sm:px-6 hidden group-hover:flex justify-end items-center">
				<Menu as="div" className="relative">
					<MenuButton className={classNames(buttonVariants({ variant: "blueCircularBtn" }))}>
						<EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
					</MenuButton>
					<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
						<MenuItem>
							<button className={classNames(buttonVariants({ variant: "blueBtn" }))}>profile</button>
						</MenuItem>

						{user?._id === member?._id ? (
							<Fragment>
								<MenuItem>
									<button onClick={editFunction} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
										edit
									</button>
								</MenuItem>
								<MenuItem>
									<button onClick={handleMemberDeletion} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
										delete
									</button>
								</MenuItem>
							</Fragment>
						) : (
							user?._id === member?.creator && (
								<Fragment>
									<MenuItem>
										<button onClick={editFunction} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
											edit
										</button>
									</MenuItem>
									<MenuItem>
										<button onClick={handleMemberDeletion} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
											delete
										</button>
									</MenuItem>
								</Fragment>
							)
						)}
					</MenuItems>
				</Menu>
			</div>
			<div className="px-4">
				<ImageCard
					image={member.image}
					settings={{
						alt: "family member image",
						styles: {
							image: "object-contain object-center",
							background: "mx-auto size-32 shrink-0 rounded-full bg-gray-300 outline -outline-offset-1 outline-black/5 dark:bg-gray-700 dark:outline-white/10 aspect-square"
						}
					}}
				/>
			</div>
			<div className="px-4 shink">
				<dl className="size-full flex flex-col justify-evenly items-center text-sm">
					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">relation</dt>
						<dd className="capitalize">
							<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-500/10 dark:text-green-500 dark:inset-ring-green-500/10">{user?.family?.map((m) => (m.member === member._id ? m.role : null)).filter(Boolean)}</span>
						</dd>
					</div>
					<div className="w-full mt-3">
						<dt className="sr-only capitalize font-semibold">name</dt>
						<dd className="capitalize">
							{member.firstName} {member.lastName}
						</dd>
					</div>

					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">email</dt>
						<dd className="capitalize text-center truncate">{member.email}</dd>
					</div>

					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">phone</dt>
						<dd className="capitalize">{member.phone}</dd>
					</div>
				</dl>
			</div>

			<div className="flex divide-x divide-gray-200 dark:divide-white/10 mt-3">
				<div className="flex w-0 flex-1">
					<button className={classNames("relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-500 dark:text-white hover:bg-green-500 group hover:text-white capitalize")}>
						<EnvelopeIcon aria-hidden="true" className="size-5" />
						Email
					</button>
				</div>
				<div className="-ml-px flex w-0 flex-1">
					<button className={classNames("relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-500 dark:text-white hover:bg-red-500 hover:text-white group capitalize")}>
						<PhoneIcon aria-hidden="true" className="size-5" />
						Call
					</button>
				</div>
			</div>
		</div>
	);
}
