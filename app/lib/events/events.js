export const EVENTS = {
	/*
    ====================
    FAMILY MEMBER EVENTS
    ====================
    */

	NEW_FAMILY_MEMBER: "family.new_member_added",
	RECONCILE_FAMILY_TREE: "family.update_family_tree",
	FAMILY_MEMBER_REMOVED: "family.member_removed",

	/*
    ==================
    FAMILY PLAN EVENTS
    ==================
    */

	NEW_FAMILY_PLAN: "family.new_family_plan",
	FAMILY_PLAN_GOAL: "family.new_plan_goal",
	FAMILY_GOAL_UPDATED: "family.goal_updated",
	FAMILY_GOAL_REMOVED: "family.goal_removed",
	NEW_PLAN_PARTICIPANT: "family.new_plan_participant",
	PLAN_PARTICIPANT_REMOVED: "family.plan_participan_removed",
	FAMILY_PLAN_DELETED: "family.deleted_family_plan",

	/*
    ====================
    FAMILY HEALTH EVENTS
    ====================
    */
	NEW_HEALTH_PROFILE: "family.new_health_profile",
	HEALTH_PROFILE_UPDATED: "family.health_profile_updated",
	HEALTH_PROFILE_DELETED: "family.health_profile_deleted",

	/*
    ====================
    FAMILY ESTATE EVENTS
    ====================
    */
	NEW_FAMILY_ESTATE: "family.new_family_estate",
	FAMILY_ESTATE_UPDATED: "family.estate_updated",
	FAMILY_ESTATE_DELETED: "family.estate_deleted",

	/*
    =================
    ASSIGNMENT EVENTS
    =================
    */
	ASSIGNMENT_CREATED: "assignments.new_assignment",
	USER_ASSIGNMENT: "assignments.assigned_to_user"
};
