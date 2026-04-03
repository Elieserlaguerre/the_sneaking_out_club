import { adminAssignmentsSectionNav, adminDashboardSectionNav, adminDocumentsSectionNav, adminEventsSectionNav, adminExternalSectionNav, adminInaternalSectionNav, adminMeetingSectionNav, adminMessagesSectionNav, adminReportsSectionNav } from "@/app/components/navigation/lists/admin-nav-list";
import { careersAssignmentsSectionNav, careersDashboardSectionNav, careersDocumentsSectionNav, careersEventsSectionNav, careersExternalSectionNav, careersInaternalSectionNav, careersMeetingSectionNav, careersMessagesSectionNav, careersReportsSectionNav } from "@/app/components/navigation/lists/careers-nav-list";
import { membersAssignmentsSectionNav, membersDashboardSectionNav, membersDocumentsSectionNav, membersEventsSectionNav, membersExternalSectionNav, membersInaternalSectionNav, membersMeetingSectionNav, membersMessagesSectionNav, membersReportsSectionNav } from "@/app/components/navigation/lists/members-nav-list";
import { parentFamilySectionNav, parentsAssignmentsSectionNav, parentsDashboardSectionNav, parentsDocumentsSectionNav, parentsEventsSectionNav, parentsExternalSectionNav, parentsInaternalSectionNav, parentsMeetingSectionNav, parentsMessagesSectionNav, parentsReportsSectionNav } from "@/app/components/navigation/lists/parents-nav-list";
import { teachersAssignmentsSectionNav, teachersDashboardSectionNav, teachersDocumentsSectionNav, teachersEventsSectionNav, teachersExternalSectionNav, teachersInaternalSectionNav, teachersMeetingSectionNav, teachersMessagesSectionNav, teachersReportsSectionNav } from "@/app/components/navigation/lists/teachers-nav-list";
import { nanoid } from "nanoid";
import { signOut } from "next-auth/react";

export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
};

export const states = [
	{
		id: nanoid(),
		name: "Alabama",
		abbreviation: "AL"
	},
	{
		id: nanoid(),
		name: "Alaska",
		abbreviation: "AK"
	},
	{
		id: nanoid(),
		name: "American Samoa",
		abbreviation: "AS"
	},
	{
		id: nanoid(),
		name: "Arizona",
		abbreviation: "AZ"
	},
	{
		id: nanoid(),
		name: "Arkansas",
		abbreviation: "AR"
	},
	{
		id: nanoid(),
		name: "California",
		abbreviation: "CA"
	},
	{
		id: nanoid(),
		name: "Colorado",
		abbreviation: "CO"
	},
	{
		id: nanoid(),
		name: "Connecticut",
		abbreviation: "CT"
	},
	{
		id: nanoid(),
		name: "Delaware",
		abbreviation: "DE"
	},
	{
		id: nanoid(),
		name: "District Of Columbia",
		abbreviation: "DC"
	},
	{
		id: nanoid(),
		name: "Federated States Of Micronesia",
		abbreviation: "FM"
	},
	{
		id: nanoid(),
		name: "Florida",
		abbreviation: "FL"
	},
	{
		id: nanoid(),
		name: "Georgia",
		abbreviation: "GA"
	},
	{
		id: nanoid(),
		name: "Guam",
		abbreviation: "GU"
	},
	{
		id: nanoid(),
		name: "Hawaii",
		abbreviation: "HI"
	},
	{
		id: nanoid(),
		name: "Idaho",
		abbreviation: "ID"
	},
	{
		id: nanoid(),
		name: "Illinois",
		abbreviation: "IL"
	},
	{
		id: nanoid(),
		name: "Indiana",
		abbreviation: "IN"
	},
	{
		id: nanoid(),
		name: "Iowa",
		abbreviation: "IA"
	},
	{
		id: nanoid(),
		name: "Kansas",
		abbreviation: "KS"
	},
	{
		id: nanoid(),
		name: "Kentucky",
		abbreviation: "KY"
	},
	{
		id: nanoid(),
		name: "Louisiana",
		abbreviation: "LA"
	},
	{
		id: nanoid(),
		name: "Maine",
		abbreviation: "ME"
	},
	{
		id: nanoid(),
		name: "Marshall Islands",
		abbreviation: "MH"
	},
	{
		id: nanoid(),
		name: "Maryland",
		abbreviation: "MD"
	},
	{
		id: nanoid(),
		name: "Massachusetts",
		abbreviation: "MA"
	},
	{
		id: nanoid(),
		name: "Michigan",
		abbreviation: "MI"
	},
	{
		id: nanoid(),
		name: "Minnesota",
		abbreviation: "MN"
	},
	{
		id: nanoid(),
		name: "Mississippi",
		abbreviation: "MS"
	},
	{
		id: nanoid(),
		name: "Missouri",
		abbreviation: "MO"
	},
	{
		id: nanoid(),
		name: "Montana",
		abbreviation: "MT"
	},
	{
		id: nanoid(),
		name: "Nebraska",
		abbreviation: "NE"
	},
	{
		id: nanoid(),
		name: "Nevada",
		abbreviation: "NV"
	},
	{
		id: nanoid(),
		name: "New Hampshire",
		abbreviation: "NH"
	},
	{
		id: nanoid(),
		name: "New Jersey",
		abbreviation: "NJ"
	},
	{
		id: nanoid(),
		name: "New Mexico",
		abbreviation: "NM"
	},
	{
		id: nanoid(),
		name: "New York",
		abbreviation: "NY"
	},
	{
		id: nanoid(),
		name: "North Carolina",
		abbreviation: "NC"
	},
	{
		id: nanoid(),
		name: "North Dakota",
		abbreviation: "ND"
	},
	{
		id: nanoid(),
		name: "Northern Mariana Islands",
		abbreviation: "MP"
	},
	{
		id: nanoid(),
		name: "Ohio",
		abbreviation: "OH"
	},
	{
		id: nanoid(),
		name: "Oklahoma",
		abbreviation: "OK"
	},
	{
		id: nanoid(),
		name: "Oregon",
		abbreviation: "OR"
	},
	{
		id: nanoid(),
		name: "Palau",
		abbreviation: "PW"
	},
	{
		id: nanoid(),
		name: "Pennsylvania",
		abbreviation: "PA"
	},
	{
		id: nanoid(),
		name: "Puerto Rico",
		abbreviation: "PR"
	},
	{
		id: nanoid(),
		name: "Rhode Island",
		abbreviation: "RI"
	},
	{
		id: nanoid(),
		name: "South Carolina",
		abbreviation: "SC"
	},
	{
		id: nanoid(),
		name: "South Dakota",
		abbreviation: "SD"
	},
	{
		id: nanoid(),
		name: "Tennessee",
		abbreviation: "TN"
	},
	{
		id: nanoid(),
		name: "Texas",
		abbreviation: "TX"
	},
	{
		id: nanoid(),
		name: "Utah",
		abbreviation: "UT"
	},
	{
		id: nanoid(),
		name: "Vermont",
		abbreviation: "VT"
	},
	{
		id: nanoid(),
		name: "Virgin Islands",
		abbreviation: "VI"
	},
	{
		id: nanoid(),
		name: "Virginia",
		abbreviation: "VA"
	},
	{
		id: nanoid(),
		name: "Washington",
		abbreviation: "WA"
	},
	{
		id: nanoid(),
		name: "West Virginia",
		abbreviation: "WV"
	},
	{
		id: nanoid(),
		name: "Wisconsin",
		abbreviation: "WI"
	},
	{
		id: nanoid(),
		name: "Wyoming",
		abbreviation: "WY"
	}
];

export const ethnicities = [
	{
		id: nanoid(),
		name: "Select one",
		value: "select one"
	},
	{
		id: nanoid(),
		name: "Black or African American",
		value: "black or african american"
	},
	{
		id: nanoid(),
		name: "Hispanic",
		value: "hispanic"
	},
	{
		id: nanoid(),
		name: "Asian",
		value: "asian"
	},
	{
		id: nanoid(),
		name: "Native American or Alaska Native",
		value: "native american or alaska native"
	},
	{
		id: nanoid(),
		name: "Native Hawaiian or Other Pacific Islander",
		value: "pacific islander"
	},
	{
		id: nanoid(),
		name: "Middle Eastern or North African",
		value: "Middle Eastern or North African"
	},
	{
		id: nanoid(),
		name: "Multiracial (Two or More Races)",
		value: "multiracial"
	}
];

export const dynamicLayoutThemeColor = (department) => {
	if (!department) throw new Error("department is required.");

	switch (department) {
		case "members":
			return {
				base: "bg-gradient-to-br from-blue-500 to-blue-700",
				contrast: "bg-violet-50",
				hover: "hover:bg-violet-50",
				sectionNavbar: {
					root: "bg-red-600",
					hover: "hover:border-red-300"
				},
				text: {
					primary: "text-white",
					secondary: "text-blue-100",
					dark: "text-gray-900",
					muted: "text-gray-600",
					navbar: "text-white"
				},
				border: "border-violet-200"
			};

		case "parents":
			return {
				base: "bg-gradient-to-br from-orange-500 to-orange-700",
				contrast: "bg-orange-50",
				hover: "hover:bg-amber-50",
				sectionNavbar: {
					root: "bg-blue-600",
					hover: "hover:border-blue-300"
				},
				text: {
					primary: "text-white",
					secondary: "text-orange-100",
					dark: "text-gray-900",
					muted: "text-gray-600",
					navbar: "text-white"
				},
				border: "border-amber-200"
			};

		case "teachers":
			return {
				base: "bg-gradient-to-br from-green-500 to-green-700",
				contrast: "bg-slate-50",
				hover: "hover:bg-slate-50",
				sectionNavbar: {
					root: "bg-orange-600",
					hover: "hover:border-orange-300"
				},
				text: {
					primary: "text-white",
					secondary: "text-green-100",
					dark: "text-gray-900",
					muted: "text-gray-600",
					navbar: "text-white"
				},
				border: "border-slate-200"
			};

		case "admin":
			return {
				base: "bg-gradient-to-br from-indigo-600 to-indigo-900",
				contrast: "bg-slate-100",
				hover: "hover:bg-slate-100",
				sectionNavbar: {
					root: "bg-purple-700",
					hover: "hover:border-purple-300"
				},
				text: {
					primary: "text-white",
					secondary: "text-indigo-200",
					dark: "text-gray-900",
					muted: "text-gray-600",
					navbar: "text-white"
				},
				border: "border-slate-300"
			};

		case "careers":
			return {
				base: "bg-gradient-to-br from-teal-500 to-teal-700",
				contrast: "bg-gray-50",
				hover: "hover:bg-gray-50",
				sectionNavbar: {
					root: "bg-blue-600",
					hover: "hover:border-blue-300"
				},
				text: {
					primary: "text-white",
					secondary: "text-teal-100",
					dark: "text-gray-900",
					muted: "text-gray-600",
					navbar: "text-white"
				},
				border: "border-gray-200"
			};

		default:
			throw new Error("department is not recognized.");
	}
};

export const dynamicExternalNavlist = (department) => {
	if (!department) throw new Error("Current Department is required.");

	switch (department) {
		case "members":
			return membersExternalSectionNav;
		case "parents":
			return parentsExternalSectionNav;
		case "teachers":
			return teachersExternalSectionNav;
		case "admin":
			return adminExternalSectionNav;
		case "careers":
			return careersExternalSectionNav;
		default:
			throw new Error("Department not recognized.");
	}
};

export const dynamicInternalNavlist = (department) => {
	if (!department) throw new Error("Current Department is required.");

	switch (department) {
		case "members":
			return membersInaternalSectionNav;
		case "parents":
			return parentsInaternalSectionNav;
		case "teachers":
			return teachersInaternalSectionNav;
		case "admin":
			return adminInaternalSectionNav;
		case "careers":
			return careersInaternalSectionNav;
		default:
			throw new Error("Department not recognized.");
	}
};

export const signCurrentUserOut = async () => {
	try {
		await signOut({ redirect: false });

		return { success: true };
	} catch (error) {
		throw new Error("Logging out error:", error.message);
	}
};

export const dynamicInternalAppSections = (department, path) => {
	if (!department) throw new Error("Current Department is required.");
	if (!path) throw new Error("Path is required.");

	switch (true) {
		case path.startsWith("/dashboard"):
			switch (department) {
				case "members":
					return membersDashboardSectionNav;
				case "parents":
					return parentsDashboardSectionNav;
				case "teachers":
					return teachersDashboardSectionNav;
				case "admin":
					return adminDashboardSectionNav;
				case "careers":
					return careersDashboardSectionNav;
				default:
					throw new Error("Department not recognized.");
			}
			return;
		case path.startsWith("/assignments"):
			switch (department) {
				case "members":
					return membersAssignmentsSectionNav;
				case "parents":
					return parentsAssignmentsSectionNav;
				case "teachers":
					return teachersAssignmentsSectionNav;
				case "admin":
					return adminAssignmentsSectionNav;
				case "careers":
					return careersAssignmentsSectionNav;
				default:
					throw new Error("Department not recognized.");
			}
			return;
		case path.startsWith("/messages"):
			switch (department) {
				case "members":
					return membersMessagesSectionNav;
				case "parents":
					return parentsMessagesSectionNav;
				case "teachers":
					return teachersMessagesSectionNav;
				case "admin":
					return adminMessagesSectionNav;
				case "careers":
					return careersMessagesSectionNav;
				default:
					throw new Error("Department not recognized.");
			}
			return;
		case path.startsWith("/meetings"):
			switch (department) {
				case "members":
					return membersMeetingSectionNav;
				case "parents":
					return parentsMeetingSectionNav;
				case "teachers":
					return teachersMeetingSectionNav;
				case "admin":
					return adminMeetingSectionNav;
				case "careers":
					return careersMeetingSectionNav;
				default:
					throw new Error("Department not recognized.");
			}
			return;
		case path.startsWith("/events"):
			switch (department) {
				case "members":
					return membersEventsSectionNav;
				case "parents":
					return parentsEventsSectionNav;
				case "teachers":
					return teachersEventsSectionNav;
				case "admin":
					return adminEventsSectionNav;
				case "careers":
					return careersEventsSectionNav;
				default:
					throw new Error("Department not recognized.");
			}
			return;
		case path.startsWith("/documents"):
			switch (department) {
				case "members":
					return membersDocumentsSectionNav;
				case "parents":
					return parentsDocumentsSectionNav;
				case "teachers":
					return teachersDocumentsSectionNav;
				case "admin":
					return adminDocumentsSectionNav;
				case "careers":
					return careersDocumentsSectionNav;
				default:
					throw new Error("Department not recognized.");
			}
			return;
		case path.startsWith("/reports"):
			switch (department) {
				case "members":
					return membersReportsSectionNav;
				case "parents":
					return parentsReportsSectionNav;
				case "teachers":
					return teachersReportsSectionNav;
				case "admin":
					return adminReportsSectionNav;
				case "careers":
					return careersReportsSectionNav;
				default:
					throw new Error("Department not recognized.");
			}
			return;
		case path.startsWith("/schedules"):
			switch (department) {
				case "members":
					return [];
				case "parents":
					return [];
				case "teachers":
					return [];
				case "admin":
					return [];
				case "careers":
					return [];
				default:
					throw new Error("Department not recognized.");
			}
			return;
		case path.startsWith("/family"):
			switch (department) {
				case "members":
					return [];
				case "parents":
					return parentFamilySectionNav;
				case "teachers":
					return [];
				case "admin":
					return [];
				case "careers":
					return [];
				default:
					throw new Error("Department not recognized.");
			}
			return;
		// case path.startsWith(""):
		// 	switch (department) {
		// 		case "members":
		// 			return [];
		// 		case "parents":
		// 			return [];
		// 		case "teachers":
		// 			return [];
		// 		case "admin":
		// 			return [];
		// 		case "careers":
		// 			return [];
		// 		default:
		// 			throw new Error("Department not recognized.");
		// 	}
		// 	break;
		default:
			throw new Error("App Section is not recognized.");
	}
};

export const formatCurrency = (price) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD"
	}).format(price);

	return formatter;
};

export const dateFormatter = (date) => {
	if (date) {
		const results = date?.toString()?.split("T")[0].split("-");
		const [year, month, day] = results;
		const newDate = format(new Date(year, month - 1, day), "MM/dd/yyyy");
		return newDate;
	} else {
		return "Invalid date string provided.";
	}
};
