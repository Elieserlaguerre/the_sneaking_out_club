import { buttonVariants } from "@/app/components/shadcn/button";

export function calculateAge(dateString) {
	if (dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}
}

export function getInitials(str = "") {
	return str
		.split(/[\s_]+/) // split on spaces and underscores
		.filter((word) => /^[a-zA-Z0-9]/.test(word)) // ignore &, -, etc.
		.map((word) => word[0].toUpperCase())
		.join("");
}

export const dynamicButton = (department) => {
	switch (department) {
		case "members":
			return buttonVariants({ variant: "destructiveBtn" });
		case "parents":
			return buttonVariants({ variant: "blueBtn" });
		case "teachers":
			return buttonVariants({ variant: "orangeBtn" });
		default:
			return;
	}
};

export const dynamicHighlights = (department) => {
	switch (department) {
		case "members":
			return "border-red-500 text-red-500";
		case "parents":
			return "border-blue-500 text-blue-500";
		case "teachers":
			return "border-orange-500 text-orange-500";
		default:
			return;
	}
};

export const privacyDetails = (type) => {
	switch (type) {
		case "private":
			return "Only members can see who's in the group and what they post.";
		case "public":
			return "Anyone can see who's in the group and what they post.";
		default:
			return;
	}
};

export const visibilityDetails = (type) => {
	switch (type) {
		case "visible":
			return "Anyone can find this group";
		case "hidden":
			return "Only members can find this group.";
		default:
			return;
	}
};
