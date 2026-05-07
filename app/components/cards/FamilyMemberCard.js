import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon, EllipsisVerticalIcon, EnvelopeIcon, PhoneIcon, PlusIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect } from "react";
import { buttonVariants } from "../shadcn/button";
import ImageCard from "./ImageCard";
import { format } from "date-fns";
import { useDeleteFamilyMemberMutation } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { useTheme } from "../providers/ThemeProvider";
import { nanoid } from "nanoid";
import Link from "next/link";

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

	const actionOptions = [
		{
			id: nanoid(),
			label: "view profile",
			action: "view profile",
			button: buttonVariants({ variant: "ghostBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: null,
			type: "link",
			destination: "#"
		},
		{
			id: nanoid(),
			label: "family tree",
			action: "family tree",
			button: buttonVariants({ variant: "ghostBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: PlusIcon,
			type: "button",
			function: ""
		},
		{
			id: nanoid(),
			label: "family",
			action: "family",
			button: buttonVariants({ variant: "ghostBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: PlusIcon,
			type: "button",
			function: ""
		},
		{
			id: nanoid(),
			label: "email",
			action: "email",
			button: buttonVariants({ variant: "ghostBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: EnvelopeIcon,
			type: "link",
			destination: `mailTo:${member.email}`
		},
		{
			id: nanoid(),
			label: "call",
			action: "call",
			button: buttonVariants({ variant: "ghostBtn" }),
			hover: "hover:bg-blue-500 hover:text-white",
			icon: PhoneIcon,
			type: "link",
			destination: `tel:${member.phone}`
		}
	];

	return (
		<div className="rounded-lg bg-white text-center p-8 shadow-md shadow-gray-400 dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 border border-gray-400 aspect-square group relative">
			<div className="absolute top-0 right-0 left-0 px-4 py-5 sm:px-6 hidden group-hover:flex justify-end items-center">
				<Menu as="div" className="relative">
					<MenuButton className={classNames(buttonVariants({ variant: "blueCircularBtn" }))}>
						<EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
					</MenuButton>
					<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
						{actionOptions.map((option) => {
							if ((member.type === "ancestor" && option.label === "email") || (member.type === "ancestor" && option.label === "call")) return;
							if ((member._id === user._id && option.label === "email") || (member._id === user._id && option.label === "call")) return;
							if ((member._id === user._id && option.label === "family tree") || (member.creator === user._id && option.label === "family")) {
								if (option.type === "link") {
									return (
										<MenuItem key={option.id}>
											<Link href={option.destination} className={classNames(option.button, option.hover)}>
												{option?.icon && <option.icon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />}
												{option.label}
											</Link>
										</MenuItem>
									);
								} else {
									return (
										<MenuItem key={option.id}>
											<button onClick={editFunction} className={classNames(option.button, option.hover)}>
												{option?.icon && <option.icon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />}
												{option.label}
											</button>
										</MenuItem>
									);
								}
							}
							if (option.type === "link") {
								return (
									<MenuItem key={option.id}>
										<Link href={option.destination} className={classNames(option.button, option.hover)}>
											{option?.icon && <option.icon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />}
											{option.label}
										</Link>
									</MenuItem>
								);
							} else {
								return (
									<MenuItem key={option.id}>
										<button onClick={editFunction} className={classNames(option.button, option.hover)}>
											{option?.icon && <option.icon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />}
											{option.label}
										</button>
									</MenuItem>
								);
							}
						})}

						{user?._id === member?._id ? (
							<Fragment>
								<MenuItem>
									<button onClick={() => editFunction(member)} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
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
										<button onClick={() => editFunction(member)} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
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
			<div className="px-4 shink mt-2.5">
				<dl className="size-full flex flex-col justify-evenly items-center text-sm">
					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">relation</dt>
						<dd className="capitalize">
							<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-500/10 dark:text-green-500 dark:inset-ring-green-500/10">{member._id === user._id ? "You" : member?.relation?.map((family) => (family.member === user._id ? family.role : null)).filter(Boolean)}</span>
						</dd>
					</div>
					<div className="w-full mt-2">
						<dt className="sr-only capitalize font-semibold">name</dt>
						<dd className="capitalize">
							{member.firstName} {member.lastName}
						</dd>
					</div>
					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">nationality</dt>
						<dd className="capitalize">{member?.nationality}</dd>
					</div>
					<div className="w-full">
						<dt className="sr-only capitalize font-semibold">gender</dt>
						<dd className="capitalize">{member?.gender}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
