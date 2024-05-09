function serializeIntArray(arr: number[]): string {
    let serialized = '';
    for (let i = 0; i < arr.length; i++) {
        serialized += String.fromCharCode(arr[i] + 31);
    }
    return serialized;
}

function deserializeIntArray(serialized: string): number[] {
    let arr: number[] = [];
    for (let i = 0; i < serialized.length; i++) {
        arr.push(serialized.charCodeAt(i) - 31);
    }
    return arr;
}

export { serializeIntArray, deserializeIntArray };