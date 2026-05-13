"use client";
import PostCard from "@/app/components/cards/PostCard";
import CreatePost from "@/app/components/overlays/modals/CreatePost";
import { useTheme } from "@/app/components/providers/ThemeProvider";
import { useLazyGetPostsQuery } from "@/app/lib/redux/data-fetching/parents-api";
import { currentUser } from "@/app/lib/state-management/global-state";
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
			destination: "#",
			type: "link"
		},
		{
			id: nanoid(),
			name: "groups",
			destination: "#",
			type: "link"
		},
		{
			id: nanoid(),
			name: "saved",
			destination: "#",
			type: "link"
		}
	];

	const theme = useTheme();
	// console.log("theme", theme);

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
			setTotalPages(results?.totalPages ?? 0);
			setPosts(results?.posts ?? []);
		}
	}, [getPostResults.isFetching, getPostResults.isSuccess, getPostResults.isError]);

	useEffect(() => {
		if (user) {
			getPosts({ userId: user._id, page, limit, filters: JSON.stringify(filters) });
		}
	}, [user, page, limit, filters]);

	return (
		<div>
			<div className="mx-auto w-full px-4 sm:px-6 lg:w-11/12 lg:px-8 min-h-screen flex flex-col py-10">
				<span className="sr-only">post page</span>
				<div className="mx-auto flex w-full items-start gap-x-8 p-4 flex-auto">
					<aside className="sticky top-14 hidden w-60 shrink-0 lg:block overflow-y-auto h-full border border-gray-200">
						<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
							{navlinks.map((item) => (
								<li key={item.id} className={classNames(`flex items-center bg-white hover:${theme.sectionNavbar.root} hover:${theme.text.navbar}`)}>
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
							<div className="p-2 bg-gray-200 flex-auto"></div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
