import React from "react";

export default function EmptyConnectionsState() {
	return (
		<div className="text-center border border-gray-400 w-full py-4 flex flex-col justify-center items-center min-h-screen col-span-full bg-white">
			<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No connections to display</h3>
			<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by searching for new connections.</p>
		</div>
	);
}
