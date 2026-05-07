import Admin from "../../models/Admin";
import Member from "../../models/Member";
import Parent from "../../models/Parent";
import Teacher from "../../models/Teacher";

export const USER_MODEL = {
	members: "Member",
	parents: "Parent",
	teachers: "Teacher",
	admin: "Admin",
	careers: "Applicant"
};

export const MODEL_MAP = {
	Member,
	Parent,
	Teacher,
	Admin
};
