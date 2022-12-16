"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstDateOfMonth = void 0;
var getFirstDateOfMonth = function (date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
};
exports.getFirstDateOfMonth = getFirstDateOfMonth;
