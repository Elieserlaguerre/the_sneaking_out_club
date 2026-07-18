"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function GroupPostsPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const { groupId } = useParams();

	return <div>Group Posts Page: {groupId} </div>;
}
