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
exports.MonthView = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var classnames_1 = __importDefault(require("classnames"));
var core_1 = require("../core");
var formatDayOfWeek_1 = require("../core/handlers/formatDayOfWeek");
var daysOfWeek = function () {
    var startDate = (0, core_1.getMonday)(new Date());
    var endDate = (0, core_1.getSunday)(new Date());
    var dates = (0, core_1.getDatesInRange)(startDate, endDate);
    return dates;
};
var week = daysOfWeek();
var MonthView = function (_a) {
    var locale = _a.locale, month = _a.month, currentMonth = _a.currentMonth, selectedDates = _a.selectedDates, onSelectDay = _a.onSelectDay, customizedDates = _a.customizedDates, onHoverDay = _a.onHoverDay, customMonthClassNames = _a.customMonthClassNames, minDate = _a.minDate, disabledDates = _a.disabledDates, weekendDates = _a.weekendDates;
    var mappedBannedDates = disabledDates === null || disabledDates === void 0 ? void 0 : disabledDates.map(function (item) {
        return (0, core_1.formatDate)(new Date(item));
    });
    var formattedSelectedDates = selectedDates.map(function (item) {
        return (0, core_1.formatDate)(new Date(item));
    });
    var monthDayCellClassName = (customMonthClassNames === null || customMonthClassNames === void 0 ? void 0 : customMonthClassNames.monthViewDay)
        ? customMonthClassNames.monthViewDay
        : "datePicker-body__day";
    var monthDayCellActiveClassName = (customMonthClassNames === null || customMonthClassNames === void 0 ? void 0 : customMonthClassNames.monthViewDayActive) !== undefined
        ? customMonthClassNames.monthViewDayActive
        : "datePicker__selectedDate";
    var monthDayCellDisabledClassName = (customMonthClassNames === null || customMonthClassNames === void 0 ? void 0 : customMonthClassNames.monthViewDisabledDate)
        ? customMonthClassNames.monthViewDisabledDate
        : "datePicker-body__day_disabled";
    var monthDayCellTextClassName = (customMonthClassNames === null || customMonthClassNames === void 0 ? void 0 : customMonthClassNames.monthViewDayDayText)
        ? customMonthClassNames.monthViewDayDayText
        : "datePicker-body__day-text";
    var defaultMonthDayCellBackgroundClassName = (customMonthClassNames === null || customMonthClassNames === void 0 ? void 0 : customMonthClassNames.monthViewDayDefaultBackgroundClassName)
        ? customMonthClassNames.monthViewDayDefaultBackgroundClassName
        : "datePicker-body__day_transparent";
    var monthViewMonthBodyClassName = (customMonthClassNames === null || customMonthClassNames === void 0 ? void 0 : customMonthClassNames.monthViewMonthBody) !== undefined
        ? customMonthClassNames.monthViewMonthBody
        : "datePicker-body";
    var monthViewWeekDaysClassName = (customMonthClassNames === null || customMonthClassNames === void 0 ? void 0 : customMonthClassNames.monthViewWeekDays)
        ? customMonthClassNames.monthViewWeekDays
        : "datePicker-weekdays";
    var monthViewWeekDaysListItemClassName = (customMonthClassNames === null || customMonthClassNames === void 0 ? void 0 : customMonthClassNames.monthViewWeekDaysListItem)
        ? customMonthClassNames.monthViewWeekDaysListItem
        : "datePicker-weekdays__day";
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: monthViewMonthBodyClassName }, { children: [(0, jsx_runtime_1.jsx)("ul", __assign({ className: monthViewWeekDaysClassName }, { children: week.map(function (item, idx) {
                    return ((0, jsx_runtime_1.jsx)("li", __assign({ className: monthViewWeekDaysListItemClassName }, { children: (0, formatDayOfWeek_1.formatDayOfWeek)(item, locale) }), idx));
                }) })), month.map(function (item) {
                var _a, _b;
                var _c, _d, _e;
                var isDateNotRelatedToCurrentMonth = item.getMonth() !== currentMonth;
                var customizedDate = customizedDates === null || customizedDates === void 0 ? void 0 : customizedDates.find(function (customizedDate) {
                    return (0, core_1.formatDate)(item) === (0, core_1.formatDate)(customizedDate.date);
                });
                var endDate = ((_c = minDate === null || minDate === void 0 ? void 0 : minDate.options) === null || _c === void 0 ? void 0 : _c.isPassedDateIncluded) === true
                    ? (0, core_1.add)({
                        date: (_d = minDate === null || minDate === void 0 ? void 0 : minDate.date) !== null && _d !== void 0 ? _d : new Date(),
                        type: "day",
                        count: 1,
                    })
                    : (_e = minDate === null || minDate === void 0 ? void 0 : minDate.date) !== null && _e !== void 0 ? _e : new Date();
                var isDisabled = minDate !== undefined ? (0, core_1.isFirstDateEarlierThanSecondOne)(item, endDate) : false;
                var isSelected = formattedSelectedDates.includes((0, core_1.formatDate)(item));
                var isCustomizedDateIsDisabled = customizedDate !== undefined ? customizedDate.isDisabled : false;
                var isDateDisabled = (mappedBannedDates !== undefined && mappedBannedDates.includes((0, core_1.formatDate)(item))) ||
                    isCustomizedDateIsDisabled;
                var isWeekendDay = weekendDates !== undefined && weekendDates.includes(item.getDay());
                var customizedDateClassName = customizedDate !== undefined ? customizedDate.className : "";
                return ((0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () {
                        return onSelectDay(item);
                    }, title: customizedDate !== undefined ? customizedDate.textOnHover : "", value: item.toString(), onMouseEnter: function (e) {
                        return onHoverDay(e);
                    }, className: (0, classnames_1.default)([monthDayCellClassName], customizedDateClassName, (_a = {},
                        _a[defaultMonthDayCellBackgroundClassName] = customizedDate === undefined,
                        _a), {
                        "datePicker__inactive-text": isDateNotRelatedToCurrentMonth,
                    }, (_b = {},
                        _b[monthDayCellActiveClassName] = isSelected && !isDateDisabled && !isWeekendDay,
                        _b[monthDayCellDisabledClassName] = isDisabled || isDateDisabled || isWeekendDay,
                        _b)), disabled: isDisabled || isDateDisabled || isWeekendDay }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ className: monthDayCellTextClassName }, { children: (0, core_1.getFormattedShortDayForMonthView)(item) })) }), item.toString()));
            })] })));
};
exports.MonthView = MonthView;
