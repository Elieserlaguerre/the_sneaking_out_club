import React, { useEffect } from "react";
import ImageCard from "./ImageCard";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { buttonVariants } from "../shadcn/button";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { useDeleteFamilyTreeBranchMutation, useManageFamilyTreeBranchesMutation } from "@/app/lib/redux/data-fetching/parents-api";

export default function FamilyBranchCard({ family, tree, settings }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const handleFamilyMembership = (action) => {
		switch (action) {
			case "add":
				manageBranches({ action, treeId: tree._id, branchId: family._id });
				break;
			case "remove":
				manageBranches({ action, treeId: tree._id, branchId: family._id });
				break;
			default:
				throw new Error("family membership action is not recognized.");
		}
	};

	const [manageBranches, manageBranchesResults] = useManageFamilyTreeBranchesMutation();

	useEffect(() => {
		if (manageBranchesResults.isError) {
			const message = typeof manageBranchesResults.error === "string" ? manageBranchesResults.error : manageBranchesResults.error.message;
			toast.error(message);
		} else if (manageBranchesResults.isSuccess) {
			toast.success(manageBranchesResults.data.message);
		}
	}, [manageBranchesResults.isLoading, manageBranchesResults.isSuccess, manageBranchesResults.isError]);

	const [deleteHousehold, deleteHouseholdResults] = useDeleteFamilyTreeBranchMutation();

	useEffect(() => {
		if (deleteHouseholdResults.isError) {
			const message = typeof deleteHouseholdResults.error === "string" ? deleteHouseholdResults.error : deleteHouseholdResults.error.message;
			toast.error(message);
		} else if (deleteHouseholdResults.isSuccess) {
			toast.success(deleteHouseholdResults.data.message);
		}
	}, [deleteHouseholdResults.isLoading, deleteHouseholdResults.isSuccess, deleteHouseholdResults.isError]);

	const handleBranchDeletion = () => {
		if (family.creator !== user._id) return toast.error("You are not authorized to delete this family branch.");
		deleteHousehold({ familyId: family._id });
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
							<Link href={"/family/branches"} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
								edit
							</Link>
						</MenuItem>
						<MenuItem>
							<button onClick={handleBranchDeletion} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
								delete
							</button>
						</MenuItem>
					</MenuItems>
				</Menu>
			</div>

			<div className="p-2">
				<ImageCard
					image={family.crest}
					settings={{
						alt: "family crest image",
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
						<dt className="sr-only capitalize font-semibold text-nowrap">name</dt>
						<dd className="capitalize text-nowrap">{family.name}</dd>
					</div>
					<div className="w-full mt-3">
						<dt className="sr-only capitalize font-semibold text-nowrap">motto</dt>
						<dd className="capitalize truncate">{family.motto}</dd>
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
