import type { DatePickerInterval, DatePickerProps } from "../core";
import "./datePicker.css";
import {
	getMonthCalendarViewDates,
	getFormattedMonthToLocale,
	add,
	getMonthsOfYear,
	subtract,
	getDatesInRange,
	formatDate,
	getMonday,
	getSunday,
	getYears,
} from "../core";
import {
	JANUARY_ORDINAL_NUMBER,
	MONTHS_IDX_LIST,
	ONE_MONTH,
	ONE_YEAR,
	START_OF_NEW_MONTH_IDX,
	DECEMBER_ORDINAL_NUMBER,
	ONE_DECADE,
} from "../core";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { MonthView } from "./MonthView";
import YearView from "./YearView";
import DecadeView from "./DecadeView";

export const DatePicker = forwardRef<HTMLDivElement | null, DatePickerProps>(
	(
		{
			locale,
			mode = "single",
			minDate,
			disabledDates,
			onYearClick,
			weekendDates,
			onDateChange,
			customizedDates,
			customizationClassNames,
			selectedDates,
			date,
			selectedInterval,
			onMonthClick,
			view,
			changeCalendarView,
			customHeaderRenderProp,
			customDecadeViewRenderProp,
			customMonthCellRenderProp,
			customMonthViewRenderProp,
			customYearViewRenderProp,
			customYearCellRenderProp,
			customDayCellRenderProp,
		},
		ref
	) => {
		const defaultLocale = locale === undefined ? "en" : locale;
		const defineDefaultSelectedDates = () => {
			if (mode === "week" && date !== undefined) {
				const monday = getMonday(date);
				const sunday = getSunday(date);
				const formattedDates = getDatesInRange(monday, sunday).map((item) => {
					return formatDate(item);
				});
				return formattedDates;
			}
			if (selectedDates !== undefined) {
				return selectedDates;
			}
			if (date !== undefined) {
				return [date];
			}
			if (selectedInterval?.start && selectedInterval?.end) {
				return getDatesInRange(selectedInterval.start, selectedInterval.end);
			}
			if (selectedInterval?.start && selectedInterval?.end === null) {
				return [selectedInterval?.start];
			} else {
				return [];
			}
		};
		const defineDefaultDate = () => {
			if (date !== undefined) {
				return date;
			}
			if (selectedDates !== undefined && selectedDates[0] !== undefined) {
				return selectedDates[0];
			}
			return new Date();
		};
		const defaultDate = defineDefaultDate();
		const defaultSelectedDates = defineDefaultSelectedDates();
		const INITIAL_MONTH_DATES = getMonthCalendarViewDates({
			initialDate: defaultDate,
			year: defaultDate.getFullYear(),
			month: defaultDate.getMonth(),
		});

		const [month, setMonth] = useState<Array<Date>>(INITIAL_MONTH_DATES);
		const MIDDLE_DAY_OF_MONTH = 15;
		const [currentMonthIdx, setCurrentMonthIdx] = useState(month[MIDDLE_DAY_OF_MONTH].getMonth());
		const [currentDate, setCurrentDate] = useState(defaultDate);
		const [updatedSelectedDates, setUpdatedSelectedDates] =
			useState<Array<string | Date>>(defaultSelectedDates);
		const decadeYears = getYears(subtract({ date: currentDate, type: "year", count: ONE_DECADE }), 11);
		const [activeYear, setActiveYear] = useState<number>(defaultDate.getFullYear());
		const [datesInterval, setDatesInterval] = useState<DatePickerInterval>(
			selectedInterval ?? {
				start: null,
				end: null,
			}
		);

		const monthsOfYear = getMonthsOfYear(currentDate);

		const clickYear = (date: Date) => {
			setActiveYear(date.getFullYear());
			const updatedDate = new Date(date.getFullYear(), currentDate.getMonth(), currentDate.getDate());
			if (onYearClick !== undefined) {
				onYearClick(updatedDate);
			}
		};
		const changeYear = (action: "add" | "subtract", count: number) => {
			if (action === "add") {
				setCurrentDate((prev) => {
					return add({ date: prev, type: "year", count: count });
				});
			}
			if (action === "subtract") {
				setCurrentDate((prev) => {
					return subtract({ date: prev, type: "year", count: count });
				});
			}
		};
		const toNextUnitNavAction = () => {
			if (view === "month") {
				const nextMonth = currentMonthIdx + ONE_MONTH;
				const isCurrentMonthIsDecember = currentMonthIdx === DECEMBER_ORDINAL_NUMBER;
				if (MONTHS_IDX_LIST.includes(nextMonth)) {
					setCurrentMonthIdx(nextMonth);
				}
				if (isCurrentMonthIsDecember) {
					changeYear("add", ONE_YEAR);
					setCurrentMonthIdx(JANUARY_ORDINAL_NUMBER);
				}
			}

			if (view === "year") {
				changeYear("add", ONE_YEAR);
			}

			if (view === "decade") {
				changeYear("add", ONE_DECADE);
			}
		};

		const toPrevUnitNavAction = () => {
			if (view === "month") {
				const prevMonth = currentMonthIdx - ONE_MONTH;
				if (MONTHS_IDX_LIST.includes(prevMonth)) {
					setCurrentMonthIdx(prevMonth);
				}
				const isCurrentMonthIdxIsJanuary = currentMonthIdx === JANUARY_ORDINAL_NUMBER;
				if (isCurrentMonthIdxIsJanuary) {
					changeYear("subtract", ONE_YEAR);
					setCurrentMonthIdx(DECEMBER_ORDINAL_NUMBER);
				}
			}
			if (view === "year") {
				changeYear("subtract", ONE_YEAR);
			}

			if (view === "decade") {
				changeYear("subtract", ONE_DECADE);
			}
		};

		const selectDayForInterval = (date: Date) => {
			const isDateIncluded = updatedSelectedDates.includes(date);
			if (datesInterval.start && datesInterval.end && isDateIncluded) {
				setDatesInterval({ start: null, end: null });
				setUpdatedSelectedDates([]);
			}
			if (datesInterval.start && datesInterval.end && !isDateIncluded) {
				setDatesInterval({ start: date, end: null });
				setUpdatedSelectedDates([date]);
			}
			if (datesInterval.start === null) {
				setDatesInterval((prev) => {
					return { ...prev, start: date };
				});
				setUpdatedSelectedDates([date]);
				onDateChange({ value: [date] });
			}

			if (datesInterval.start !== null && datesInterval.end === null) {
				setDatesInterval((prev) => {
					return { ...prev, end: date };
				});

				const start = new Date(datesInterval.start) < date ? datesInterval.start : date;
				const end = new Date(date) > datesInterval.start ? date : datesInterval.start;
				const formattedDates = getDatesInRange(start, end).map((item) => {
					return formatDate(item);
				});
				setUpdatedSelectedDates(formattedDates);
				onDateChange({ value: [start, end] });
			}
		};
		const selectDayForWeek = (date: Date) => {
			const firstDate = getMonday(date);
			const lastDate = getSunday(date);
			setDatesInterval({
				start: firstDate,
				end: lastDate,
			});
			const formattedDates = getDatesInRange(firstDate, lastDate).map((item) => {
				return formatDate(item);
			});
			setUpdatedSelectedDates(formattedDates);
			onDateChange({
				value: [firstDate, lastDate],
			});
		};
		const selectSingleDate = (date: Date, formattedDate: string) => {
			setUpdatedSelectedDates([formattedDate]);
			onDateChange({ value: date });
		};
		const mappedSelectedDatesToFormattedValue = updatedSelectedDates.map((item) => {
			return formatDate(new Date(item));
		});
		const selectDayForPartial = (date: Date) => {
			if (mappedSelectedDatesToFormattedValue.includes(formatDate(date))) {
				const filteredDates = updatedSelectedDates.filter((item) => {
					return formatDate(new Date(date)) !== formatDate(new Date(item));
				});
				setUpdatedSelectedDates(filteredDates);
				if (selectedDates !== undefined) {
					onDateChange({
						value: selectedDates.filter((item) => {
							return item.toDateString() !== date.toDateString();
						}),
					});
				}

				return;
			}
			setUpdatedSelectedDates((prev) => {
				return [...prev, date];
			});
			const mappedSelectedDatesToRawDates = updatedSelectedDates.map((item) => {
				return new Date(item);
			});
			onDateChange({ value: [...mappedSelectedDatesToRawDates, new Date(date)] });
		};

		const selectDay = (date: Date) => {
			const formattedDate = formatDate(date);
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

		const clickMonth = (date: Date) => {
			if (onMonthClick) {
				onMonthClick(date);
			}
			const daysOfMonth = getMonthCalendarViewDates({ initialDate: date });
			const newMonthIdx = new Date(daysOfMonth[START_OF_NEW_MONTH_IDX]).getMonth();

			setMonth(daysOfMonth);
			setCurrentMonthIdx(newMonthIdx);
		};
		const headerText = useMemo(() => {
			const previousDecadeStart = subtract({ date: currentDate, count: ONE_DECADE, type: "year" });
			switch (view) {
				case "month":
					return `${getFormattedMonthToLocale({
						month: month[START_OF_NEW_MONTH_IDX],
						locale: defaultLocale,
					})} ${currentDate.getFullYear()}`;
				case "year":
					return `${currentDate.getFullYear()}`;
				case "decade": {
					return `${previousDecadeStart.getFullYear()} — ${currentDate.getFullYear()}`;
				}
				default:
					return "test";
			}
		}, [currentDate, view, month, defaultLocale]);

		const datePickerWrapperCn = customizationClassNames?.common?.wrapper
			? customizationClassNames.common.wrapper
			: "datePicker-wrapper";
		const datePickerHeaderCn = customizationClassNames?.common?.header
			? customizationClassNames.common.header
			: "datePicker-header";
		const datePickerArrowLeftCn = customizationClassNames?.common?.arrowLeft
			? customizationClassNames.common.arrowLeft
			: "datePicker__controller datePicker__controller_type_prev";
		const datePickerArrowNextCn = customizationClassNames?.common?.arrowLeft
			? customizationClassNames.common.arrowLeft
			: "datePicker__controller datePicker__controller_type_next";

		useEffect(() => {
			const month = getMonthCalendarViewDates({
				initialDate: currentDate,
				month: currentMonthIdx,
			});
			setMonth(month);
		}, [currentMonthIdx, currentDate]);

		return (
			<div className={datePickerWrapperCn} ref={ref}>
				{customHeaderRenderProp !== undefined ? (
					customHeaderRenderProp({ changeCalendarView, toNextUnitNavAction, toPrevUnitNavAction, headerText })
				) : (
					<div className={datePickerHeaderCn}>
						<button className={"datePicker-header__toggler"} onClick={changeCalendarView}>
							<time className={"datepicker-header__time"}>{headerText}</time>
						</button>
						<div className={"datePicker__controls"}>
							<button className={datePickerArrowLeftCn} type="button" onClick={toPrevUnitNavAction} />
							<button className={datePickerArrowNextCn} type="button" onClick={toNextUnitNavAction} />
						</div>
					</div>
				)}
				{customMonthViewRenderProp !== undefined &&
					customMonthViewRenderProp({
						locale: defaultLocale,
						month: month,
						customizedDates: customizedDates,
						currentMonth: currentMonthIdx,
						disabledDates: disabledDates,
						minDate: minDate,
						customMonthClassNames: customizationClassNames?.month,
						selectedDates: updatedSelectedDates,
						onSelectDay: selectDay,
					})}
				{view === "month" && customMonthViewRenderProp === undefined && (
					<MonthView
						locale={defaultLocale}
						month={month}
						customDayCellRenderProp={customDayCellRenderProp}
						customizedDates={customizedDates}
						currentMonth={currentMonthIdx}
						disabledDates={disabledDates}
						weekendDates={weekendDates}
						minDate={minDate}
						customMonthClassNames={customizationClassNames?.month}
						selectedDates={updatedSelectedDates}
						onSelectDay={selectDay}
					/>
				)}
				{customYearViewRenderProp !== undefined &&
					customYearViewRenderProp({
						months: monthsOfYear,
						currentMonthIdx: currentMonthIdx,
						minDate: minDate,
						onMonthClick: clickMonth,
						defaultLocale: defaultLocale,
					})}
				{view === "year" && customYearViewRenderProp === undefined && (
					<YearView
						months={monthsOfYear}
						currentMonthIdx={currentMonthIdx}
						customYearClassNames={customizationClassNames?.year}
						minDate={minDate}
						customMonthCellRenderProp={customMonthCellRenderProp}
						onMonthClick={clickMonth}
						defaultLocale={defaultLocale}
					/>
				)}
				{customDecadeViewRenderProp !== undefined &&
					customDecadeViewRenderProp({
						minDate: minDate,
						onYearClick: clickYear,
						years: decadeYears,
						activeYear: activeYear,
					})}
				{view === "decade" && customDecadeViewRenderProp === undefined && (
					<DecadeView
						activeYear={activeYear}
						minDate={minDate}
						onYearClick={clickYear}
						years={decadeYears}
						customYearCellRenderProp={customYearCellRenderProp}
						customDecadeClassNames={customizationClassNames?.decade}
					/>
				)}
			</div>
		);
	}
);
