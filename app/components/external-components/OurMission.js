"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLazyGetMissionStatsQuery } from "@/app/lib/redux/data-fetching/global-api";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";

export default function OurMission() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const department = useAtomValue(currentDepartment);

	const [stats, setStats] = useState([]);

	const [getStats, getStatsResults] = useLazyGetMissionStatsQuery();

	useEffect(() => {
		if (getStatsResults.isError) {
			const message = typeof getStatsResults.error === "string" ? getStatsResults.error : getStatsResults.error.message;
			toast.error(message);
		} else if (getStatsResults.isSuccess) {
			// toast.success(getStatsResults.data.message);
			const { results } = getStatsResults.data;
			if (results.length > 0) setStats(results);
		}
	}, [getStatsResults.isFetching]);

	useEffect(() => {
		if (department) getStats({ department });
	}, [department]);

	return (
		<div id="our_mission" className={classNames("overflow-hidden bg-white py-24 dark:bg-gray-900")}>
			<div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
				<div className="max-w-4xl">
					<h1 className={classNames("mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white")}>Our Mission</h1>
					<p className={classNames("mt-6 text-xl/8 text-balance text-gray-700 dark:text-gray-300")}>To create a structured environment where accountability drives growth and unlocks real opportunities.</p>
				</div>
				<section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
					<div className="lg:pr-8">
						<h2 className={classNames("text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white capitalize")}>mission statement</h2>
						<p className={classNames("mt-6 text-base/7 text-gray-600 dark:text-gray-400")}>Our mission is to build a system that connects students, parents, and educators through accountability, visibility, truth, and structured progress—empowering individuals to grow, stay disciplined, and earn access to meaningful experiences.</p>
					</div>
					<div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
						<div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 xl:gap-8">
							<div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 dark:shadow-none dark:outline-white/10">
								<img alt="" src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?&auto=format&fit=crop&crop=center&w=560&h=560&q=90" className="block size-full object-cover" />
							</div>
							<div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40 dark:shadow-none dark:outline-white/10">
								<img alt="" src="https://images.unsplash.com/photo-1557804506-669a67965ba0?&auto=format&fit=crop&crop=left&w=560&h=560&q=90" className="block size-full object-cover" />
							</div>
							<div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 dark:shadow-none dark:outline-white/10">
								<img alt="" src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?&auto=format&fit=crop&crop=left&w=560&h=560&q=90" className="block size-full object-cover" />
							</div>
							<div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40 dark:shadow-none dark:outline-white/10">
								<img alt="" src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?&auto=format&fit=crop&crop=center&w=560&h=560&q=90" className="block size-full object-cover" />
							</div>
						</div>
					</div>
					<div className="max-lg:mt-16 lg:col-span-1">
						<p className={classNames("text-base/7 font-semibold text-gray-500 dark:text-gray-400")}>The numbers</p>
						<hr className="mt-6 border-t border-gray-200 dark:border-gray-700" />
						<dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
							{stats.map((stat) => (
								<div key={stat.id} className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4 dark:border-gray-700">
									<dt className={classNames("text-sm/6 text-gray-600 dark:text-gray-400 capitalize")}>{stat.label}</dt>
									<dd className={classNames("order-first text-6xl font-semibold tracking-tight text-gray-900 dark:text-white")}>{stat.value}</dd>
								</div>
							))}
						</dl>
					</div>
				</section>
			</div>
		</div>
	);
}
