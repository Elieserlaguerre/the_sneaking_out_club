import { MODEL_MAP } from "./variables";

export async function fetchConnections(groupedConnections, filters) {
	const results = {};

	await Promise.all(
		Object.entries(groupedConnections).map(async ([type, ids]) => {
			const Model = MODEL_MAP[type];

			if (!Model) return;

			const options = {
				_id: { $in: ids },
				...filters
			};
			const docs = await Model.find(options);

			results[type] = docs;
		})
	);

	return results;
}

export function arrayPagination(array, page = 1, limit = 10) {
	const start = (page - 1) * limit;
	const end = start + limit;

	return {
		data: array.slice(start, end),
		total: array.length,
		page,
		totalPages: Math.ceil(array.length / limit)
	};
}
