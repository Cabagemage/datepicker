"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
var add = function (_a) {
    var date = _a.date, count = _a.count, type = _a.type;
    var resultDate = new Date(date);
    switch (type) {
        case "day": {
            var msDayCount = 1000 * count;
            var valueInMS = 24 * 60 * 60 * msDayCount;
            resultDate.setTime(resultDate.getTime() + valueInMS);
            return resultDate;
        }
        case "month": {
            return new Date(resultDate.setMonth(resultDate.getMonth() + count));
        }
        case "year": {
            return new Date(resultDate.setFullYear(resultDate.getFullYear() + count));
        }
        case "week": {
            return new Date(resultDate.setDate(resultDate.getDate() + 7 * count));
        }
        default:
            return new Date();
    }
};
exports.add = add;
