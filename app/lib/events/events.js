export const EVENTS = {
	/*
	==============
	FRIEND REQUEST
	==============
	*/

	FRIEND_REQUEST: {
		event: "user.friend_request",
		notification: "FRIEND_REQUEST"
	},

	FRIEND_REQUEST_ACCEPTED: {
		event: "user.request_accepted",
		notification: "REQUEST_ACCEPTED"
	},

	FRIEND_REQUEST_DENIED: {
		event: "user.request_denied",
		notification: "REQUEST_DENIED"
	},

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
	==============
	FRIEND REQUEST
	==============
	*/

	FRIEND_REQUEST: {
		event: "notifications.friend_request",
		title: "friend request",
		message: "you have a new friend request"
	},
	REQUEST_ACCEPTED: {
		event: "notifications.request_accepted",
		title: "friend request accepted",
		message: "friend request was accepted"
	},
	REQUEST_DENIED: {
		event: "notifications.request_denied",
		title: "friend request denied",
		message: "friend request was denied"
	},

	/*
    ===========================
    FAMILY MEMBER NOTIFICATIONS
    ===========================
    */

	NOTIFY_FAMILY_MEMBERS: {
		event: "notifications.new_family_member",
		title: "family member notification",
		message: "A new family member has been added to your family tree."
	},

	NOTIFY_FAMILY_UPDATE: {
		event: "notifications.family_tree_update",
		title: "family tree update",
		message: "Your family tree was recently updated."
	},
	NOTIFY_FAMILY_REMOVAL: {
		event: "notifications.family_member_removed",
		title: "family member removed",
		message: "A member of your family has been removed from your family tree."
	},

	NOTIFY_FAMILY_USER_UPDATE: {
		event: "notifications.family_user_update",
		title: "profile update",
		message: "Your account was recently updated by a family member."
	}
};
