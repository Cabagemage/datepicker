"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDayOfWeek = void 0;
var formatDayOfWeek = function (date, locale) {
	return date.toLocaleDateString(locale, { weekday: "short" });
};
exports.formatDayOfWeek = formatDayOfWeek;
