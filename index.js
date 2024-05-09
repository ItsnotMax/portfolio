"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeIntArray = exports.serializeIntArray = void 0;
function serializeIntArray(arr) {
    var serialized = '';
    for (var i = 0; i < arr.length; i++) {
        serialized += String.fromCharCode(arr[i] + 31);
    }
    return serialized;
}
exports.serializeIntArray = serializeIntArray;
function deserializeIntArray(serialized) {
    var arr = [];
    for (var i = 0; i < serialized.length; i++) {
        arr.push(serialized.charCodeAt(i) - 31);
    }
    return arr;
}
exports.deserializeIntArray = deserializeIntArray;
