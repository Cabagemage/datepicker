"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatDate_1 = require("../formatDate");
var index_1 = require("./index");
describe("fn should return prevDate", function () {
	test("fn should return array of dates", function () {
		var startDate = new Date("2022-12-12");
		var endDate = new Date("2022-12-24");
		var dates = (0, index_1.getDatesInRange)(startDate, endDate).map(function (item) {
			return (0, formatDate_1.formatDate)(item);
		});
		expect(dates).toEqual([
			"2022-12-12",
			"2022-12-13",
			"2022-12-14",
			"2022-12-15",
			"2022-12-16",
			"2022-12-17",
			"2022-12-18",
			"2022-12-19",
			"2022-12-20",
			"2022-12-21",
			"2022-12-22",
			"2022-12-23",
			"2022-12-24",
		]);
	});
	test("array length should be correct", function () {
		var startDate = new Date("2022-12-12");
		var endDate = new Date("2022-12-24");
		var dates = (0, index_1.getDatesInRange)(startDate, endDate).map(function (item) {
			return (0, formatDate_1.formatDate)(item);
		});
		expect(dates.length).toBe(13);
	});
});
