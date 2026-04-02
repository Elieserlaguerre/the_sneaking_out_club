"use client";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";

export default function RegistrationLayout({ children }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	return (
		<section className="min-h-screen grid grid-cols-1  xl:grid-cols-2">
			<div className={classNames(theme?.base, "hidden xl:flex flex-col justify-center items-center")}>
				<div className="mx-auto size-8/12 aspect-square rounded-md bg-white">{/* image container */}</div>
			</div>
			<div>{children}</div>
		</section>
	);
}
