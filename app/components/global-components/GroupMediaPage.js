"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function GroupMediaPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const { groupId } = useParams();

	return <div>Group Media Page: {groupId} </div>;
}
