"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var mockedWeek = [
	new Date("2022.12.01"),
	new Date("2022.01.21"),
	new Date("2022.02.28"),
	new Date("2022.03.12"),
	new Date("2022.04.12"),
	new Date("2022.05.15"),
	new Date("2022.06.12"),
	new Date("2022.07.12"),
];
var formattedDateResultsWithDot = [
	"2022.12.01",
	"2022.01.21",
	"2022.02.28",
	"2022.03.12",
	"2022.04.12",
	"2022.05.15",
	"2022.06.12",
	"2022.07.12",
];
var formattedDateResultsWithSkin = [
	"2022-12-01",
	"2022-01-21",
	"2022-02-28",
	"2022-03-12",
	"2022-04-12",
	"2022-05-15",
	"2022-06-12",
	"2022-07-12",
];
describe("fn should return formatted dates", function () {
	test("should format passed Dates with dot", function () {
		mockedWeek.forEach(function (item, i) {
			var formattedDate = (0, index_1.formatDate)(item, ".");
			var result = formattedDateResultsWithDot[i];
			expect(formattedDate).toBe(result);
		});
	});
	test("should format passed Dates with skin", function () {
		mockedWeek.forEach(function (item, i) {
			var formattedDate = (0, index_1.formatDate)(item, "-");
			var result = formattedDateResultsWithSkin[i];
			expect(formattedDate).toBe(result);
		});
	});
});
