"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYears = void 0;
var add_1 = require("../add");
var getYears = function (startDate, count) {
    var years = [];
    for (var i = 0; years.length <= count; ++i) {
        var year = (0, add_1.add)({ date: startDate, count: i, type: "year" });
        years.push(new Date(year.getFullYear(), 0, 1));
    }
    return years;
};
exports.getYears = getYears;
