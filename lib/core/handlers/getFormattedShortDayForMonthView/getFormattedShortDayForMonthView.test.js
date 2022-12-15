"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var mockedRandomDates = [
    new Date("2022.12.01"),
    new Date("2022.01.21"),
    new Date("2022.02.28"),
    new Date("2022.03.12"),
    new Date("2022.04.05"),
    new Date("2022.05.06"),
    new Date("2022.06.07"),
    new Date("2022.07.08"),
    new Date("2022.08.09"),
    new Date("2022.09.10"),
    new Date("2022.10.11"),
    new Date("2022.11.30"),
];
var mockedResults = ["1", "21", "28", "12", "5", "6", "7", "8", "9", "10", "11", "30"];
describe("fn should return first date of month", function () {
    test("should return formatted days to dates numbers", function () {
        mockedRandomDates.forEach(function (item, i) {
            var formattedShortDayForMonthView = (0, index_1.getFormattedShortDayForMonthView)(item);
            var result = mockedResults[i];
            expect(formattedShortDayForMonthView).toBe(result);
        });
    });
});
