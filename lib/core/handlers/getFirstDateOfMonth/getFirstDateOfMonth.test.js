"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatDate_1 = require("../formatDate");
var index_1 = require("./index");
var mockedMonthsRandomDates = [
    new Date("2022.12.01"),
    new Date("2022.01.21"),
    new Date("2022.02.28"),
    new Date("2022.03.12"),
    new Date("2022.04.12"),
    new Date("2022.05.15"),
    new Date("2022.06.12"),
    new Date("2022.07.12"),
    new Date("2022.08.07"),
    new Date("2022.09.07"),
    new Date("2022.10.17"),
    new Date("2022.11.19"),
];
var mockedFirstDateOfMonthResults = [
    new Date("2022.12.01"),
    new Date("2022.01.01"),
    new Date("2022.02.01"),
    new Date("2022.03.01"),
    new Date("2022.04.01"),
    new Date("2022.05.01"),
    new Date("2022.06.01"),
    new Date("2022.07.01"),
    new Date("2022.08.01"),
    new Date("2022.09.01"),
    new Date("2022.10.01"),
    new Date("2022.11.01"),
];
describe("fn should return first date of month", function () {
    test("should return array of first month date of passed dates", function () {
        mockedMonthsRandomDates.forEach(function (item, i) {
            var firstDate = (0, index_1.getFirstDateOfMonth)(item);
            var formattedLastDate = (0, formatDate_1.formatDate)(firstDate);
            var result = (0, formatDate_1.formatDate)(mockedFirstDateOfMonthResults[i]);
            expect(formattedLastDate).toBe(result);
        });
    });
});
