"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var randomDates = [
    new Date("2022-01-11"),
    new Date("2022-12-12"),
    new Date("2022-12-31"),
    new Date("2000-12-14"),
    new Date("1968-12-15"),
    new Date("1967-12-16"),
    new Date("1600-12-17"),
];
var testDate = new Date("2023-12-31");
describe("should confirm that date is earlier than second one", function () {
    test("every mock data should return true", function () {
        randomDates.forEach(function (item) {
            var result = (0, index_1.isFirstDateEarlierThanSecondOne)(item, testDate);
            expect(result).toBe(true);
        });
    });
    test("", function () {
        randomDates.forEach(function (item) {
            var result = (0, index_1.isFirstDateEarlierThanSecondOne)(item, testDate);
            expect(result).toBe(true);
        });
    });
});
