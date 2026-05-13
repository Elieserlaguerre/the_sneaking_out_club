"use client";
import React from "react";

export default function EmptyPrograms() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<div className={classNames("text-center w-full py-4 rounded-sm flex flex-col justify-center items-center flex-auto")}>
			<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No programs to display</h3>
			<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Please come back later when there are new programs available.</p>
		</div>
	);
}
