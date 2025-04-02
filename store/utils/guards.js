export function objectIsNull(obj) {
	if (obj === null || obj === "") return true;
	if (typeof obj === "object") {
		for (let key in obj) {
			if (objectIsNull(obj[key])) {
				return true;
			}
		}
	}
	return false;
}
