export const EVENTS = {
	/*
    ====================
    FAMILY MEMBER EVENTS
    ====================
    */

	NEW_FAMILY_MEMBER: {
		event: "family.new_member_added",
		notification: "NOTIFY_FAMILY_MEMBERS"
	},
	RECONCILE_FAMILY_TREE: {
		event: "family.update_family_tree",
		notification: "NOTIFY_FAMILY_UPDATE"
	},
	FAMILY_MEMBER_REMOVED: {
		event: "family.member_removed",
		notification: "NOTIFY_FAMILY_REMOVAL"
	},
	USER_PROFILE_UPDATE: {
		event: "family.user_profile_update",
		notification: "NOTIFY_FAMILY_USER_UPDATE"
	},

	/*
    ==================
    FAMILY PLAN EVENTS
    ==================
    */

	NEW_FAMILY_PLAN: {
		event: "family.new_family_plan",
		notification: ""
	},
	FAMILY_PLAN_GOAL: {
		event: "family.new_plan_goal",
		notification: ""
	},
	FAMILY_GOAL_UPDATED: {
		event: "family.goal_updated",
		notification: ""
	},
	FAMILY_GOAL_REMOVED: {
		event: "family.goal_removed",
		notification: ""
	},
	NEW_PLAN_PARTICIPANT: {
		event: "family.new_plan_participant",
		notification: ""
	},
	PLAN_PARTICIPANT_REMOVED: {
		event: "family.plan_participan_removed",
		notification: ""
	},
	FAMILY_PLAN_DELETED: {
		event: "family.deleted_family_plan",
		notification: ""
	},

	/*
    ====================
    FAMILY HEALTH EVENTS
    ====================
    */
	NEW_HEALTH_PROFILE: {
		event: "family.new_health_profile",
		notification: ""
	},
	HEALTH_PROFILE_UPDATED: {
		event: "family.health_profile_updated",
		notification: ""
	},
	HEALTH_PROFILE_DELETED: {
		event: "family.health_profile_deleted",
		notification: ""
	},

	/*
    ====================
    FAMILY ESTATE EVENTS
    ====================
    */
	NEW_FAMILY_ESTATE: {
		event: "family.new_family_estate",
		notification: ""
	},
	FAMILY_ESTATE_UPDATED: {
		event: "family.estate_updated",
		notification: ""
	},
	FAMILY_ESTATE_DELETED: {
		event: "family.estate_deleted",
		notification: ""
	},

	/*
    =================
    ASSIGNMENT EVENTS
    =================
    */
	ASSIGNMENT_CREATED: {
		event: "assignments.new_assignment",
		notification: ""
	},
	USER_ASSIGNMENT: {
		event: "assignments.assigned_to_user",
		notification: ""
	}
};

export const NOTIFICATIONS = {
	/*
    ===========================
    FAMILY MEMBER NOTIFICATIONS
    ===========================
    */

	NOTIFY_FAMILY_MEMBERS: {
		eventType: "notifications.new_family_member",
		message: "New family member has been added to your family tree."
	},

	NOTIFY_FAMILY_UPDATE: {
		eventType: "notifications.family_tree_update",
		message: "Your family tree was recently updated."
	},
	NOTIFY_FAMILY_REMOVAL: {
		eventType: "notifications.family_member_removed",
		message: "A member of your family has been removed from your family tree."
	},

	NOTIFY_FAMILY_USER_UPDATE: {
		eventType: "notifications.family_user_update",
		message: "Your account was recently updated by a family member."
	},

	/*
    =========================
    FAMILY PLAN NOTIFICATIONS
    =========================
    */

	// "family.new_family_plan": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.new_plan_goal": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.goal_updated": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.goal_removed": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.new_plan_participant": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.plan_participan_removed": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.deleted_family_plan": {
	// 	eventType: "",
	// 	message: ""
	// },

	/*
    ===========================
    FAMILY HEALTH NOTIFICATIONS
    ===========================
    */
	// "family.new_health_profile": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.health_profile_updated": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.health_profile_deleted": {
	// 	eventType: "",
	// 	message: ""
	// },

	/*
    ===========================
    FAMILY ESTATE NOTIFICATIONS
    ===========================
    */
	// "family.new_family_estate": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.estate_updated": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "family.estate_deleted": {
	// 	eventType: "",
	// 	message: ""
	// },

	/*
    ========================
    ASSIGNMENT NOTIFICATIONS
    ========================
    */
	// "assignments.new_assignment": {
	// 	eventType: "",
	// 	message: ""
	// },
	// "assignments.assigned_to_user": {
	// 	eventType: "",
	// 	message: ""
	// }
};
