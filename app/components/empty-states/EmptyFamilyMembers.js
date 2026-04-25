import React from "react";

export default function EmptyFamilyMembers() {
	return (
		<div className="text-center border border-gray-400 bg-white w-full py-4 rounded-sm flex flex-col justify-center items-center min-h-screen col-span-full">
			<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white capitalize">No family members to display</h3>
			<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding a new family member.</p>
		</div>
	);
}
