export const EVENT_TYPES = {
	// Academic
	ASSIGNMENT_ON_TIME: "assignment_on_time",
	ASSIGNMENT_LATE: "assignment_late",
	ASSIGNMENT_MISSED: "assignment_missed",
	GRADE_ABOVE_B: "grade_above_b",
	GRADE_BELOW_B: "grade_below_b",
	GRADE_ASSIGNMENT: "grade_assignment",
	GPA_DROP: "gpa_drop",
	GPA_IMPROVED: "gpa_improved",

	// Behavior
	RULE_VIOLATION: "rule_violation",
	INTEGRITY_BREACH: "integrity_breach",

	// Participation
	EVENT_ATTENDED: "event_attended",
	EVENT_MISSED_REQUIRED: "event_missed_required",

	// Positive engagement
	STREAK_BONUS: "streak_bonus",

	// Positive engagement / rewards
	PERK_AWARDED: "perk_awarded"
};

export const REPUTATION_WEIGHTS = {
	assignment_on_time: +10,
	assignment_late: -5,
	assignment_missed: -15,

	grade_above_b: +15,
	grade_below_b: -20,
	gpa_drop: -25,
	gpa_improved: +30,

	event_attended: +20,
	event_missed_required: -20,

	rule_violation: -50,
	integrity_breach: -100,

	streak_bonus: +25
};

export const SUSPENSION_DURATIONS = {
	1: 90, //days
	2: 180, //days
	3: 365 //days
};

export const EVENT_COOLDOWNS = {
	assignment_on_time: {
		windowMs: 24 * 60 * 60 * 1000,
		maxOccurrences: 5
	},
	event_attended: {
		windowMs: 24 * 60 * 60 * 1000,
		maxOccurrences: 3
	}
};

export const sourceMapping = {
	assignment_on_time: "assignment",
	assignment_late: "assignment",
	assignment_missed: "assignment",
	event_attended: "event",
	event_missed_required: "event",
	rule_violation: "manual",
	integrity_breach: "manual",
	streak_bonus: "system",
	grade_above_b: "assignment",
	grade_below_b: "assignment",
	grade_assignment: "assignment",
	gpa_drop: "system",
	gpa_improved: "system",
	perk_awarded: "manual"
};

export const STREAK_EVENTS = [EVENT_TYPES.ASSIGNMENT_ON_TIME, EVENT_TYPES.EVENT_ATTENDED];

export const DAY_MS = 24 * 60 * 60 * 1000;

export const RATE_LIMITED_EVENTS = [EVENT_TYPES.ASSIGNMENT_ON_TIME, EVENT_TYPES.EVENT_ATTENDED];
