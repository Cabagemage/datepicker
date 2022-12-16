"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("../core");
var classnames_1 = __importDefault(require("classnames"));
var YearView = function (_a) {
    var months = _a.months, onMonthClick = _a.onMonthClick, defaultLocale = _a.defaultLocale, minDate = _a.minDate, selectedDates = _a.selectedDates;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "datePicker-body" }, { children: months.map(function (item) {
            var _a;
            var lastDateInMonth = new Date(item.getFullYear(), item.getMonth() + 1, 0);
            // we don't want to disable month for chose month have not passed
            var isLastDateInMonthEqualToPassedMinDate = (minDate === null || minDate === void 0 ? void 0 : minDate.date.toDateString()) === lastDateInMonth.toDateString();
            var disabledMonth = isLastDateInMonthEqualToPassedMinDate
                ? minDate.date
                : (0, core_1.subtract)({ date: new Date((_a = minDate === null || minDate === void 0 ? void 0 : minDate.date) !== null && _a !== void 0 ? _a : new Date()), type: "month", count: 1 });
            var isDisabled = minDate !== undefined ? (0, core_1.isFirstDateEarlierThanSecondOne)(item, disabledMonth) : false;
            var isSelected = selectedDates.includes((0, core_1.formatDate)(item));
            return ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () {
                    return onMonthClick(item);
                }, type: "button", disabled: isDisabled, className: (0, classnames_1.default)("datePicker-body__month-cell", {
                    selected: isSelected && !isDisabled,
                    "datePicker-body__day_disabled": isDisabled,
                }) }, { children: (0, core_1.getFormattedMonthToLocale)({
                    month: item,
                    locale: defaultLocale,
                    format: "long",
                }) }), item.toString()));
        }) })));
};
exports.default = YearView;
