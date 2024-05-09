"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('Serialization and deserialization tests', function () {
    test('Shortest case - 50 numbers', function () {
        var originalArray = generateRandomArray(50);
        var serializedArray = (0, index_1.serializeIntArray)(originalArray);
        var deserializedArray = (0, index_1.deserializeIntArray)(serializedArray);
        compressionRatio(serializedArray, originalArray);
        expect(deserializedArray).toEqual(originalArray);
    });
    test('Short case - 100 numbers', function () {
        var originalArray = generateRandomArray(100);
        var serializedArray = (0, index_1.serializeIntArray)(originalArray);
        var deserializedArray = (0, index_1.deserializeIntArray)(serializedArray);
        compressionRatio(serializedArray, originalArray);
        expect(deserializedArray).toEqual(originalArray);
    });
    test('Medium case - 500 numbers', function () {
        var originalArray = generateRandomArray(500);
        var serializedArray = (0, index_1.serializeIntArray)(originalArray);
        var deserializedArray = (0, index_1.deserializeIntArray)(serializedArray);
        compressionRatio(serializedArray, originalArray);
        expect(deserializedArray).toEqual(originalArray);
    });
    test('Long case - 1000 numbers', function () {
        var originalArray = generateRandomArray(1000);
        var serializedArray = (0, index_1.serializeIntArray)(originalArray);
        var deserializedArray = (0, index_1.deserializeIntArray)(serializedArray);
        compressionRatio(serializedArray, originalArray);
        expect(deserializedArray).toEqual(originalArray);
    });
    test('Boundary case - all numbers with 1 digit', function () {
        var originalArray = generateNumbersWithNDigits(1, 900);
        var serializedArray = (0, index_1.serializeIntArray)(originalArray);
        var deserializedArray = (0, index_1.deserializeIntArray)(serializedArray);
        compressionRatio(serializedArray, originalArray);
        expect(deserializedArray).toEqual(originalArray);
    });
    test('Boundary case - all numbers with 2 digits', function () {
        var originalArray = generateNumbersWithNDigits(2, 900);
        var serializedArray = (0, index_1.serializeIntArray)(originalArray);
        var deserializedArray = (0, index_1.deserializeIntArray)(serializedArray);
        compressionRatio(serializedArray, originalArray);
        expect(deserializedArray).toEqual(originalArray);
    });
    test('Boundary case - all numbers with 3 digits', function () {
        var originalArray = generateNumbersWithNDigits(3, 900);
        var serializedArray = (0, index_1.serializeIntArray)(originalArray);
        var deserializedArray = (0, index_1.deserializeIntArray)(serializedArray);
        compressionRatio(serializedArray, originalArray);
        expect(deserializedArray).toEqual(originalArray);
    });
});
// Функция для генерации случайного массива чисел
function generateRandomArray(length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 300) + 1);
    }
    return arr;
}
// Функция для генерации массива чисел с определенным количеством цифр
function generateNumbersWithNDigits(digits, length) {
    var arr = [];
    var min = Math.pow(10, digits - 1);
    var max = Math.pow(10, digits) - 1;
    for (var i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}
function compressionRatio(serializedArray, originalArray) {
    console.log("Compression ratio:", (1 - serializedArray.length / (originalArray.length * 4)) * 100, "%");
}
