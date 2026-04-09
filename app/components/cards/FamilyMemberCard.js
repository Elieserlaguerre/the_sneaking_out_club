import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import React, { useEffect } from "react";
import { buttonVariants } from "../shadcn/button";
import ImageCard from "./ImageCard";
import { format } from "date-fns";
import { useDeleteFamilyMemberMutation } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";

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
		deleteFamilyMember({ userId: member._id });
	};

	return (
		<div className="rounded-lg bg-white text-center p-8 shadow-md shadow-gray-400 dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400 aspect-square group relative">
			<div className="absolute top-0 right-0 left-0 px-4 py-5 sm:px-6 hidden group-hover:flex justify-end items-center">
				<Menu as="div" className="relative hidden sm:block">
					<MenuButton className={classNames(buttonVariants({ variant: "blueCircularBtn" }))}>
						<EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
					</MenuButton>
					<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
						<MenuItem>
							<button className={classNames(buttonVariants({ variant: "blueBtn" }))}>profile</button>
						</MenuItem>
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
					</MenuItems>
				</Menu>
			</div>
			<div className="px-4 py-5 sm:p-6">
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
			<div className="px-4 py-4 sm:px-6">
				<dl className="size-full flex flex-col justify-evenly items-center text-sm">
					<div className="flex justify-between items-center w-full">
						<dt className="capitalize font-semibold">name</dt>
						<dd className="capitalize">
							{member.firstName} {member.lastName}
						</dd>
					</div>
					<div className="flex justify-between items-center w-full">
						<dt className="capitalize font-semibold">phone</dt>
						<dd className="capitalize">{member.phone}</dd>
					</div>
					<div className="flex justify-between items-center w-full">
						<dt className="capitalize font-semibold">DOB</dt>
						<dd className="capitalize">{format(member.dateOfBirth, "MM/dd/yyyy")}</dd>
					</div>
					<div className="flex justify-between items-center w-full">
						<dt className="capitalize font-semibold">age</dt>
						<dd className="capitalize">{member.age}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
