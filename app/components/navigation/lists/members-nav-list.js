import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, EnvelopeIcon, HomeIcon } from "@heroicons/react/24/outline";
import { TbTimelineEventText } from "react-icons/tb";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { nanoid } from "nanoid";

export const membersExternalSectionNav = [
	{
		title: "home",
		href: "/"
	},
	{
		title: "about us",
		href: "/about-us"
	},
	{
		title: "contact us",
		href: "/contact-us"
	},
	{
		title: "pricing",
		href: "/pricing"
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

export const membersInaternalSectionNav = [
	{
		_id: nanoid(),
		sectionTile: "navigation",
		list: [
			{
				_id: nanoid(),
				name: "dashboard",
				href: "/dashboard",
				icon: HomeIcon
			},
			{
				_id: nanoid(),
				name: "assignments",
				href: "/assignments",
				icon: MdOutlineAssignmentInd
			},
			{
				_id: nanoid(),
				name: "messages",
				href: "/messages",
				icon: EnvelopeIcon
			},
			{
				_id: nanoid(),
				name: "meetings",
				href: "/meetings",
				icon: CalendarIcon
			},
			{
				_id: nanoid(),
				name: "events",
				href: "/events",
				icon: TbTimelineEventText
			},
			{
				_id: nanoid(),
				name: "Documents",
				href: "/documents",
				icon: DocumentDuplicateIcon
			},
			{
				_id: nanoid(),
				name: "Reports",
				href: "/reports",
				icon: ChartPieIcon
			}
		]
	}
];

export const membersDashboardSectionNav = [
	{
		component: {
			hideMobileButton: true,
			elements: (
				<div className="w-full h-full flex justify-center items-center">
					<h1 className="uppercase font-bold tracking-widest">members dashboard</h1>
				</div>
			)
		}
	}
];

export const membersAssignmentsSectionNav = [
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

export const membersMessagesSectionNav = [
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

export const membersMeetingSectionNav = [
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

export const membersEventsSectionNav = [
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

export const membersDocumentsSectionNav = [
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

export const membersReportsSectionNav = [
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
