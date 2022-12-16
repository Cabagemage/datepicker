"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekDays = void 0;
var getMonday_1 = require("../getMonday");
var getSunday_1 = require("../getSunday");
var getDatesInRange_1 = require("../getDatesInRange");
var getWeekDays = function (date) {
	var beginningOfWeek = (0, getMonday_1.getMonday)(date);
	var weekEnd = (0, getSunday_1.getSunday)(date);
	return (0, getDatesInRange_1.getDatesInRange)(beginningOfWeek, weekEnd);
};
exports.getWeekDays = getWeekDays;
