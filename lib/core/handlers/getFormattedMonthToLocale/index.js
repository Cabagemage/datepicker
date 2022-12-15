"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedMonthToLocale = void 0;
var getFormattedMonthToLocale = function (_a) {
    var month = _a.month, format = _a.format, locale = _a.locale;
    var monthFormat = format === undefined ? "long" : format;
    var formattedMonth = month.toLocaleDateString(locale, {
        month: monthFormat,
        day: undefined,
    });
    return formattedMonth[0].toUpperCase() + formattedMonth.slice(1);
};
exports.getFormattedMonthToLocale = getFormattedMonthToLocale;
