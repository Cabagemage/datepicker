"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthCalendarViewDates = void 0;
var formatDate_1 = require("../formatDate");
var constants_1 = require("../../constants");
var getCurrentMonth_1 = require("../getCurrentMonth");
var getFirstWeekOfMonth_1 = require("../getFirstWeekOfMonth");
var getLastWeekOfMonth_1 = require("../getLastWeekOfMonth");
var getMonday_1 = require("../getMonday");
var getSunday_1 = require("../getSunday");
var getDatesInRange_1 = require("../getDatesInRange");
var getMonthCalendarViewDates = function (_a) {
	var _b = _a.initialDate,
		initialDate = _b === void 0 ? new Date() : _b,
		month = _a.month,
		year = _a.year;
	var firstWeekOfMonth = (0, getFirstWeekOfMonth_1.getFirstWeekOfMonth)({
		initialDate: initialDate,
		month: month,
		year: year,
	});
	var lastWeekOfMonth = (0, getLastWeekOfMonth_1.getLastWeekOfMonth)({
		initialDate: initialDate,
		month: month,
		year: year,
	});
	var currentMonth = (0, getCurrentMonth_1.getCurrentMonth)({
		year: year !== null && year !== void 0 ? year : initialDate.getFullYear(),
		month: month !== null && month !== void 0 ? month : initialDate.getMonth(),
	});
	var nextMondayOfLastWeekOfMonth = (0, getMonday_1.getMonday)(lastWeekOfMonth[lastWeekOfMonth.length - 1]);
	var nextSundayOfLastWeekOfMonth = (0, getSunday_1.getSunday)(lastWeekOfMonth[lastWeekOfMonth.length - 1]);
	var lastWeek = (0, getDatesInRange_1.getDatesInRange)(
		nextMondayOfLastWeekOfMonth,
		nextSundayOfLastWeekOfMonth
	);
	var temporaryArray = firstWeekOfMonth.concat(currentMonth).concat(lastWeekOfMonth).concat(lastWeek);
	var excludeRepeatedElements = temporaryArray.filter(function (day, idx, array) {
		return (
			array.findIndex(function (value) {
				return (0, formatDate_1.formatDate)(value) === (0, formatDate_1.formatDate)(day);
			}) === idx
		);
	});
	var monthCalendarViewDates =
		constants_1.MAX_DATES_LENGTH < excludeRepeatedElements.length
			? excludeRepeatedElements.slice(0, -7)
			: excludeRepeatedElements;
	return monthCalendarViewDates;
};
exports.getMonthCalendarViewDates = getMonthCalendarViewDates;
