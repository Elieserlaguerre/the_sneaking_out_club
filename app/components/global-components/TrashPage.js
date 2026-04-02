"use client";
import { currentDepartment } from "@/app/lib/state-management/global-state";
import { useAtomValue } from "jotai";
import React from "react";

export default function TrashPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const department = useAtomValue(currentDepartment);
	console.log("department", department);

	return <div>Trash Page</div>;
}
