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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
require("./datePicker.css");
var core_1 = require("../core");
var core_2 = require("../core");
var react_1 = require("react");
var MonthView_1 = require("./MonthView");
var YearView_1 = __importDefault(require("./YearView"));
var DecadeView_1 = __importDefault(require("./DecadeView"));
var DatePicker = function (_a) {
    var _b, _c, _d, _e;
    var locale = _a.locale, _f = _a.mode, mode = _f === void 0 ? "single" : _f, minDate = _a.minDate, disabledDates = _a.disabledDates, onYearClick = _a.onYearClick, weekendDates = _a.weekendDates, onDateClick = _a.onDateClick, customizedDates = _a.customizedDates, customizationClassNames = _a.customizationClassNames, defaultSelectedDates = _a.defaultSelectedDates, date = _a.date, defaultSelectedInterval = _a.defaultSelectedInterval, onMonthClick = _a.onMonthClick, view = _a.view, changeCalendarView = _a.changeCalendarView, customHeaderRenderProp = _a.customHeaderRenderProp;
    var defaultLocale = locale === undefined ? "ru-RU" : locale;
    var INITIAL_MONTH_DATES = (0, core_1.getMonthCalendarViewDates)({
        initialDate: date,
        year: date.getFullYear(),
        month: date.getMonth(),
    });
    var _g = (0, react_1.useState)(date.getMonth()), currentMonthIdx = _g[0], setCurrentMonthIdx = _g[1];
    var _h = (0, react_1.useState)(INITIAL_MONTH_DATES), month = _h[0], setMonth = _h[1];
    var _j = (0, react_1.useState)(date), currentDate = _j[0], setCurrentDate = _j[1];
    var _k = (0, react_1.useState)(defaultSelectedDates !== null && defaultSelectedDates !== void 0 ? defaultSelectedDates : [date]), selectedDates = _k[0], setSelectedDates = _k[1];
    var decadeYears = (0, core_1.getYears)((0, core_1.subtract)({ date: currentDate, type: "year", count: core_2.ONE_DECADE }), 11);
    var _l = (0, react_1.useState)(defaultSelectedInterval !== null && defaultSelectedInterval !== void 0 ? defaultSelectedInterval : {
        start: null,
        end: null,
    }), datesInterval = _l[0], setDatesInterval = _l[1];
    var monthsOfYear = (0, core_1.getMonthsOfYear)(currentDate);
    var clickYear = function (date) {
        var updatedDate = new Date(date.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        setCurrentDate(updatedDate);
        if (onYearClick !== undefined) {
            onYearClick(updatedDate);
        }
    };
    var changeYear = function (action, count) {
        if (action === "add") {
            setCurrentDate(function (prev) {
                return (0, core_1.add)({ date: prev, type: "year", count: count });
            });
        }
        if (action === "subtract") {
            setCurrentDate(function (prev) {
                return (0, core_1.subtract)({ date: prev, type: "year", count: count });
            });
        }
    };
    var toNextUnitNavAction = function () {
        if (view === "month") {
            var nextMonth = currentMonthIdx + core_2.ONE_MONTH;
            var isCurrentMonthIsDecember = currentMonthIdx === core_2.DECEMBER_ORDINAL_NUMBER;
            if (core_2.MONTHS_IDX_LIST.includes(nextMonth)) {
                setCurrentMonthIdx(nextMonth);
            }
            if (isCurrentMonthIsDecember) {
                changeYear("add", core_2.ONE_YEAR);
                setCurrentMonthIdx(core_2.JANUARY_ORDINAL_NUMBER);
            }
        }
        if (view === "year") {
            changeYear("add", core_2.ONE_YEAR);
        }
        if (view === "decade") {
            changeYear("add", core_2.ONE_DECADE);
        }
    };
    var toPrevUnitNavAction = function () {
        if (view === "month") {
            var prevMonth = currentMonthIdx - core_2.ONE_MONTH;
            if (core_2.MONTHS_IDX_LIST.includes(prevMonth)) {
                setCurrentMonthIdx(prevMonth);
            }
            var isCurrentMonthIdxIsJanuary = currentMonthIdx === core_2.JANUARY_ORDINAL_NUMBER;
            if (isCurrentMonthIdxIsJanuary) {
                changeYear("subtract", core_2.ONE_YEAR);
                setCurrentMonthIdx(core_2.DECEMBER_ORDINAL_NUMBER);
            }
        }
        if (view === "year") {
            changeYear("subtract", core_2.ONE_YEAR);
        }
        if (view === "decade") {
            changeYear("subtract", core_2.ONE_DECADE);
        }
    };
    var selectDayForInterval = function (date) {
        var isDateIncluded = selectedDates.includes(date);
        if (datesInterval.start && datesInterval.end && isDateIncluded) {
            setDatesInterval({ start: null, end: null });
            setSelectedDates([]);
        }
        if (datesInterval.start && datesInterval.end && !isDateIncluded) {
            setDatesInterval({ start: date, end: null });
            setSelectedDates([date]);
        }
        if (datesInterval.start === null) {
            setDatesInterval(function (prev) {
                return __assign(__assign({}, prev), { start: date });
            });
            setSelectedDates([date]);
            onDateClick({ value: [date] });
        }
        if (datesInterval.start !== null && datesInterval.end === null) {
            setDatesInterval(function (prev) {
                return __assign(__assign({}, prev), { end: date });
            });
            var start = new Date(datesInterval.start) < date ? datesInterval.start : date;
            var end = new Date(date) > datesInterval.start ? date : datesInterval.start;
            onDateClick({ value: [start, end] });
        }
    };
    var selectDayForWeek = function (date) {
        var firstDate = (0, core_1.getMonday)(date);
        var lastDate = (0, core_1.getSunday)(date);
        setDatesInterval({
            start: firstDate,
            end: lastDate,
        });
        var formattedDates = (0, core_1.getDatesInRange)(firstDate, lastDate).map(function (item) {
            return (0, core_1.formatDate)(item);
        });
        setSelectedDates(formattedDates);
        onDateClick({
            value: [firstDate, lastDate],
        });
    };
    var selectSingleDate = function (date, formattedDate) {
        setSelectedDates([formattedDate]);
        onDateClick({ value: date });
    };
    var mappedSelectedDatesToFormattedValue = selectedDates.map(function (item) {
        return (0, core_1.formatDate)(new Date(item));
    });
    var selectDayForPartial = function (date) {
        if (mappedSelectedDatesToFormattedValue.includes((0, core_1.formatDate)(date))) {
            var filteredDates = selectedDates.filter(function (item) {
                return (0, core_1.formatDate)(new Date(date)) !== (0, core_1.formatDate)(new Date(item));
            });
            setSelectedDates(filteredDates);
            return;
        }
        setSelectedDates(function (prev) {
            return __spreadArray(__spreadArray([], prev, true), [date], false);
        });
        var mappedSelectedDatesToRawDates = selectedDates.map(function (item) {
            return new Date(item);
        });
        onDateClick({ value: __spreadArray(__spreadArray([], mappedSelectedDatesToRawDates, true), [new Date(date)], false) });
    };
    var selectDay = function (date) {
        var formattedDate = (0, core_1.formatDate)(date);
        if (mode === "single") {
            selectSingleDate(date, formattedDate);
        }
        if (mode === "partial") {
            selectDayForPartial(date);
        }
        if (mode === "interval") {
            selectDayForInterval(date);
        }
        if (mode === "week") {
            selectDayForWeek(date);
        }
    };
    (0, react_1.useEffect)(function () {
        var month = (0, core_1.getMonthCalendarViewDates)({
            initialDate: currentDate,
            month: currentMonthIdx,
        });
        setMonth(month);
    }, [currentMonthIdx, currentDate]);
    var hoverEvent = function (e) {
        if (datesInterval.start !== null && datesInterval.end !== null) {
            return;
        }
        var lastTriggeredDate = new Date(e.currentTarget.value);
        if (mode === "interval" && datesInterval.start !== null) {
            var start = new Date(datesInterval.start) < lastTriggeredDate ? datesInterval.start : lastTriggeredDate;
            var end = new Date(lastTriggeredDate) > datesInterval.start ? lastTriggeredDate : datesInterval.start;
            var formattedDates = (0, core_1.getDatesInRange)(start, end).map(function (item) {
                return (0, core_1.formatDate)(item);
            });
            setSelectedDates(formattedDates);
        }
    };
    var clickMonth = function (date) {
        if (onMonthClick) {
            onMonthClick(date);
        }
        var daysOfMonth = (0, core_1.getMonthCalendarViewDates)({ initialDate: date });
        var newMonthIdx = new Date(daysOfMonth[core_2.START_OF_NEW_MONTH_IDX]).getMonth();
        setMonth(daysOfMonth);
        setCurrentMonthIdx(newMonthIdx);
    };
    var headerViewTogglerText = (0, react_1.useMemo)(function () {
        var previousDecadeStart = (0, core_1.subtract)({ date: currentDate, count: core_2.ONE_DECADE, type: "year" });
        switch (view) {
            case "month":
                return "".concat((0, core_1.getFormattedMonthToLocale)({
                    month: month[core_2.START_OF_NEW_MONTH_IDX],
                    locale: defaultLocale,
                }), " ").concat(currentDate.getFullYear());
            case "year":
                return "".concat(currentDate.getFullYear());
            case "decade": {
                return "".concat(previousDecadeStart.getFullYear(), " \u2014 ").concat(currentDate.getFullYear());
            }
            default:
                return "test";
        }
    }, [currentDate, view, month, defaultLocale]);
    var datePickerWrapperCn = ((_b = customizationClassNames === null || customizationClassNames === void 0 ? void 0 : customizationClassNames.common) === null || _b === void 0 ? void 0 : _b.wrapper)
        ? customizationClassNames.common.wrapper
        : "datePicker-wrapper";
    var datePickerHeaderCn = ((_c = customizationClassNames === null || customizationClassNames === void 0 ? void 0 : customizationClassNames.common) === null || _c === void 0 ? void 0 : _c.header)
        ? customizationClassNames.common.header
        : "datePicker-header";
    var datePickerArrowLeftCn = ((_d = customizationClassNames === null || customizationClassNames === void 0 ? void 0 : customizationClassNames.common) === null || _d === void 0 ? void 0 : _d.arrowLeft)
        ? customizationClassNames.common.arrowLeft
        : "datePicker__controller datePicker__controller_type_prev";
    var datePickerArrowNextCn = ((_e = customizationClassNames === null || customizationClassNames === void 0 ? void 0 : customizationClassNames.common) === null || _e === void 0 ? void 0 : _e.arrowLeft)
        ? customizationClassNames.common.arrowLeft
        : "datePicker__controller datePicker__controller_type_next";
    (0, react_1.useEffect)(function () {
        if (typeof window !== "undefined") {
        }
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: datePickerWrapperCn }, { children: [customHeaderRenderProp !== undefined ? (customHeaderRenderProp({ changeCalendarView: changeCalendarView, toNextUnitNavAction: toNextUnitNavAction, toPrevUnitNavAction: toPrevUnitNavAction })) : ((0, jsx_runtime_1.jsxs)("div", __assign({ className: datePickerHeaderCn }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ className: "datePicker-header__toggler", onClick: changeCalendarView }, { children: (0, jsx_runtime_1.jsx)("time", __assign({ className: "datepicker-header__time" }, { children: headerViewTogglerText })) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "datePicker__controls" }, { children: [(0, jsx_runtime_1.jsx)("button", { className: datePickerArrowLeftCn, type: "button", onClick: toPrevUnitNavAction }), (0, jsx_runtime_1.jsx)("button", { className: datePickerArrowNextCn, type: "button", onClick: toNextUnitNavAction })] }))] }))), view === "month" && ((0, jsx_runtime_1.jsx)(MonthView_1.MonthView, { locale: defaultLocale, month: month, customizedDates: customizedDates, currentMonth: currentMonthIdx, disabledDates: disabledDates, weekendDates: weekendDates, minDate: minDate, customMonthClassNames: customizationClassNames === null || customizationClassNames === void 0 ? void 0 : customizationClassNames.month, selectedDates: selectedDates, onSelectDay: selectDay, onHoverDay: hoverEvent })), view === "year" && ((0, jsx_runtime_1.jsx)(YearView_1.default, { months: monthsOfYear, selectedDates: selectedDates, minDate: minDate, onMonthClick: clickMonth, defaultLocale: defaultLocale })), view === "decade" && (0, jsx_runtime_1.jsx)(DecadeView_1.default, { minDate: minDate, onYearClick: clickYear, years: decadeYears })] })));
};
exports.DatePicker = DatePicker;
