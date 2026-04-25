import React, { useEffect } from "react";
import ImageCard from "./ImageCard";
import { EllipsisHorizontalIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { buttonVariants } from "../shadcn/button";
import { nanoid } from "nanoid";
import { useTheme } from "../providers/ThemeProvider";
import { useRouter } from "next/navigation";
import { useDeleteFamilyTreeMutation } from "@/app/lib/redux/data-fetching/parents-api";
import toast from "react-hot-toast";

export default function FamilyTreeCard({ tree, editFunction }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const router = useRouter();

	const menuOptions = [
		{
			id: nanoid(),
			label: "ancestor",
			variant: "ghostBtn",
			baseStyle: `hover:${theme.sectionNavbar.root} hover:text-white p-1.5`,
			icon: PlusIcon
		},
		{
			id: nanoid(),
			label: "root family member",
			variant: "ghostBtn",
			baseStyle: `hover:${theme.sectionNavbar.root} hover:text-white p-1.5`,
			icon: PlusIcon
		},
		{
			id: nanoid(),
			label: "family branches",
			variant: "ghostBtn",
			baseStyle: `hover:${theme.sectionNavbar.root} hover:text-white p-1.5`,
			icon: PlusIcon
		},
		{
			id: nanoid(),
			label: "family head",
			variant: "ghostBtn",
			baseStyle: `hover:${theme.sectionNavbar.root} hover:text-white p-1.5`,
			icon: PlusIcon
		},
		{
			id: nanoid(),
			label: "spouse",
			variant: "ghostBtn",
			baseStyle: `hover:${theme.sectionNavbar.root} hover:text-white p-1.5`,
			icon: PlusIcon
		},
		{
			id: nanoid(),
			label: "founder",
			variant: "ghostBtn",
			baseStyle: `hover:${theme.sectionNavbar.root} hover:text-white p-1.5`,
			icon: PlusIcon
		},
		{
			id: nanoid(),
			label: "edit family tree",
			variant: "ghostBtn",
			baseStyle: "hover:bg-yellow-500 hover:text-white p-1.5",
			icon: PencilIcon
		},
		{
			id: nanoid(),
			label: "delete family tree",
			variant: "ghostBtn",
			baseStyle: "hover:bg-red-500 hover:text-white p-1.5",
			icon: TrashIcon
		}
	];

	const handleMenuOptionActions = (action) => {
		switch (action) {
			case "ancestor":
				router.push("/family/members");
				break;
			case "root family member":
				router.push("/family/members");
				break;
			case "family branches":
				router.push("/family/branch");
				break;
			case "family head":
				break;
			case "spouse":
				break;
			case "founder":
				break;
			case "edit family tree":
				editFunction(tree);
				break;
			case "delete family tree":
				deleteFamilyTree({ treeId: tree._id });
				break;
			default:
				throw new Error("Option action not recognized.");
		}
	};

	const [deleteFamilyTree, deleteFamilyTreeResults] = useDeleteFamilyTreeMutation();

	useEffect(() => {
		if (deleteFamilyTreeResults.isError) {
			const message = typeof deleteFamilyTreeResults.error === "string" ? deleteFamilyTreeResults.error : deleteFamilyTreeResults.error.message;
			toast.error(message);
		} else if (deleteFamilyTreeResults.isSuccess) {
			toast.success(deleteFamilyTreeResults.data.message);
		}
	}, [deleteFamilyTreeResults.isLoading, deleteFamilyTreeResults.isSuccess, deleteFamilyTreeResults.isError]);

	return (
		<div className="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm aspect-square group">
			<div className="px-4 py-5 sm:p-6 relative">
				<h3 className="mt-6 text-sm font-medium text-gray-900">{tree.name}</h3>
				<Menu as="div" className="absolute top-2 right-4 hidden group-hover:block">
					<MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-inset hover:ring-gray-400">
						<EllipsisHorizontalIcon aria-hidden="true" className="w-5 text-gray-900" />
					</MenuButton>
					<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
						{menuOptions.map((option) => (
							<MenuItem key={option.id}>
								<button onClick={() => handleMenuOptionActions(option.label)} className={classNames(buttonVariants({ variant: option.variant }), option.baseStyle)}>
									<option.icon aria-hidden="true" className="mr-1.5 -ml-0.5 w-5 h-5" />
									{option.label}
								</button>
							</MenuItem>
						))}
					</MenuItems>
				</Menu>
			</div>
			<div className="flex flex-1 flex-col p-8">
				<div className="mx-auto size-32 shrink-0 rounded-full bg-gray-300 outline -outline-offset-1 outline-black/5">
					<ImageCard
						image={tree.crest}
						settings={{
							alt: "family tree crest image",
							styles: {
								image: "object-contain object-center",
								background: "size-full"
							}
						}}
					/>
				</div>

				<dl className="mt-4 grow grid grid-cols-1">
					<div className="grid grid-cols-2">
						<label className="sr-only">total ancestors</label>
						<dt className="capitalize text-sm text-right">total ancestors</dt>
						<dd className="text-sm text-gray-900">{tree.lineage.length}</dd>
					</div>

					<div className="grid grid-cols-2">
						<label className="sr-only">root family</label>
						<dt className="capitalize text-sm text-right">root family</dt>
						<dd className="text-sm text-gray-900">{tree.rootFamily.length}</dd>
					</div>

					<div className="grid grid-cols-2">
						<label className="sr-only">total families</label>
						<dt className="capitalize text-sm text-right">total families</dt>
						<dd className="text-sm text-gray-900">{tree.totalFamilies}</dd>
					</div>

					<div className="grid grid-cols-2">
						<dt className="sr-only">total members</dt>
						<dt className="capitalize text-sm text-right">total members</dt>
						<dd className="text-sm text-gray-900">{tree.totalMembers}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
