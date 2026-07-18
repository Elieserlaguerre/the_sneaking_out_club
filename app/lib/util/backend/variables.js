import Admin from "../../models/Admin";
import Event from "../../models/Event";
import Group from "../../models/Group";
import Member from "../../models/Member";
import Parent from "../../models/Parent";
import Post from "../../models/Post";
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


export const CONTENT_MAP = {
	Post,
	Group,
	Event
}