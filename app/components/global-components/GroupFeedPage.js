"use client";
import React from "react";

export default function GroupFeedPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<div className="size-full bg-gray-200">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-3xl lg:px-8 flex flex-col border border-blue-500 size-full">
				<span className="sr-only">Group Feed Page</span>
				Group Feed Page
			</div>
		</div>
	);
}
