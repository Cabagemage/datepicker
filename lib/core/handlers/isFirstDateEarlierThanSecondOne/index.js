"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFirstDateEarlierThanSecondOne = void 0;
var isFirstDateEarlierThanSecondOne = function (start, end) {
    var endTime = new Date(end);
    var startTime = new Date(start);
    return (startTime.getTime() <= endTime.getTime() &&
        endTime.toLocaleDateString() !== startTime.toLocaleDateString());
};
exports.isFirstDateEarlierThanSecondOne = isFirstDateEarlierThanSecondOne;
