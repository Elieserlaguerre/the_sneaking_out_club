import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/app/lib/util/frontend-helper-functions/shadcn-utils";

const buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90",
			destructiveBtn: "rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 capitalize flex justify-center items-center",
			outlineBtn: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			secondaryBtn: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghostBtn: "flex justify-center items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm capitalize",
			link: "text-primary underline-offset-4 hover:underline",
			indigoBtn: "rounded-md bg-indigo-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize flex justify-center items-center",
			whiteGreenBtn: "border border-gray-300 bg-white hover:bg-green-400 hover:border-green-500 capitalize hover:text-accent-foreground",
			greenBtn: "rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 capitalize flex justify-center items-center",
			orangeBtn: "rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 capitalize flex justify-center items-center",
			blueBtn: "rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize flex justify-center items-center",
			cyanBtn: "rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 capitalize flex justify-center items-center",
			yellowBtn: "rounded-md bg-yellow-400 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 capitalize flex justify-center items-center",
			coralBtn: "rounded bg-[#FBF7F0] px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm hover:bg-[#FBF7F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBF7F0]",
			peachBtn: "rounded bg-[#FFB27D] px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB27D]",
			slateBlueBtn: "rounded bg-[#4C6EF5] px-2 py-1 text-xs font-semibold text-white hover:text-gray-900 shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C6EF5]",
			yellowCircularBtn: "rounded-full p-1 min-w-6 min-h-6 aspect-square bg-yellow-600 hover:bg-yellow-500 flex justify-center items-center text-white",
			greenCircularBtn: "rounded-full p-1 min-w-6 min-h-6 aspect-square bg-green-600 hover:bg-green-500 flex justify-center items-center text-white",
			redCircularBtn: "rounded-full p-1 min-w-6 min-h-6 aspect-square bg-red-600 hover:bg-red-500 flex justify-center items-center text-white",
			WhiteCircularBtn: "rounded-full p-1 min-w-6 min-h-6 aspect-square bg-white hover:bg-gray-200 flex justify-center items-center text-gray-900",
			blackCircularBtn: "rounded-full p-1 min-w-6 min-h-6 aspect-square bg-black hover:bg-black/70 flex justify-center items-center text-white",
			grayCircularBtn: "rounded-full p-1 min-w-6 min-h-6 aspect-square bg-gray-500 hover:bg-gray-400 flex justify-center items-center text-white"
		},
		size: {
			default: "",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-8",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});

function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
	const Comp = asChild ? Slot.Root : "button";

	return <Comp data-slot="button" data-variant={variant} data-size={size} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
