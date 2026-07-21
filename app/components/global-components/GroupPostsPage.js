"use client";
import { useLazyGetGroupPostsQuery } from "@/app/lib/redux/data-fetching/global-api";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreateGroupPost from "../overlays/modals/CreateGroupPost";
import PostCard from "../cards/PostCard";

export default function GroupPostsPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const { groupId } = useParams();

	const [posts, setPosts] = useState([]);

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
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(pageSizes[0].value);
	const [filters, setFilters] = useState({
		sort: "newest"
	});

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const [groupPosts, groupPostsResults] = useLazyGetGroupPostsQuery();

	useEffect(() => {
		if (groupPostsResults.isError) {
			const message = typeof groupPostsResults.error === "string" ? groupPostsResults.error : groupPostsResults.error.message;
			toast.error(message);
		} else if (groupPostsResults.isSuccess) {
			// toast.success(groupPostsResults.data.message);
			const { results } = groupPostsResults.data;

			setTotalPages(results?.totalPages ?? 0);
			setPosts(results?.posts ?? []);
		}
	}, [groupPostsResults.isFetching, groupPostsResults.isSuccess, groupPostsResults.isError]);

	useEffect(() => {
		groupPosts({ groupId, page, limit, filters: JSON.stringify(filters), section: groupId, sectionType: "Group" });
	}, [page, limit, filters]);

	return (
		<div>
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-4xl lg:px-8 min-h-screen flex flex-col gap-4">
				<span className="sr-only">Group posts page</span>
				<div className="bg-gray-200 size-full p-0.5 flex flex-col gap-2.5">
					<CreateGroupPost />
					<div className="flex flex-col gap-2.5">
						{posts.map((post) => (
							<PostCard key={post._id} post={post} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
