"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonday = void 0;
// function to get monday of passed date week.
var getMonday = function (date) {
    var sunday = date.getDay() === 0;
    // we can't subtract 0 to get current sunday, thats why we'll pass date - 6 days in this block of code
    if (sunday) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
};
exports.getMonday = getMonday;
