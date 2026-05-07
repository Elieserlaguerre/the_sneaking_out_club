import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useEffect } from "react";
import ImageCard from "./ImageCard";
import { buttonVariants } from "../shadcn/button";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { useDeleteRootFamilyMemberMutation, useManageRootFamilyMembershipMutation } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";

export default function RootMemberCard({ member, tree }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const [manageRootMembership, manageRootMembershipResults] = useManageRootFamilyMembershipMutation();

	useEffect(() => {
		if (manageRootMembershipResults.isError) {
			const message = typeof manageRootMembershipResults.error === "string" ? manageRootMembershipResults.error : manageRootMembershipResults.error.message;
			toast.error(message);
		} else if (manageRootMembershipResults.isSuccess) {
			toast.success(manageRootMembershipResults.data.message);
		}
	}, [manageRootMembershipResults.isLoading, manageRootMembershipResults.isSuccess, manageRootMembershipResults.isError]);

	const handleFamilyMembership = (action) => {
		switch (action) {
			case "add":
				manageRootMembership({ action, memberId: member._id, treeId: tree._id, userType: member.docType });
				break;
			case "remove":
				manageRootMembership({ action, memberId: member._id, treeId: tree._id, userType: member.docType });
				break;
			default:
				throw new Error("family membership action is not recognized.");
		}
	};

	const [deleteRootMember, deleteRootMemberResults] = useDeleteRootFamilyMemberMutation();

	useEffect(() => {
		if (deleteRootMemberResults.isError) {
			const message = typeof deleteRootMemberResults.error === "string" ? deleteRootMemberResults.error : deleteRootMemberResults.error.message;
			toast.error(message);
		} else if (deleteRootMemberResults.isSuccess) {
			toast.success(deleteRootMemberResults.data.message);
		}
	}, [deleteRootMemberResults.isLoading, deleteRootMemberResults.isSuccess, deleteRootMemberResults.isError]);

	const handleMemberDeletion = () => {
		if (member._id !== user._id || member.creator !== user._id) return toast.error("You're not authorized to delete this user.");

		deleteRootMember({
			memberId: member._id,
			memberType: member.docType,
			treeId: tree._id
		});
	};

	return (
		<div className="rounded-lg bg-white text-center p-8 shadow-md shadow-gray-400 dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400 aspect-square group relative">
			<div className="absolute top-0 right-0 left-0 px-4 py-5 sm:px-6 hidden group-hover:flex justify-end items-center">
				<Menu as="div" className="relative">
					<MenuButton className={classNames(buttonVariants({ variant: "blueCircularBtn" }))}>
						<EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
					</MenuButton>
					<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
						<MenuItem>
							<Link href={"/family/members"} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
								edit
							</Link>
						</MenuItem>
						<MenuItem>
							<button onClick={handleMemberDeletion} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
								delete
							</button>
						</MenuItem>
					</MenuItems>
				</Menu>
			</div>

			<div className="p-2">
				<ImageCard
					image={member.image}
					settings={{
						alt: "root family member image",
						styles: {
							image: "object-contain object-center",
							background: "mx-auto size-32 shrink-0 rounded-full bg-gray-300 outline -outline-offset-1 outline-black/5 dark:bg-gray-700 dark:outline-white/10 aspect-square"
						}
					}}
				/>
			</div>
			<div className="p-2 shink">
				<dl className="size-full flex flex-col justify-evenly items-center text-sm">
					<div className="w-full mt-3">
						<dt className="sr-only capitalize font-semibold">relation</dt>
						<dd className="capitalize">{member?._id === user?._id ? "you" : member?.relation.map((family) => (family.member === user._id ? family.role : null)).filter(Boolean)}</dd>
					</div>
					<div className="w-full mt-3">
						<dt className="sr-only capitalize font-semibold text-nowrap">name</dt>
						<dd className="capitalize text-nowrap">
							{member.firstName} {member.lastName}
						</dd>
					</div>
				</dl>
			</div>

			<div className="flex divide-x divide-gray-200 dark:divide-white/10">
				<div className="flex w-0 flex-1">
					<button onClick={() => handleFamilyMembership("add")} className={classNames("relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-500 dark:text-white hover:bg-green-500 group hover:text-white capitalize")}>
						add
					</button>
				</div>
				<div className="-ml-px flex w-0 flex-1">
					<button onClick={() => handleFamilyMembership("remove")} className={classNames("relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-500 dark:text-white hover:bg-red-500 hover:text-white group capitalize")}>
						remove
					</button>
				</div>
			</div>
		</div>
	);
}
