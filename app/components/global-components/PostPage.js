"use client";
import PostCard from "@/app/components/cards/PostCard";
import CreatePost from "@/app/components/overlays/modals/CreatePost";
import { useTheme } from "@/app/components/providers/ThemeProvider";
import { useLazyGetPostsQuery } from "@/app/lib/redux/data-fetching/global-api";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PostPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const user = useAtomValue(currentUser);
	const department = useAtomValue(currentDepartment);
	console.log("department", department);

	const navlinks = [
		{
			id: nanoid(),
			name: "all posts",
			destination: "#",
			type: "button"
		},
		{
			id: nanoid(),
			name: "from friends",
			destination: "#",
			type: "button"
		},
		{
			id: nanoid(),
			name: "memories",
			destination: "/dashboard/posts/memories",
			type: "link"
		},
		{
			id: nanoid(),
			name: "groups",
			destination: "/dashboard/posts/groups",
			type: "link"
		},
		{
			id: nanoid(),
			name: "saved",
			destination: "/dashboard/posts/saved",
			type: "link"
		}
	];

	const theme = useTheme();
	console.log("theme", theme);

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

	const [posts, setPosts] = useState([]);

	const [getPosts, getPostResults] = useLazyGetPostsQuery();

	useEffect(() => {
		if (getPostResults.isError) {
			const message = typeof getPostResults.error === "string" ? getPostResults.error : getPostResults.error.message;
			toast.error(message);
		} else if (getPostResults.isSuccess) {
			// toast.success(getPostResults.data.message);
			const { results } = getPostResults.data;
			console.log("posts", results.posts);
			setTotalPages(results?.totalPages ?? 0);
			setPosts(results?.posts ?? []);
		}
	}, [getPostResults.isFetching, getPostResults.isSuccess, getPostResults.isError]);

	useEffect(() => {
		if (user) {
			getPosts({ userId: user._id, page, limit, filters: JSON.stringify(filters) });
		}
	}, [user, page, limit, filters]);

	const [promotions, setPromotions] = useState([]);

	const navHighlight = () => {
		switch (department) {
			case "members":
				return "hover:bg-red-600 hover:text-white";
			case "parents":
				return "hover:bg-blue-600 hover:text-white";
			case "teachers":
				return "hover:bg-orange-600 hover:text-white";
			default:
				return;
		}
	};

	return (
		<div>
			<div className="mx-auto w-full px-4 sm:px-6 lg:w-11/12 lg:px-8 min-h-screen flex flex-col py-10">
				<span className="sr-only">post page</span>
				<div className="mx-auto flex w-full items-start gap-x-8 p-4 flex-auto">
					<aside className="sticky top-14 hidden w-60 shrink-0 lg:block overflow-y-auto h-full border border-gray-200">
						<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
							{navlinks.map((item) => (
								<li key={item.id} className={classNames(navHighlight(), "flex items-center bg-white")}>
									{item.type === "link" ? (
										<Link href={item?.destination} className="capitalize font-medium size-full p-3.5 text-left">
											{item.name}
										</Link>
									) : (
										<button className="capitalize font-medium size-full p-3.5 text-left cursor-pointer">{item.name}</button>
									)}
								</li>
							))}
						</ul>
					</aside>

					<main className="flex-1 bg-gray-200 p-2 flex flex-col gap-2">
						<CreatePost />
						{posts.map((post) => (
							<PostCard key={post._id} post={post} />
						))}
					</main>

					<aside className="sticky top-14 hidden w-96 shrink-0 xl:flex xl:flex-col h-screen overflow-y-auto bg-white">
						<div className="divide-y divide-gray-100 overflow-hidden flex-auto flex flex-col">
							<div className="px-4 py-5 sm:px-6 capitalize font-medium">sponsored</div>
							<div className="p-2 bg-gray-200 flex-auto">
								{promotions.length > 0 ? (
									""
								) : (
									<div className="text-center w-full py-4 rounded-sm flex flex-col justify-center items-center bg-white size-full">
										<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No promotions to display</h3>
										<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Promotions will appear here once available.</p>
									</div>
								)}
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
