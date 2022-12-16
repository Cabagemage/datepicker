"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentMonth = void 0;
var constants_1 = require("../../constants");
var getCurrentMonth = function (_a) {
    var _b = _a.year, year = _b === void 0 ? new Date().getFullYear() : _b, _c = _a.month, month = _c === void 0 ? new Date().getMonth() : _c;
    if (!constants_1.MONTHS_IDX_LIST.includes(month)) {
        throw new Error("Please, add month between 0 - 11");
    }
    var date = new Date(year, month, 1);
    var dates = [];
    while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
};
exports.getCurrentMonth = getCurrentMonth;
