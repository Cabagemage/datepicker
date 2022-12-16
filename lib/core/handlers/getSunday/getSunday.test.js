"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var formatDate_1 = require("../formatDate");
var mockedWeek = [
	new Date("Thu Dec 08 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Fri Dec 09 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Thu Dec 08 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Wed Dec 07 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Tue Dec 06 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Mon Dec 05 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Sat Dec 10 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Sun Dec 11 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
];
describe("fn should return sunday", function () {
	test("should be sunday of passed week", function () {
		var result = new Date("Sun Dec 11 2022 00:00:00 GMT+0300 (Moscow Standard Time)");
		mockedWeek.forEach(function (item) {
			var monday = (0, index_1.getSunday)(item);
			expect((0, formatDate_1.formatDate)(monday)).toBe((0, formatDate_1.formatDate)(result));
		});
	});
});
