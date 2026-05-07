import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useEffect } from "react";
import ImageCard from "./ImageCard";
import { buttonVariants } from "../shadcn/button";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { useDeleteRootFamilyMemberMutation, useManageFamilyTreeLeadershipMutation, useManageRootFamilyMembershipMutation } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";

export default function FamilyLeaderCandidateCard({ member, tree }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const [updateFamilyLeadership, updateFamilyLeadershipResults] = useManageFamilyTreeLeadershipMutation();

	useEffect(() => {
		if (updateFamilyLeadershipResults.isError) {
			const message = typeof updateFamilyLeadershipResults.error === "string" ? updateFamilyLeadershipResults.error : updateFamilyLeadershipResults.error.message;
			toast.error(message);
		} else if (updateFamilyLeadershipResults.isSuccess) {
			toast.success(updateFamilyLeadershipResults.data.message);
		}
	}, [updateFamilyLeadershipResults.isLoading, updateFamilyLeadershipResults.isSuccess, updateFamilyLeadershipResults.isError]);

	const handleLeadershipManagement = (leaderType, action) => {
		switch (leaderType) {
			case "founder":
				updateFamilyLeadership({ leaderType, action, treeId: tree._id, memberId: member._id, memberType: member.docType });
				break;
			case "current head":
				updateFamilyLeadership({ leaderType, action, treeId: tree._id, memberId: member._id, memberType: member.docType });
				break;
			case "spouse":
				updateFamilyLeadership({ leaderType, action, treeId: tree._id, memberId: member._id, memberType: member.docType });
				break;
			default:
				throw new Error("family leadership action is not authorized.");
		}
	};

	return (
		<div className="rounded-lg bg-white text-center p-8 shadow-md shadow-gray-400 dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400 aspect-square group relative">
			<div className="absolute top-0 right-0 left-0 px-4 py-5 sm:px-6 hidden group-hover:flex justify-end items-center">
				<Menu as="div" className="relative">
					<MenuButton className={classNames(buttonVariants({ variant: "blueCircularBtn" }))}>
						<EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
					</MenuButton>
					<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
						<MenuItem>
							<button onClick={() => handleLeadershipManagement("founder", "add")} className={classNames(buttonVariants({ variant: "ghostBtn" }), "hover:bg-blue-500 hover:text-white")}>
								<PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
								founder
							</button>
						</MenuItem>
						<MenuItem>
							<button onClick={() => handleLeadershipManagement("current head", "add")} className={classNames(buttonVariants({ variant: "ghostBtn" }), "hover:bg-blue-500 hover:text-white")}>
								<PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
								current head
							</button>
						</MenuItem>
						<MenuItem>
							<button onClick={() => handleLeadershipManagement("spouse", "add")} className={classNames(buttonVariants({ variant: "ghostBtn" }), "hover:bg-blue-500 hover:text-white")}>
								<PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
								spouse
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
		</div>
	);
}
