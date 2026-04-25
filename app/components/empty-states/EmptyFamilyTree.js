import React from "react";

export default function EmptyFamilyTree() {
	return (
		<div className="text-center border border-gray-400 w-full py-4 rounded-sm flex flex-col justify-center items-center col-span-full bg-white">
			<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No family trees to display</h3>
			<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new family tree.</p>
		</div>
	);
}
