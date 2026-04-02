"use client";

import { currentDepartment } from "@/app/lib/state-management/global-state";
import { useAtomValue } from "jotai";
import React from "react";
import SectionNavbar from "../navigation/components/SectionNavbar";
import { usePathname } from "next/navigation";
import { dynamicInternalAppSections } from "@/app/lib/util/frontend-helper-functions";

export default function SectionLayout({ children }) {
	const department = useAtomValue(currentDepartment);
	const path = usePathname();

	return (
		<section className="min-h-screen">
			<div>
				<SectionNavbar navList={dynamicInternalAppSections(department, path)} />
			</div>
			<div>{children}</div>
		</section>
	);
}
