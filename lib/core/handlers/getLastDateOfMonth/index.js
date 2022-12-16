"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastDateOfMonth = void 0;
var getLastDateOfMonth = function (date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};
exports.getLastDateOfMonth = getLastDateOfMonth;
