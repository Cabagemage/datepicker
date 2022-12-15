"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSunday = void 0;
// function to get sunday of passed date;
var getSunday = function (date) {
    var isSunday = date.getDay() === 0;
    if (isSunday) {
        return date;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
};
exports.getSunday = getSunday;
