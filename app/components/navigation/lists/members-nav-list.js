import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, EnvelopeIcon, HomeIcon } from "@heroicons/react/24/outline";
import { TbTimelineEventText } from "react-icons/tb";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { nanoid } from "nanoid";

export const membersExternalSectionNav = [
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

export const membersInaternalSectionNav = [
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

export const membersDashboardSectionNav = [
	{
		id: nanoid(),
		title: "summary",
		href: "/dashboard"
	},
	{
		id: nanoid(),
		title: "posts",
		href: "/dashboard/posts"
	},
	{
		id: nanoid(),
		title: "reels",
		href: "/dashboard/reels"
	},
	{
		id: nanoid(),
		title: "connections",
		href: "/dashboard/connections"
	},
	{
		id: nanoid(),
		title: "store",
		href: "/dashboard/store"
	},
	{
		id: nanoid(),
		title: "programs",
		href: "/dashboard/programs"
	}
];

export const membersAssignmentsSectionNav = [
	{
		id: nanoid(),
		title: "daily",
		href: "/assignments"
	},
	{
		id: nanoid(),
		title: "weekly",
		href: "/assignments/weekly"
	},
	{
		id: nanoid(),
		title: "monthly",
		href: "/assignments/monthly"
	},
	{
		id: nanoid(),
		title: "yearly",
		href: "/assignments/yearly"
	}
];

export const membersSchedulesSectionNav = [
	{
		id: nanoid(),
		title: "daily",
		href: "/schedules"
	},
	{
		id: nanoid(),
		title: "weekly",
		href: "/schedules/weekly"
	},
	{
		id: nanoid(),
		title: "monthly",
		href: "/schedules/monthly"
	},
	{
		id: nanoid(),
		title: "yearly",
		href: "/schedules/yearly"
	}
];

export const membersMessagesSectionNav = [
	{
		id: nanoid(),
		title: "inbox",
		href: "/messages"
	},
	{
		id: nanoid(),
		title: "sent",
		href: "/messages/sent"
	},
	{
		id: nanoid(),
		title: "draft",
		href: "/messages/draft"
	},

	{
		id: nanoid(),
		title: "important",
		href: "/messages/important"
	},
	{
		id: nanoid(),
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
