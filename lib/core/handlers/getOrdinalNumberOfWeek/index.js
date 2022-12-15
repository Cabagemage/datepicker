"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdinalNumberOfWeek = void 0;
var getOrdinalNumberOfWeek = function (date) {
    var millisecondsInDay = 86400000;
    var yearStart = +new Date(date.getFullYear(), 0, 1);
    var today = +new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var dayOfYear = (today - yearStart + millisecondsInDay) / millisecondsInDay;
    return Math.ceil(dayOfYear / 7);
};
exports.getOrdinalNumberOfWeek = getOrdinalNumberOfWeek;
