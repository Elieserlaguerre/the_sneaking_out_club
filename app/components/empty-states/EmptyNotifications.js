import React from "react";

export default function EmptyNotifications() {
	return (
		<div className="text-center border border-gray-400 size-full py-4 rounded-sm flex flex-col justify-center items-center flex-1">
			<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No notifications</h3>
			<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">you currently have no notifications to display.</p>
		</div>
	);
}
