"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var mockedWeek = [new Date("2022.01.01"), new Date("2022.01.08"), new Date("2022.12.14")];
var result = [1, 2, 50];
describe("fn should return monday", function () {
	test("should be monday of passed week", function () {
		mockedWeek.forEach(function (item, i) {
			var monday = (0, index_1.getOrdinalNumberOfWeek)(item);
			expect(monday).toBe(result[i]);
		});
	});
});
