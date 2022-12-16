"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatesInRange = void 0;
var add_1 = require("../add");
var getDatesInRange = function (startDate, endDate) {
    if (startDate === null || endDate === null) {
        throw new Error("Start date of end date wasnt passed");
    }
    var dates = [];
    var currentDate = startDate;
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate = (0, add_1.add)({ date: currentDate, count: 1, type: "day" });
    }
    return dates;
};
exports.getDatesInRange = getDatesInRange;
