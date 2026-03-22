"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import z from "zod";
import CheckoutFormSkeleton from "../loading-skeletons/CheckoutFormSkeleton";
import CheckoutSummarySkeleton from "../loading-skeletons/CheckoutSummarySkeleton";
import { initialOrderState } from "@/app/lib/util/frontend-helper-functions/state-management-helpers";
import { currentDepartment } from "@/app/lib/state-management/global-state";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripeProvider({ children }) {
	const department = useAtomValue(currentDepartment);
	const router = useRouter();
	const order = useAtomValue(initialOrderState(department));
	console.log("order", order);

	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	const options = {
		clientSecret: order?.clientSecret,
		appearance: {
			theme: "stripe"
		}
	};

	const optionsSchema = z.object({
		clientSecret: z.string().trim().nonempty({ message: "client secret is required." }),
		appearance: z.object({
			theme: z.string().trim().nonempty({ message: "appearance theme is required." })
		})
	});

	useEffect(() => {
		if (!hydrated) return;

		const validation = optionsSchema.safeParse(options);
		console.log("validation", validation);

		if (validation.error) {
			router.push("/cart");
		}
	}, [hydrated, order, router]);

	return !hydrated || !order?.clientSecret ? (
		<div className="bg-gray-50">
			<div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Checkout</h2>
				<div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 lg:relative">
					<CheckoutFormSkeleton />
					<CheckoutSummarySkeleton />
				</div>
			</div>
		</div>
	) : (
		<Elements stripe={stripePromise} options={options}>
			{children}
		</Elements>
	);
}
