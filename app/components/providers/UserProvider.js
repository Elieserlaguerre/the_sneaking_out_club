"use client";

import { useLazyGetCurrentUserQuery } from "@/app/lib/redux/data-fetching/global-api";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { useAtomValue, useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect } from "react";
import toast from "react-hot-toast";

export default function UserProvider({ children }) {
	const department = useAtomValue(currentDepartment);
	const setCurrentUser = useSetAtom(currentUser);
	const { data: session, status } = useSession();
	const user = session?.user;

	useEffect(() => {
		setCurrentUser(user);
	}, []);

	const [getUser, getUserResults] = useLazyGetCurrentUserQuery({ refetchOnReconnect: true });

	useEffect(() => {
		if (getUserResults.isError) {
			const message = typeof getUserResults.error === "string" ? getUserResults.error : getUserResults.error.message;
			toast.error(message);
		} else if (getUserResults.isSuccess) {
			// toast.success(getUserResults.data.message);
			const { results } = getUserResults.data;
			const currentUser = {
				...user,
				...results
			};

			setCurrentUser(currentUser);
		}
	}, [getUserResults.isFetching]);

	useEffect(() => {
		if (status === "authenticated" && user) getUser({ userId: user._id, department: department });
	}, [status]);

	return <Fragment>{children}</Fragment>;
}
