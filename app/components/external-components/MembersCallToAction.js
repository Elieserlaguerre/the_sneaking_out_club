"use client";

import Link from "next/link";
import { useTheme } from "../providers/ThemeProvider";
import { buttonVariants } from "../shadcn/button";

export default function MembersCallToAction() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	return (
		<div className={classNames(theme.base)}>
			<div className="px-6 py-24 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className={classNames(theme.text.primary, "text-4xl font-semibold tracking-tight text-balance sm:text-5xl dark:text-white")}>Ready to Earn Your Freedom?</h2>
					<p className={classNames(theme.text.primary, "mx-auto mt-6 max-w-xl text-lg/8 text-pretty dark:text-gray-300")}>Join a system designed to help you grow, stay accountable, and unlock real opportunities.</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link href="/register" className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
							Join the Club
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
