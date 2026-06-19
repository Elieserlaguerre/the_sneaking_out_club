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
