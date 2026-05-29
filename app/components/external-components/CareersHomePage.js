"use client";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";
import { nanoid } from "nanoid";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { buttonVariants } from "../shadcn/button";

export default function CareersHomePage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const collections = [
		{
			id: nanoid(),
			name: "Women's",
			href: "#",
			imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-04-collection-01.jpg",
			imageAlt: "Woman wearing an off-white cotton t-shirt."
		},
		{
			id: nanoid(),
			name: "Men's",
			href: "#",
			imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-04-collection-02.jpg",
			imageAlt: "Man wearing a charcoal gray cotton t-shirt."
		},
		{
			id: nanoid(),
			name: "Desk Accessories",
			href: "#",
			imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-04-collection-03.jpg",
			imageAlt: "Person sitting at a wooden desk with paper note organizer, pencil and tablet."
		},
		{
			id: nanoid(),
			name: "Desk Accessories",
			href: "#",
			imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-04-collection-03.jpg",
			imageAlt: "Person sitting at a wooden desk with paper note organizer, pencil and tablet."
		}
	];

	const theme = useTheme();

	const heroSection = {
		header: "Discover Career Opportunities Built for Growth, Purpose, and Impact",
		body: "The Sneaking Out Club connects individuals with meaningful career opportunities across education, administration, technology, community development, operations, and organizational leadership. Whether you are starting your journey or advancing your career, our platform is designed to help you find opportunities that align with your skills, goals, and long-term ambitions.",
		careerHighlights: [
			{
				id: nanoid(),
				title: "Explore Diverse Career Paths",
				description: "Browse opportunities across multiple departments including education, technology, operations, communications, leadership, and community engagement.",
				image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-04-collection-01.jpg",
				alt: "Woman wearing an off-white cotton t-shirt."
			},
			{
				id: nanoid(),
				title: "Connect With Purpose-Driven Organizations",
				description: "Discover roles with organizations focused on strengthening families, schools, communities, and long-term social impact.",
				image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-04-collection-02.jpg",
				alt: "Woman wearing an off-white cotton t-shirt."
			},
			{
				id: nanoid(),
				title: "Build Long-Term Professional Growth",
				description: "Access opportunities designed to support career development, leadership advancement, and continuous learning.",
				image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-04-collection-03.jpg",
				alt: "Woman wearing an off-white cotton t-shirt."
			},
			{
				id: nanoid(),
				title: "Centralized Career Discovery",
				description: "Search, track, and manage job opportunities from a streamlined platform built to simplify the career search process.",
				image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-04-collection-01.jpg",
				alt: "Woman wearing an off-white cotton t-shirt."
			}
		]
	};

	const trendingRoles = {
		header: "Explore High-Demand Opportunities",
		body: "Discover some of the most active and in-demand career opportunities available across the platform. From education and administration to technology and operations, these roles help support growing schools, organizations, and communities.",
		features: [
			{
				id: nanoid(),
				title: "Teachers & Educators",
				description: "Support student development, classroom engagement, and educational growth through teaching and academic leadership opportunities."
			},
			{
				id: nanoid(),
				title: "Administrative Coordinators",
				description: "Help manage operations, communication workflows, scheduling, and organizational coordination across schools and community programs."
			},
			{
				id: nanoid(),
				title: "Software Engineers",
				description: "Build and maintain modern digital systems, platform infrastructure, user experiences, and scalable technology solutions."
			},
			{
				id: nanoid(),
				title: "Community Managers",
				description: "Strengthen engagement, moderate communities, organize programs, and support communication between users and organizations."
			},
			{
				id: nanoid(),
				title: "Content & Communications Specialists",
				description: "Create educational content, announcements, marketing materials, and communication campaigns that support platform growth and engagement."
			},
			{
				id: nanoid(),
				title: "Operations & Support Staff",
				description: "Assist with organizational logistics, user support, platform operations, and day-to-day administrative functions."
			}
		]
	};

	const whyUs = {
		header: "More Than a Job — A Platform for Growth & Impact",
		body: "The Sneaking Out Club is designed to support individuals who want to contribute to meaningful work while building valuable professional experience. We believe strong organizations are built by people who are empowered to grow, collaborate, and make a lasting impact within their communities.",
		features: [
			{
				id: nanoid(),
				title: "Collaborative Work Environment",
				description: "Work alongside educators, administrators, developers, creators, and community leaders in a connected and supportive environment."
			},
			{
				id: nanoid(),
				title: "Opportunities for Advancement",
				description: "Develop new skills, pursue leadership opportunities, and grow professionally as the platform and its communities continue to expand."
			},
			{
				id: nanoid(),
				title: "Purpose-Driven Mission",
				description: "Contribute to initiatives focused on improving communication, strengthening communities, and supporting educational and organizational growth."
			},
			{
				id: nanoid(),
				title: "Technology-Forward Ecosystem",
				description: "Be part of a modern digital platform designed to streamline operations, enhance engagement, and improve user experiences."
			},
			{
				id: nanoid(),
				title: "Flexible Career Opportunities",
				description: "Explore full-time, part-time, contract, remote, and hybrid opportunities across multiple professional disciplines."
			},
			{
				id: nanoid(),
				title: "Long-Term Community Impact",
				description: "Help build systems and programs that positively influence families, schools, organizations, and future generations."
			}
		]
	};

	const callToAction = {
		header: "Take the Next Step in Your Professional Journey",
		body: "Explore career opportunities designed to help you grow professionally while making a meaningful impact within schools, organizations, and communities.",
		button: "Explore Careers"
	};

	return (
		<div>
			<header className="relative bg-white">
				{/* Background image and overlap */}
				<div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
					<div className={classNames(theme.base, "relative w-full flex-1 bg-gray-800")}>
						<div className="absolute inset-0 overflow-hidden"></div>
						<div className="absolute inset-0 bg-gray-900 opacity-50" />
					</div>
					<div className="h-32 w-full bg-white md:h-40 lg:h-48" />
				</div>

				<div className="relative mx-auto max-w-7xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
					{/* Background image and overlap */}
					<div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
						<div className="relative w-full flex-1 bg-gray-800">
							<div className="absolute inset-0 overflow-hidden">
								<img alt="" src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-04-hero-full-width.jpg" className="size-full object-cover" />
							</div>
							<div className="absolute inset-0 bg-gray-900 opacity-50" />
						</div>
						<div className="h-48 w-full bg-white" />
					</div>
					<div className="relative py-32">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">{heroSection.header}</h1>
						<div className="mt-4 sm:mt-6">
							<p className={classNames(theme.text.secondary, "mt-8 text-base font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400")}>{heroSection.body}</p>
						</div>
					</div>
				</div>

				<section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
					<h2 id="collection-heading" className="text-white text-center capitalize font-medium sr-only">
						career highlights
					</h2>
					<div className="mt-6 mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-4 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
						{heroSection?.careerHighlights?.map((collection) => (
							<div key={collection.id} className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-4/5 sm:h-auto">
								<div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
									<div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
										<img alt={collection.alt} src={collection.image} className="size-full object-cover" />
									</div>
									<div className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-50" />
								</div>
								<div className="absolute inset-0 flex items-end rounded-lg p-6">
									<div>
										<h3 className="mt-1 font-semibold text-white">
											<a href={collection.href}>
												<span className="absolute inset-0" />
												{collection.title}
											</a>
										</h3>
										<p aria-hidden="true" className="text-sm text-white">
											{collection.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</header>

			<section className="bg-white py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl text-center">{trendingRoles.header}</h2>
						<p className="mt-6 text-lg/8 text-gray-700 text-center">{trendingRoles.body}</p>
					</div>
					<dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{trendingRoles.features.map((feature) => (
							<div key={feature.id}>
								<dt className="font-semibold text-gray-900">{feature.title}</dt>
								<dd className="mt-1 text-gray-600">{feature.description}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<section className={classNames(theme.base, "min-h-screen")}>
				<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
					<div className="mx-auto max-w-6xl">
						<h2 className={classNames(theme.text.primary, "text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl")}>{whyUs.header}</h2>
						<p className={classNames(theme.text.primary, "mt-6 text-lg/8 text-gray-700 text-center")}>{whyUs.body}</p>
						<dl className="mt-16 divide-y divide-gray-200">
							{whyUs.features.map((feature) => (
								<Disclosure key={feature.id} as="div" className="py-6 first:pt-0 last:pb-0">
									<dt>
										<DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
											<span className={classNames(theme.text.primary, "text-base/7 font-semibold")}>{feature.title}</span>
											<span className={classNames(theme.text.primary, "ml-6 flex h-7 items-center")}>
												<PlusIcon aria-hidden="true" className="size-6 group-data-open:hidden" />
												<MinusIcon aria-hidden="true" className="size-6 group-not-data-open:hidden" />
											</span>
										</DisclosureButton>
									</dt>
									<DisclosurePanel as="dd" className="mt-2 pr-12">
										<p className={classNames(theme.text.primary, "text-base/7 text-gray-600")}>{feature.description}</p>
									</DisclosurePanel>
								</Disclosure>
							))}
						</dl>
					</div>
				</div>
			</section>
			<section className="bg-white">
				<div className="px-6 py-24 sm:py-32 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">{callToAction.header}</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">{callToAction.body}</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="/register" className={classNames(buttonVariants({ variant: "blueBtn" }))}>
								{callToAction.button}
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
