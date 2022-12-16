"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthsOfYear = void 0;
var add_1 = require("../add");
var getMonthsOfYear = function (date) {
	var getStartOfYear = new Date(date.getFullYear(), 0, 1);
	var getEndOfYear = new Date(date.getFullYear(), 11, 31);
	var months = [];
	var currentDate = getStartOfYear;
	while (currentDate <= getEndOfYear) {
		months.push(currentDate);
		currentDate = (0, add_1.add)({ date: currentDate, count: 1, type: "month" });
	}
	return months;
};
exports.getMonthsOfYear = getMonthsOfYear;
