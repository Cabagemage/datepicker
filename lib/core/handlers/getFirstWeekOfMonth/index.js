"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstWeekOfMonth = void 0;
var getFirstDateOfMonth_1 = require("../getFirstDateOfMonth");
var getMonday_1 = require("../getMonday");
var subtract_1 = require("../subtract");
var getDatesInRange_1 = require("../getDatesInRange");
var getFirstWeekOfMonth = function (_a) {
	var _b = _a.initialDate,
		initialDate = _b === void 0 ? new Date() : _b,
		month = _a.month,
		year = _a.year;
	var startDate = new Date(
		year !== null && year !== void 0 ? year : initialDate.getFullYear(),
		month !== null && month !== void 0 ? month : initialDate.getMonth(),
		1
	);
	var firstDayOfMonth = (0, getFirstDateOfMonth_1.getFirstDateOfMonth)(startDate);
	var mondayFromPreviousMonthOrCurrentMonth = (0, getMonday_1.getMonday)(firstDayOfMonth);
	var nextMonthAfterPreviousMonthOrCurrentMonthMonday = (0, getMonday_1.getMonday)(
		new Date(
			startDate === null || startDate === void 0 ? void 0 : startDate.getFullYear(),
			startDate === null || startDate === void 0 ? void 0 : startDate.getMonth(),
			7
		)
	);
	// if monday equal to first date of month, then we should get last monday of previous month
	var finalStartMonday =
		mondayFromPreviousMonthOrCurrentMonth.toUTCString() ===
		nextMonthAfterPreviousMonthOrCurrentMonthMonday.toUTCString()
			? (0, getMonday_1.getMonday)((0, subtract_1.subtract)({ date: firstDayOfMonth, count: 7, type: "day" }))
			: mondayFromPreviousMonthOrCurrentMonth;
	var week = (0, getDatesInRange_1.getDatesInRange)(
		finalStartMonday,
		nextMonthAfterPreviousMonthOrCurrentMonthMonday
	);
	return week;
};
exports.getFirstWeekOfMonth = getFirstWeekOfMonth;
