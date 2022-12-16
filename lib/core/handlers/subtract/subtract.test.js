"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatDate_1 = require("../formatDate");
var index_1 = require("./index");
var initDate = function () {
	return new Date("2022-12-12");
};
beforeEach(function () {
	return initDate();
});
describe("fn should return prevDate", function () {
	test("Should return prev week start", function () {
		var date = initDate();
		for (
			var _i = 0,
				_a = [
					{ count: 10, expect: "2022-12-02" },
					{ count: 30, expect: "2022-11-12" },
				];
			_i < _a.length;
			_i++
		) {
			var test_1 = _a[_i];
			expect(
				(0, formatDate_1.formatDate)((0, index_1.subtract)({ date: date, count: test_1.count, type: "day" }))
			).toBe(test_1.expect);
		}
	});
	test("Should return prev month start", function () {
		var mockDateObject = initDate();
		for (
			var _i = 0,
				_a = [
					{ count: 1, expect: "2022-11-12" },
					{ count: 2, expect: "2022-10-12" },
					{ count: 6, expect: "2022-06-12" },
					{ count: 12, expect: "2021-12-12" },
					{ count: 24, expect: "2020-12-12" },
				];
			_i < _a.length;
			_i++
		) {
			var test_2 = _a[_i];
			expect(
				(0, formatDate_1.formatDate)(
					(0, index_1.subtract)({ date: mockDateObject, count: test_2.count, type: "month" })
				)
			).toBe(test_2.expect);
		}
	});
	test("Should return substracted years date", function () {
		var mockDateObject = initDate();
		for (
			var _i = 0,
				_a = [
					{ count: 1, expect: "2021-12-12" },
					{ count: 2, expect: "2020-12-12" },
					{ count: 10, expect: "2012-12-12" },
					{ count: 20, expect: "2002-12-12" },
					{ count: 100, expect: "1922-12-12" },
				];
			_i < _a.length;
			_i++
		) {
			var test_3 = _a[_i];
			expect(
				(0, formatDate_1.formatDate)(
					(0, index_1.subtract)({ date: mockDateObject, count: test_3.count, type: "year" })
				)
			).toBe(test_3.expect);
		}
	});
	test("Should return prev week", function () {
		var mockDateObject = initDate();
		for (
			var _i = 0,
				_a = [
					{ count: 1, expect: "2022-12-05" },
					{ count: 2, expect: "2022-11-28" },
					{ count: 4, expect: "2022-11-14" },
				];
			_i < _a.length;
			_i++
		) {
			var test_4 = _a[_i];
			expect(
				(0, formatDate_1.formatDate)(
					(0, index_1.subtract)({ date: mockDateObject, count: test_4.count, type: "week" })
				)
			).toBe(test_4.expect);
		}
	});
});
