"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function GroupManagersPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const { groupId } = useParams();

	return <div>Group Managers Page: {groupId} </div>;
}
