import { nanoid } from "nanoid";
import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, EnvelopeIcon, HomeIcon, QueueListIcon, UserGroupIcon } from "@heroicons/react/24/outline";
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
				name: "schedules",
				href: "/schedules",
				icon: CalendarIcon
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
				icon: QueueListIcon
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

export const parentFamilySectionNav = [
	{
		id: nanoid(),
		title: "family tree",
		href: "/family"
	},
	{
		id: nanoid(),
		title: "family branches",
		href: "/family/branches"
	},
	{
		id: nanoid(),
		title: "family members",
		href: "/family/members"
	},
	{
		id: nanoid(),
		title: "family plans",
		href: "/family/plans"
	},
	{
		id: nanoid(),
		title: "family health",
		href: "/family/health"
	},
	{
		id: nanoid(),
		title: "family estate",
		href: "/family/estate"
	}
];

export const parentsAssignmentsSectionNav = [
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

export const parentsSchedulesSectionNav = [
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

export const parentsMessagesSectionNav = [
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
