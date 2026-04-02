"use client";

import { currentDepartment } from "@/app/lib/state-management/global-state";
import { useSetAtom } from "jotai";
import React, { Fragment, useEffect } from "react";

export default function DomainProvider({ children, subdomain }) {
	const setDepartment = useSetAtom(currentDepartment);

	useEffect(() => {
		setDepartment(subdomain);
	}, [subdomain]);

	return <Fragment>{children}</Fragment>;
}
