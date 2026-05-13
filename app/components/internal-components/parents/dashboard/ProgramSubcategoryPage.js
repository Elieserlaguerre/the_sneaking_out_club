"use client";
import EmptyPrograms from "@/app/components/empty-states/EmptyPrograms";
import React from "react";

export default function ProgramSubcategoryPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<div className="flex flex-col size-full">
			<EmptyPrograms />
		</div>
	);
}
