"use client";
import { useLazyGetGroupFeedQuery } from "@/app/lib/redux/data-fetching/global-api";
import { currentUser } from "@/app/lib/state-management/global-state";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PostCard from "../cards/PostCard";
import PostCardSkeleton from "../loading-skeletons/PostCardSkeleton";

export default function GroupFeedPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);

	const pageSizes = [
		{
			id: nanoid(),
			value: 25
		},
		{
			id: nanoid(),
			value: 50
		},
		{
			id: nanoid(),
			value: 75
		},
		{
			id: nanoid(),
			value: 100
		}
	];
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(pageSizes[0].value);

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const [feed, setFeed] = useState([]);

	const [getGroupPosts, getGroupPostsResults] = useLazyGetGroupFeedQuery();

	useEffect(() => {
		if (getGroupPostsResults.isError) {
			const message = typeof getGroupPostsResults.error === "string" ? getGroupPostsResults.error : getGroupPostsResults.error.message;
			toast.error(message);
		} else if (getGroupPostsResults.isSuccess) {
			// toast.success(getGroupPostsResults.data.message);
			const { results } = getGroupPostsResults.data;
			setFeed(results);
		}
	}, [getGroupPostsResults.isFetching, getGroupPostsResults.isSuccess, getGroupPostsResults.isError]);

	useEffect(() => {
		if (user) {
			getGroupPosts({ userId: user._id, userType: user.docType, page, limit });
		}
	}, [user, page, limit]);

	return (
		<div className="size-full bg-white min-h-screen">
			<div className="mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-3xl lg:p-8 flex flex-col gap-4 bg-gray-200 size-full">
				<span className="sr-only">Group Feed Page</span>
				{getGroupPostsResults.isFetching ? (
					Array.from({ length: 4 }).map((_, idx) => <PostCardSkeleton key={`loading_skeleton_${idx}`} />)
				) : feed.length > 0 ? (
					feed.map((post) => <PostCard key={post._id} post={post} />)
				) : (
					<div className="text-center border border-gray-400 w-full py-4 rounded-sm flex flex-col justify-center items-center size-full">
						<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No group posts</h3>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Posts from the groups you're a part of will appear here.</p>
					</div>
				)}
			</div>
		</div>
	);
}
