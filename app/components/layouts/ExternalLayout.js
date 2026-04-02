"use client";
import React from "react";
import Navbar from "../navigation/components/Navbar";
import Footer from "../navigation/components/Footer";
import { dynamicExternalNavlist } from "@/app/lib/util/frontend-helper-functions";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";

export default function ExternalLayout({ children }) {
	const department = useAtomValue(currentDepartment);

	return (
		department && (
			<div className="min-h-screen">
				<div>
					<Navbar navList={dynamicExternalNavlist(department)} />
				</div>
				<div className="min-h-screen">{children}</div>
				<div>
					<Footer />
				</div>
			</div>
		)
	);
}
