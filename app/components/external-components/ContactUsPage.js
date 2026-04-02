"use client";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";
import Link from "next/link";
import ContactSection from "./ContactSection";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";

export default function ContactUsPage() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const department = useAtomValue(currentDepartment);

	const contactHeroContent = {
		members: {
			headline: "Get the Support You Need to Stay on Track",
			subheadline: "Have questions about your progress, rewards, or account? We're here to help you stay focused and keep moving forward."
		},

		parents: {
			headline: "Stay Informed. Stay Connected.",
			subheadline: "Whether you have questions about your child’s progress or need assistance managing their account, our team is here to support you."
		},

		teachers: {
			headline: "Support for Educators, When You Need It",
			subheadline: "From managing students to offering tutoring, we’re here to help you make the most of the platform."
		},

		admin: {
			headline: "Platform Support for Full Control",
			subheadline: "Need assistance managing operations, users, or events? Our team is ready to help you maintain and scale effectively."
		},

		careers: {
			headline: "Let’s Connect",
			subheadline: "Have questions about opportunities or the application process? Reach out and we’ll guide you every step of the way."
		}
	};

	const dynamicHeroContent = (department) => {
		switch (department) {
			case "members":
				return contactHeroContent.members;
			case "parents":
				return contactHeroContent.parents;
			case "teachers":
				return contactHeroContent.teachers;
			case "admin":
				return contactHeroContent.admin;
			case "careers":
				return contactHeroContent.careers;
			default:
				throw new Error("Department not recognized.");
		}
	};

	const content = dynamicHeroContent(department);

	return (
		<div className="min-h-screen">
			<header className={classNames(theme.base, "relative isolate px-6 pt-14 lg:px-8")}>
				<div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
					<div className="text-center">
						<h1 className={classNames(theme.text.primary, "text-5xl font-semibold tracking-tight text-balance sm:text-7xl dark:text-white")}>{content.headline}</h1>
						<p className={classNames(theme.text.primary, "mt-8 text-lg font-medium text-pretty sm:text-xl/8 dark:text-gray-400")}>{content.subheadline}</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="#contact_section" className={classNames(theme.text.primary, "text-sm/6 font-semibold dark:text-white")}>
								Learn more <span aria-hidden="true">→</span>
							</Link>
						</div>
					</div>
				</div>
			</header>
			<ContactSection />
			<FrequentlyAskedQuestions />
		</div>
	);
}
