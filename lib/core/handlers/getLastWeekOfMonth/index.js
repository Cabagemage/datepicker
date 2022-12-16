"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastWeekOfMonth = void 0;
var getLastDateOfMonth_1 = require("../getLastDateOfMonth");
var getMonday_1 = require("../getMonday");
var add_1 = require("../add");
var getDatesInRange_1 = require("../getDatesInRange");
var getLastWeekOfMonth = function (_a) {
	var _b = _a.initialDate,
		initialDate = _b === void 0 ? new Date() : _b,
		month = _a.month,
		year = _a.year;
	var startDate = new Date(
		year !== null && year !== void 0 ? year : initialDate.getFullYear(),
		month !== null && month !== void 0 ? month : initialDate.getMonth(),
		1
	);
	var lastDayOfMonth = (0, getLastDateOfMonth_1.getLastDateOfMonth)(startDate);
	var lastMondayOfMonth = (0, getMonday_1.getMonday)(lastDayOfMonth);
	var firstMondayOfNextMonth = (0, getMonday_1.getMonday)(
		(0, add_1.add)({ date: lastMondayOfMonth, type: "day", count: 7 })
	);
	var lastDatePickerWeek = (0, getDatesInRange_1.getDatesInRange)(lastMondayOfMonth, firstMondayOfNextMonth);
	return lastDatePickerWeek;
};
exports.getLastWeekOfMonth = getLastWeekOfMonth;
