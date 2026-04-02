import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, EnvelopeIcon, HomeIcon } from "@heroicons/react/24/outline";
import { TbTimelineEventText } from "react-icons/tb";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { nanoid } from "nanoid";

export const adminExternalSectionNav = [
	{
		title: "home",
		href: "/"
	},
	{
		id: nanoid(),
		title: "about us",
		href: "/about-us"
	},
	{
		id: nanoid(),
		title: "contact us",
		href: "/contact-us"
	},
	{
		title: "register",
		href: "/register"
	},
	{
		title: "login",
		href: "/login"
	}
];

export const adminInaternalSectionNav = [
	{
		id: nanoid(),
		sectionTile: "navigation",
		list: [
			{
				id: nanoid(),
				name: "dashboard",
				href: "/dashboard",
				icon: HomeIcon
			},
			{
				id: nanoid(),
				name: "assignments",
				href: "/assignments",
				icon: MdOutlineAssignmentInd
			},
			{
				id: nanoid(),
				name: "messages",
				href: "/messages",
				icon: EnvelopeIcon
			},
			{
				id: nanoid(),
				name: "meetings",
				href: "/meetings",
				icon: CalendarIcon
			},
			{
				id: nanoid(),
				name: "events",
				href: "/events",
				icon: TbTimelineEventText
			},
			{
				id: nanoid(),
				name: "Documents",
				href: "/documents",
				icon: DocumentDuplicateIcon
			},
			{
				id: nanoid(),
				name: "Reports",
				href: "/reports",
				icon: ChartPieIcon
			}
		]
	}
];

export const adminDashboardSectionNav = [
	{
		component: {
			hideMobileButton: true,
			elements: (
				<div className="w-full h-full flex justify-center items-center">
					<h1 className="uppercase font-bold tracking-widest">admin dashboard</h1>
				</div>
			)
		}
	}
];

export const adminAssignmentsSectionNav = [
	{
		title: "daily",
		href: "/assignments"
	},
	{
		title: "weekly",
		href: "/assignments/weekly"
	},
	{
		title: "monthly",
		href: "/assignments/monthly"
	},
	{
		title: "yearly",
		href: "/assignments/yearly"
	}
];

export const adminMessagesSectionNav = [
	{
		title: "inbox",
		href: "/messages"
	},
	{
		title: "sent",
		href: "/messages/sent"
	},
	{
		title: "draft",
		href: "/messages/draft"
	},

	{
		title: "important",
		href: "/messages/important"
	},
	{
		title: "trash",
		href: "/messages/trash"
	}
];

export const adminMeetingSectionNav = [
	{
		id: nanoid(),
		title: "received",
		href: "/meetings"
	},
	{
		id: nanoid(),
		title: "sent",
		href: "/meetings/sent"
	}
];

export const adminEventsSectionNav = [
	{
		id: nanoid(),
		title: "daily",
		href: "/events"
	},
	{
		id: nanoid(),
		title: "weekly",
		href: "/events/weekly"
	},
	{
		id: nanoid(),
		title: "monthly",
		href: "/events/monthly"
	},
	{
		id: nanoid(),
		title: "yearly",
		href: "/events/yearly"
	}
];

export const adminDocumentsSectionNav = [
	{
		id: nanoid(),
		title: "files",
		href: "/documents"
	},
	{
		id: nanoid(),
		title: "videos",
		href: "/documents/videos"
	}
];

export const adminReportsSectionNav = [
	{
		component: {
			hideMobileButton: true,
			elements: (
				<div className="w-full h-full flex justify-center items-center">
					<h1 className="uppercase font-bold tracking-widest">reports</h1>
				</div>
			)
		}
	}
];
