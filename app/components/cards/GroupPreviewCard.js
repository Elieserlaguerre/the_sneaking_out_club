"use client";
import { currentUser, groupPreview } from "@/app/lib/state-management/global-state";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useAtom, useAtomValue } from "jotai";
import React, { useState } from "react";
import { buttonVariants } from "../shadcn/button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { nanoid } from "zod";
import ImageCard from "./ImageCard";

export default function GroupPreviewCard({ closingFunction }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const [preview, setPreview] = useAtom(groupPreview);
	console.log("preview", preview);

	const clearForm = () => {
		setPreview({
			name: "",
			about: "",
			privacy: "",
			visibility: "",
			members: [],
			image: "",
			events: [],
			owner: "",
			ownerType: "",
			managers: [],
			groupId: ""
		});
	};

	const [value, setValue] = useState("about");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const sections = [
		{
			id: nanoid(),
			name: "about"
		},
		{
			id: nanoid(),
			name: "posts"
		},
		{
			id: nanoid(),
			name: "members"
		},
		{
			id: nanoid(),
			name: "events"
		},
		{
			id: nanoid(),
			name: "managers"
		}
	];

	const privacyDetails = (type) => {
		switch (type) {
			case "private":
				return "Only members can see who's in the group and what they post.";
			case "public":
				return "Anyone can see who's in the group and what they post.";
			default:
				return;
		}
	};

	const visibilityDetails = (type) => {
		switch (type) {
			case "visible":
				return "Anyone can find this group";
			case "hidden":
				return "Only members can find this group.";
			default:
				return;
		}
	};

	const [groupStats, setGroupStats] = useState([
		{
			name: "posts",
			value: 0
		},
		{
			name: "members",
			value: preview.members.length
		},
		{
			name: "events",
			value: preview.events.length
		},
		{
			name: "managers",
			value: preview.managers.length
		}
	]);

	const ownerDetails = (owner) => {
		switch (true) {
			case typeof owner === "string" && owner === user._id:
				return (
					<div className="w-full flex justify-start items-center gap-1.5">
						<div className="border border-gray-400 size-12 rounded-full overflow-clip">
							<ImageCard
								image={user.image}
								settings={{
									alt: "group owner",
									styles: {
										image: "object-contain object-center",
										background: "size-full"
									}
								}}
							/>
						</div>
						<div className="">
							<p className="capitalize font-medium">{user?.name}</p>
							<span className="text-sm">owner</span>
						</div>
					</div>
				);
			case typeof owner === "object":
				return (
					<div className="w-full flex justify-start items-center gap-1.5">
						<div className="border border-gray-400 size-12 rounded-full overflow-clip">
							<ImageCard
								image={owner.image}
								settings={{
									alt: "group owner",
									styles: {
										image: "object-contain object-center",
										background: "size-full"
									}
								}}
							/>
						</div>
						<div>
							<p className="capitalize font-medium">
								{owner?.firstName} {owner?.lastName}
							</p>
							<span className="text-sm capitalize">owner</span>
						</div>
					</div>
				);
			default:
				return (
					<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div className="px-4 py-5 sm:p-6">owner not recognized</div>
					</div>
				);
		}
	};

	const dynamicTabDisplay = (section) => {
		switch (section) {
			case "about":
				return (
					<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 size-full flex-1">
						<div className="px-4 py-5 sm:p-6">
							<div className="grid grid-cols-1 sm:grid-cols-2 mt-2.5 gap-2.5">
								<div>
									<dl role="list" className="divide-y divide-gray-200 dark:divide-white/10 size-full grid grid-cols-2">
										{groupStats.map((stat) => (
											<div key={stat.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 ">
												<dt className="text-sm/6 font-medium text-gray-900 capitalize">{stat.name}</dt>
												<dd className="w-full flex-none text-lg font-medium tracking-tight text-gray-900">{stat.value}</dd>
											</div>
										))}
									</dl>
								</div>
								<div>
									{ownerDetails(preview.owner)}
									<dl className="size-full flex flex-col justify-evenly items-center gap-1.5">
										<div className="w-full">
											<dt className="capitalize font-medium">{preview.privacy}</dt>
											<dd className="">{privacyDetails(preview.privacy)}</dd>
										</div>
										<div className="w-full">
											<dt className="capitalize font-medium">{preview.visibility}</dt>
											<dd className="">{visibilityDetails(preview.visibility)}</dd>
										</div>
										<div className="w-full">
											<dt className="capitalize font-medium">{preview.about && "description"}</dt>
											<dd>{preview.about}</dd>
										</div>
									</dl>
								</div>
							</div>
						</div>
					</div>
				);
			case "posts":
				return (
					<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 size-full flex-1 flex flex-col">
						<div className="px-4 py-5 sm:p-6 w-full sm:w-3/5 mx-auto flex-1 bg-gray-200">{section}</div>
					</div>
				);
			case "members":
				return (
					<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 size-full flex-1">
						<div className="px-4 py-5 sm:p-6">{section}</div>
					</div>
				);
			case "events":
				return (
					<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 size-full flex-1">
						<div className="px-4 py-5 sm:p-6">{section}</div>
					</div>
				);
			case "managers":
				return (
					<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 size-full flex-1">
						<div className="px-4 py-5 sm:p-6">{section}</div>
					</div>
				);
			default:
				return (
					<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 size-full flex-1">
						<div className="px-4 py-5 sm:p-6">section not recognized!</div>
					</div>
				);
		}
	};

	const handleComponentClosure = () => {
		clearForm();
		closingFunction();
	};

	return (
		<div className="rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 min-h-screen">
			<div className="px-4 py-5 sm:p-6 flex flex-col gap-2.5 size-full">
				<div className="flex justify-between items-center">
					<span className="capitalize font-medium text-lg text-gray-900">group preview</span>
					<button onClick={handleComponentClosure} className={classNames(buttonVariants({ variant: "grayCircularBtn" }), "hover:bg-red-500! cursor-pointer")}>
						<XMarkIcon className="size-5" />
					</button>
				</div>
				<div className="min-h-96 bg-gray-300 mt-4 rounded-lg">
					<ImageCard
						image={preview.image}
						settings={{
							alt: "group cover image",
							styles: {
								image: "object-contain object-center",
								background: "size-full"
							}
						}}
					/>
				</div>
				<div className="border-b border-gray-300 py-3">
					<h1 className="text-3xl font-bold capitalize text-gray-900">{preview?.name ? preview.name : "group name"}</h1>
				</div>
				<div className="size-full">
					<TabContext value={value} className="size-full">
						<TabList onChange={handleChange} aria-label="group preview sections">
							{sections.map((section) => (
								<Tab label={section.name} value={section.name} />
							))}
						</TabList>

						{sections.map((section) => (
							<TabPanel key={section.name} value={section.name} className="bg-gray-200 min-h-96 p-0! size-full flex flex-col mt-1.5">
								{dynamicTabDisplay(section.name)}
							</TabPanel>
						))}
					</TabContext>
				</div>
			</div>
		</div>
	);
}
