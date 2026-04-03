import { nanoid } from "nanoid";
import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, EnvelopeIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { TbTimelineEventText } from "react-icons/tb";
import { MdOutlineAssignmentInd } from "react-icons/md";

export const parentsExternalSectionNav = [
	{
		id: nanoid(),
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
		id: nanoid(),
		title: "pricing",
		href: "/pricing"
	},
	{
		id: nanoid(),
		title: "register",
		href: "/register"
	},
	{
		id: nanoid(),
		title: "login",
		href: "/login"
	}
];

export const parentsInaternalSectionNav = [
	{
		_id: nanoid(),
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
				name: "family",
				href: "/family",
				icon: UserGroupIcon
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

export const parentsDashboardSectionNav = [
	{
		component: {
			hideMobileButton: true,
			elements: (
				<div className="w-full h-full flex justify-center items-center">
					<h1 className="uppercase font-bold tracking-widest">parents dashboard</h1>
				</div>
			)
		}
	}
];

export const parentFamilySectionNav = [
	{
		id: nanoid(),
		title: "members",
		href: "/family"
	},
	{
		id: nanoid(),
		title: "plans",
		href: "/family/plans"
	},
	{
		id: nanoid(),
		title: "health",
		href: "/family/health"
	},
	{
		id: nanoid(),
		title: "estate",
		href: "/family/estate"
	}
];

export const parentsAssignmentsSectionNav = [
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

export const parentsMessagesSectionNav = [
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

export const parentsMeetingSectionNav = [
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

export const parentsEventsSectionNav = [
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

export const parentsDocumentsSectionNav = [
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

export const parentsReportsSectionNav = [
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
