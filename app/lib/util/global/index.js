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

export function mapConnectionsByType(connections = []) {
	return connections.reduce((acc, conn) => {
		const { memberType, member } = conn;

		if (!acc[memberType]) {
			acc[memberType] = [];
		}

		acc[memberType].push(member);

		return acc;
	}, {});
}
