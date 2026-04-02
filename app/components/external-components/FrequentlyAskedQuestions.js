"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../providers/ThemeProvider";
import { useAtomValue } from "jotai";
import { currentDepartment } from "@/app/lib/state-management/global-state";

const membersFAQ = [
	{
		question: "How do I improve my status in the club?",
		answer: "Your status improves when you consistently complete assignments, maintain good academic performance, and follow through on responsibilities both at school and at home."
	},
	{
		question: "What happens if I miss assignments or fall behind?",
		answer: "If you fall behind, your status may change to probation or suspension. You’ll be given time and guidance to improve before further restrictions are applied."
	},
	{
		question: "How do I earn rewards and perks?",
		answer: "Rewards are earned through consistency, effort, and progress. The more you stay on track and meet expectations, the more perks and opportunities you unlock."
	},
	{
		question: "What kind of events can I participate in?",
		answer: "Events range from local activities like outings and group experiences to larger trips and sponsored programs, depending on your status and membership tier."
	},
	{
		question: "Can I access tutoring if I need help?",
		answer: "Yes. You can connect with teachers on the platform for tutoring sessions designed to help you improve your understanding and performance."
	}
];

const parentsFAQ = [
	{
		question: "How do I monitor my child’s progress?",
		answer: "You can track grades, assignments, and overall performance directly through your dashboard, giving you real-time visibility into your child’s progress."
	},
	{
		question: "Can I assign responsibilities to my child?",
		answer: "Yes. You can create and manage chores or responsibilities, which are tracked alongside school and club assignments."
	},
	{
		question: "How do I communicate with teachers?",
		answer: "The platform includes built-in messaging and meeting scheduling tools, allowing you to communicate directly with your child’s teachers."
	},
	{
		question: "What happens if my child is placed on probation?",
		answer: "Probation gives your child time to improve performance. You’ll receive visibility into what needs attention so you can support them during this period."
	},
	{
		question: "Do I need to create accounts for my children?",
		answer: "Yes. Parents manage accounts for minors, ensuring proper oversight and control of their activity on the platform."
	}
];

const teachersFAQ = [
	{
		question: "How do I assign and manage student work?",
		answer: "You can create assignments for students and even involve parents by assigning collaborative activities, all managed through your dashboard."
	},
	{
		question: "Can I offer tutoring sessions?",
		answer: "Yes. Teachers can offer tutoring services through the platform and receive compensation for their time and expertise."
	},
	{
		question: "How do I track student performance?",
		answer: "You can update grades, monitor assignment completion, and track progress in real time using the platform’s tools."
	},
	{
		question: "Can I communicate with parents?",
		answer: "Yes. The platform allows direct messaging and meeting scheduling with parents to ensure alignment and support for students."
	},
	{
		question: "Is there a limit to how many students I can manage?",
		answer: "The platform is designed to scale, allowing you to manage multiple students efficiently without sacrificing organization or clarity."
	}
];

const adminFAQ = [
	{
		question: "How do I manage users across the platform?",
		answer: "Admins have full control over user accounts, including members, parents, teachers, and applicants, all from a centralized dashboard."
	},
	{
		question: "Can I create and manage events?",
		answer: "Yes. You can create standard, local, non-local, and sponsored events, and control access based on user status and tiers."
	},
	{
		question: "How do I monitor platform activity?",
		answer: "Reports and analytics tools provide insight into user engagement, performance trends, and overall platform activity."
	},
	{
		question: "Can I control access based on user status?",
		answer: "Yes. The system is built around status-based access, allowing you to restrict or grant permissions depending on performance and behavior."
	},
	{
		question: "How do I handle support or issues?",
		answer: "Admins can manage reports, respond to user concerns, and oversee platform operations to ensure everything runs smoothly."
	}
];

const careersFAQ = [
	{
		question: "How do I apply for a position?",
		answer: "You can browse available roles and submit your application directly through the Careers section of the platform."
	},
	{
		question: "What types of roles are available?",
		answer: "Opportunities may include administrative, educational, operational, and support roles depending on current needs."
	},
	{
		question: "Can I communicate with the hiring team?",
		answer: "Yes. The platform provides messaging tools to stay in contact with administrators throughout the application process."
	},
	{
		question: "What happens after I apply?",
		answer: "Your application will be reviewed, and you may be contacted for additional steps such as interviews or further evaluation."
	},
	{
		question: "Is this a remote or in-person opportunity?",
		answer: "Opportunities may vary depending on the role, with some positions offering remote flexibility and others requiring in-person participation."
	}
];

export default function FrequentlyAskedQuestions() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();

	const department = useAtomValue(currentDepartment);

	const dynamicQuestions = (department) => {
		switch (department) {
			case "members":
				return membersFAQ;
			case "parents":
				return parentsFAQ;
			case "teachers":
				return teachersFAQ;
			case "admin":
				return adminFAQ;
			case "careers":
				return careersFAQ;
			default:
				throw new Error("Department not recognized.");
		}
	};

	const faqs = dynamicQuestions(department);

	return (
		<div className={classNames(theme.base)}>
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
				<div className="mx-auto max-w-4xl">
					<h2 className={classNames(theme.text.primary, "text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl")}>Frequently asked questions</h2>
					<dl className="mt-16 divide-y divide-gray-900/10">
						{faqs.map((faq) => (
							<Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
								<dt>
									<DisclosureButton className={classNames(theme.text.primary, "group flex w-full items-start justify-between text-left text-gray-900")}>
										<span className="text-base/7 font-semibold">{faq.question}</span>
										<span className="ml-6 flex h-7 items-center">
											<PlusIcon aria-hidden="true" className="size-6 group-data-open:hidden" />
											<MinusIcon aria-hidden="true" className="size-6 group-not-data-open:hidden" />
										</span>
									</DisclosureButton>
								</dt>
								<DisclosurePanel as="dd" className="mt-2 pr-12">
									<p className={classNames(theme.text.primary, "text-base/7 text-gray-600")}>{faq.answer}</p>
								</DisclosurePanel>
							</Disclosure>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
