import type { Essences } from "./types";

export function isNull<T>(value: T | null): value is null {
	return value === null;
}
export function isUndefined<T>(value: T | undefined): value is undefined {
	return value === undefined;
}

export function isEmpty<T>(value: T | null | Array<T> | object): boolean {
	if (Array.isArray(value)) {
		return value.length === 0;
	}

	if (typeof value === "object" && value !== null) {
		return Object.keys(value).length === 0;
	}

	return false;
}

export function isStringArray(value: unknown): value is string[] {
	return (
		Array.isArray(value) && value.every((item) => typeof item === "string")
	);
}
export function isString(value: unknown): value is string {
	return typeof value === "string";
}

export function isEssenceArray(value: unknown): value is Essences {
	return (
		Array.isArray(value) &&
		value.every(
			(item) =>
				typeof item === "object" &&
				(item.slug || item.leads || item.contacts || item.companies)
		)
	);
}
