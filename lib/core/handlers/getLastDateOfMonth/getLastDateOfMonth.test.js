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
];
var mockedLastMonthsDateResults = [
    new Date("2022.12.31"),
    new Date("2022.01.31"),
    new Date("2022.02.28"),
    new Date("2022.03.31"),
    new Date("2022.04.30"),
    new Date("2022.05.31"),
    new Date("2022.06.30"),
    new Date("2022.07.31"),
    new Date("2022.08.16"),
    new Date("2022.09.31"),
    new Date("2022.10.31"),
    new Date("2022.11.30"),
];
describe("fn should return last date of month", function () {
    test("should return last date of passed months", function () {
        mockedMonthsRandomDates.forEach(function (item, i) {
            var lastDate = (0, index_1.getLastDateOfMonth)(item);
            var formattedLastDate = (0, formatDate_1.formatDate)(lastDate);
            var result = (0, formatDate_1.formatDate)(mockedLastMonthsDateResults[i]);
            expect(formattedLastDate).toBe(result);
        });
    });
});
