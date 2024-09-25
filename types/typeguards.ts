export function isNull<T>(value: T | null): value is null {
    return value === null;
}
export function isUndefined<T>(value: T | undefined): value is undefined {
    return value === undefined;
}

export function isEmpty<T>(value: T | null | Array<T> | Object): boolean {
    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0;
    }

    return false;
}
