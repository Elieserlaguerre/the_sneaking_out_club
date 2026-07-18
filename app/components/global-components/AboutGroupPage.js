"use client";
import { useGetGroupDetailsQuery } from "@/app/lib/redux/data-fetching/global-api";
import { dynamicButton, getInitials, privacyDetails, visibilityDetails } from "@/app/lib/util/global";
import { formatDate } from "date-fns";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageCard from "../cards/ImageCard";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";

export default function AboutGroupPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [group, setGroup] = useState(null);

	const { groupId } = useParams();

	const aboutGroup = useGetGroupDetailsQuery({ groupId }, { refetchOnMountOrArgChange: true, refetchOnReconnect: true });

	useEffect(() => {
		if (aboutGroup.isError) {
			const message = typeof aboutGroup.error === "string" ? aboutGroup.error : aboutGroup.error.message;
			toast.error(message);
		} else if (aboutGroup.isSuccess) {
			// toast.success(aboutGroup.data.message);
			const { results } = aboutGroup.data;
			setGroup(results);
		}
	}, [aboutGroup.isFetching, aboutGroup.isSuccess, aboutGroup.isError]);

	const department = useAtomValue(currentDepartment);

	console.log("group", group);

	return (
		<div>
			<div className="mx-auto max-w-2xl px-2.5 lg:max-w-7xl min-h-screen flex flex-col bg-gray-200">
				<span className="sr-only">about the group page</span>
				<div className="grid grid-grid-cols-1 sm:grid-cols-2 gap-2.5 py-2.5">
					<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<dl className="px-4 py-5 sm:p-6 flex flex-col gap-2.5">
							<dt className="capitalize font-medium">{group?.privacy}</dt>
							<dd className="text-sm text-gray-700">{privacyDetails(group?.privacy)}</dd>
							<dt className="capitalize font-medium">{group?.visibility}</dt>
							<dd className="text-sm text-gray-700">{visibilityDetails(group?.visibility)}</dd>
							<dt className="capitalize font-medium">Hitory</dt>
							<dd className="text-sm text-gray-700">group created on {group?.createdAt && formatDate(group?.createdAt, "MMMM dd, yyyy")}</dd>
							<dt className="capitalize font-medium">location</dt>
							<dd className="text-sm text-gray-700">
								{group?.owner?.city}, {group?.owner?.state}, {group?.owner?.country}
							</dd>
						</dl>
					</div>

					<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div className="px-4 py-5 sm:px-6 capitalize">group owner</div>
						<div className="px-4 pt-2.5 pb-5 sm:px-6 grid grid-cols-2">
							<div className="size-49 rounded-md overflow-clip">
								<ImageCard
									image={group?.owner?.image}
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
								<dl>
									<div className="">
										<dt className="font-medium capitalize">name</dt>
										<dd className="capitalize">
											{group?.owner?.firstName} {group?.owner?.lastName}
										</dd>
									</div>
									<div className="">
										<dt className="font-medium capitalize">city</dt>
										<dd className="capitalize">{group?.owner?.city}</dd>
									</div>
									<div className="">
										<dt className="font-medium capitalize">state</dt>
										<dd className="capitalize">{group?.owner?.state}</dd>
									</div>
									<div className="">
										<dt className="font-medium capitalize">country</dt>
										<dd className="capitalize">{group?.owner?.country}</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>

					<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 col-span-full">
						<div className="px-4 py-5 sm:px-6 capitalize text-center">introduction</div>
						<div className="px-4 py-5 sm:px-6 text-center">{group?.about}</div>
					</div>
					<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div className="px-4 py-5 sm:px-6 capitalize">members</div>
						<div className="px-4 py-5 sm:p-6">
							{group?.members?.length > 0 ? (
								<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10 grid grid-cols-2 lg:grid-cols-6">
									{group.members.map((list) => (
										<li key={list._id} className="py-4 flex flex-col justify-start items-center gap-1.5">
											<div className="size-12 rounded-full overflow-clip">
												<ImageCard
													image={list.member.image}
													settings={{
														alt: "group member's image",
														styles: {
															image: "object-contain object-center",
															background: "size-full"
														}
													}}
												/>
											</div>
											<div className="capitalize font-medium">{getInitials(`${list.member.firstName} ${list.member.lastName}`)}</div>
										</li>
									))}
								</ul>
							) : (
								<div className="text-center border border-gray-400 w-full py-4 rounded-sm flex flex-col justify-center items-center">
									<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No members</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This group currently does not have any active members.</p>
								</div>
							)}
						</div>
						<div className="px-4 py-5 sm:px-6">
							<Link href={`/dashboard/posts/groups/view/${group?._id}/members`} className={classNames(dynamicButton(department), "w-full")}>
								view all members
							</Link>
						</div>
					</div>
					<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div className="px-4 py-5 sm:px-6 capitalize">managers</div>
						<div className="px-4 py-5 sm:p-6">
							{group?.managers?.length > 0 ? (
								<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
									{group?.managers?.map((list) => (
										<li key={list?._id} className="py-4">
											<div>
												<ImageCard
													image={list?.manager?.image}
													settings={{
														alt: "manager's image",
														styles: {
															image: "object-contain object-center",
															background: "size-full"
														}
													}}
												/>
											</div>
											<div></div>
										</li>
									))}
								</ul>
							) : (
								<div className="text-center border border-gray-400 size-full py-4 rounded-sm flex flex-col justify-center items-center">
									<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No managers</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This group currently does not have any mangers besides the owner.</p>
								</div>
							)}
						</div>
						<div className="px-4 py-5 sm:px-6">
							<Link href={`/dashboard/posts/groups/view/${group?._id}/managers`} className={classNames(dynamicButton(department), "w-full")}>
								view all managers
							</Link>
						</div>
					</div>
					<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div className="px-4 py-5 sm:px-6 capitalize">group events</div>
						<div className="px-4 py-5 sm:p-6">
							{group?.events?.length > 0 ? (
								""
							) : (
								<div className="text-center border border-gray-400 w-full py-4 rounded-sm flex flex-col justify-center items-center">
									<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No events</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This group currently does not have any upcoming events.</p>
								</div>
							)}
						</div>
						<div className="px-4 py-5 sm:px-6">
							<Link href={`/dashboard/posts/groups/view/${group?._id}/group-events`} className={classNames(dynamicButton(department), "w-full")}>
								view all events
							</Link>
						</div>
					</div>
					<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 flex flex-col">
						<div className="px-4 py-5 sm:px-6 capitalize">group rules</div>
						<div className="px-4 py-5 sm:p-6 flex-1">
							{group?.rules?.length > 0 ? (
								<dl>
									{group?.rules?.map((list) => (
										<div key={list?._id}>
											<dt>{list?.rule}</dt>
											<dd>{list.description}</dd>
										</div>
									))}
								</dl>
							) : (
								<div className="text-center border border-gray-400 size-full py-4 rounded-sm flex flex-col justify-center items-center">
									<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No rules</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This group currently does not have any rules</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
