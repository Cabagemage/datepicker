"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
// role of this function - format dates for tests & inner usage to get equality of passed dates.
// as example, it's using in month view to get active dates.
var formatDate = function (date, separator) {
	if (separator === void 0) {
		separator = "-";
	}
	var newDate = new Date(date);
	var month = "" + (newDate.getMonth() + 1);
	var day = "" + newDate.getDate();
	var year = newDate.getFullYear();
	if (month.length < 2) {
		month = "0" + month;
	}
	if (day.length < 2) {
		day = "0" + day;
	}
	return [year, month, day].join(separator);
};
exports.formatDate = formatDate;
