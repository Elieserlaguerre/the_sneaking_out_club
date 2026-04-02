"use client";

import { useAtomValue } from "jotai";
import { useTheme } from "../providers/ThemeProvider";
import { currentDepartment } from "@/app/lib/state-management/global-state";
import Link from "next/link";
import { buttonVariants } from "../shadcn/button";

export default function PricingCallToAction() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const department = useAtomValue(currentDepartment);

	const dynamicButtons = (department) => {
		switch (department) {
			case "members":
				return buttonVariants({ variant: "destructiveBtn" });
			case "parents":
				return buttonVariants({ variant: "blueBtn" });
			case "teachers":
				return buttonVariants({ variant: "orangeBtn" });
			case "admin":
				return buttonVariants({ variant: "ghostBtn" });
			case "careers":
				return buttonVariants({ variant: "blueBtn" });
			default:
				throw new Error("Department not recognized.");
		}
	};

	return (
		<div className={classNames(theme.base, "bg-white")}>
			<div className="px-6 py-24 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className={classNames(theme.text.primary, "text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl")}>Boost your productivity. Start using our app today.</h2>
					<p className={classNames(theme.text.primary, "mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600")}>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link href="/register" className={classNames(dynamicButtons(department))}>
							Get started
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
