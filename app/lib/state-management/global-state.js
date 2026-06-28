import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const currentDepartment = atomWithStorage("current_department", "");

export const currentUser = atomWithStorage("current_user", "");

export const openMessages = atom(false);

export const groupPreview = atom({
	name: "",
	about: "",
	privacy: "",
	visibility: "",
	members: [],
	image: "",
	events: [],
	owner: "",
	ownerType: "",
	managers: [],
	groupId: ""
});
