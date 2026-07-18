"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function GroupEventsPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const { groupId } = useParams();

	return <div>Group Events Page: {groupId} </div>;
}
