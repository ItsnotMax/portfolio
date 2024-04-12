export function sortByKeyAscending<T>(array: T[], key: keyof T): T[] {
    return array.sort((a: T, b: T) => {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    });
}

export function sortByKeyDescending<T>(array: T[], key: keyof T): T[] {
    return array.sort((a: T, b: T) => {
        if (a[key] > b[key]) {
            return -1;
        }
        if (a[key] < b[key]) {
            return 1;
        }
        return 0;
    });
}