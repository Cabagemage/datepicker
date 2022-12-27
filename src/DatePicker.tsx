import type { DatePickerProps } from "./core/types";
import "./datePicker.css";
import {
	getMonthCalendarViewDates,
	getFormattedMonthToLocale,
	add,
	getMonthsOfYear,
	subtract,
	getYears,
	getMonday,
	getSunday,
	getDatesInRange,
	formatDate,
} from "./core/handlers";
import {
	JANUARY_ORDINAL_NUMBER,
	MONTHS_IDX_LIST,
	ONE_MONTH,
	ONE_YEAR,
	START_OF_NEW_MONTH_IDX,
	DECEMBER_ORDINAL_NUMBER,
	ONE_DECADE,
	MIDDLE_DAY_OF_MONTH,
} from "./core/constants";
import { forwardRef, useMemo, useState } from "react";
import { MonthView } from "./components/MonthView";
import YearView from "./components/YearView";
import DecadeView from "./components/DecadeView";
import { initDatePickerBaseClassNames } from "./core/utils/initDatePickerBaseClassNames";

export const DatePicker = forwardRef<HTMLDivElement | null, DatePickerProps>(
	(
		{
			locale = "en",
			mode = "single",
			minDate,
			disabledDates,
			weekendDays,
			onDateChange,
			customizedDates,
			customizationClassNames,
			value,
			view,
			changeCalendarView,
			maxDate,
			customHeaderRenderProp,
			customDecadeViewRenderProp,
			onYearClick,
			onMonthClick,
			customMonthCellRenderProp,
			customMonthViewRenderProp,
			customYearViewRenderProp,
			customYearCellRenderProp,
			customDayCellRenderProp,
			footerElement,
			isVisible = true,
		},
		ref
	) => {
		const defineDefaultDate = () => {
			if (value instanceof Date) {
				return value;
			}
			if (Array.isArray(value)) {
				if (value[0] !== undefined) {
					return value[0];
				}
				return new Date();
			} else {
				if (value.start !== null) {
					return value.start;
				}
			}
			return new Date();
		};
		const defaultDate = defineDefaultDate();

		const defineDefaultSelectedDates = () => {
			if (mode === "week" && value instanceof Date) {
				const monday = getMonday(value);
				const sunday = getSunday(value);
				const formattedDates = getDatesInRange(monday, sunday).map((item) => {
					return formatDate(item);
				});
				return formattedDates;
			}

			if (value instanceof Date) {
				return [value];
			}

			if (Array.isArray(value)) {
				const isFirstDateDefined = value[0] !== undefined ? value[0] : false;
				const isSecondDateDefined = value[1] !== undefined ? value[1] : false;
				if (isFirstDateDefined) {
					return [value[0]];
				}
				if (isFirstDateDefined && isSecondDateDefined) {
					const firstDate = value[0];
					const secondDate = value[1];
					const start = new Date(firstDate) < secondDate ? firstDate : secondDate;
					const end = new Date(secondDate) > firstDate ? secondDate : firstDate;
					return getDatesInRange(start, end);
				}
			} else {
				if (value.start !== null && value.end !== null) {
					return getDatesInRange(value.start, value.end);
				}
			}
			return [];
		};

		const defaultSelectedDates = defineDefaultSelectedDates();
		const [selectedDates, setSelectedDates] = useState<Array<string | Date>>(defaultSelectedDates);
		const INITIAL_MONTH_DATES = getMonthCalendarViewDates({
			initialDate: defaultDate,
			year: defaultDate.getFullYear(),
			month: defaultDate.getMonth(),
		});

		const selectDayForInterval = (date: Date) => {
			if (value instanceof Date || Array.isArray(value)) {
				return;
			}
			const isDateIncluded = selectedDates.includes(formatDate(date));
			if (value.start && value.end && isDateIncluded) {
				onDateChange({ value: { start: null, end: null } });
				setSelectedDates([]);
			}
			if (value.start && value.end && date > value.end) {
				onDateChange({ value: { start: value.start, end: date } });
				const formattedDates = getDatesInRange(value.start, date).map((item) => {
					return formatDate(item);
				});
				setSelectedDates(formattedDates);
			}
			if (value.start && value.end && date < value.start) {
				onDateChange({ value: { start: date, end: value.end } });
				const formattedDates = getDatesInRange(date, value.end).map((item) => {
					return formatDate(item);
				});
				setSelectedDates(formattedDates);
			}
			if (value.start === null) {
				onDateChange({ value: { start: date, end: value.end } });
				setSelectedDates([formatDate(date)]);
			}

			if (value.start !== null && value.end === null) {
				const start = new Date(value.start) < date ? value.start : date;
				const end = new Date(date) > value.start ? date : value.start;
				const formattedDates = getDatesInRange(start, end).map((item) => {
					return formatDate(item);
				});
				setSelectedDates(formattedDates);
				onDateChange({ value: { start: start, end: end } });
			}
		};
		const selectDayForWeek = (date: Date) => {
			const firstDate = getMonday(date);
			const lastDate = getSunday(date);
			onDateChange({ value: { start: firstDate, end: lastDate } });
			const formattedDates = getDatesInRange(firstDate, lastDate).map((item) => {
				return formatDate(item);
			});
			setSelectedDates(formattedDates);
		};
		const selectSingleDate = (date: Date, formattedDate: string) => {
			setSelectedDates([formattedDate]);
			onDateChange({ value: date });
		};
		const mappedSelectedDatesToFormattedValue = selectedDates.map((item) => {
			return formatDate(new Date(item));
		});
		const selectDayForPartial = (date: Date) => {
			if (mappedSelectedDatesToFormattedValue.includes(formatDate(date))) {
				const filteredDates = selectedDates.filter((item) => {
					return formatDate(new Date(date)) !== formatDate(new Date(item));
				});
				setSelectedDates(filteredDates);
				if (selectedDates.length > 0) {
					onDateChange({
						value: selectedDates
							.filter((item) => {
								return formatDate(new Date(item)) !== formatDate(date);
							})
							.map((date) => {
								return new Date(date);
							}),
					});
				}

				return;
			}
			setSelectedDates((prev) => {
				return [...prev, formatDate(date)];
			});
			const mappedSelectedDatesToRawDates = selectedDates.map((item) => {
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

		const [month, setMonth] = useState<Array<Date>>(INITIAL_MONTH_DATES);
		const [currentMonthIdx, setCurrentMonthIdx] = useState(month[MIDDLE_DAY_OF_MONTH].getMonth());
		const [activeYear, setActiveYear] = useState<number>(defaultDate.getFullYear());
		const defaultDecadesYears = getYears(
			subtract({ date: new Date(), type: "year", count: ONE_DECADE }),
			ONE_DECADE
		);
		const [decadeYears, setDecadesYears] = useState(defaultDecadesYears);
		const [monthsOfYear, setMonthsOfYear] = useState(getMonthsOfYear(defaultDate));

		const clickYear = (date: Date) => {
			if (onYearClick !== undefined) {
				onYearClick(date);
			}
			const updatedMonths = getMonthsOfYear(new Date(date.getFullYear(), currentMonthIdx, defaultDate.getDate()));
			setMonthsOfYear(updatedMonths);
			setActiveYear(date.getFullYear());
		};

		const changeYear = (action: "add" | "subtract", count: number) => {
			const changedYear = action === "add" ? activeYear + count : activeYear - count;
			const updatedMonths = getMonthsOfYear(new Date(changedYear, currentMonthIdx, defaultDate.getDate()));
			setMonthsOfYear(updatedMonths);
			setActiveYear(changedYear);
		};

		const toNextUnitNavAction = () => {
			if (view === "month") {
				const nextMonth = currentMonthIdx + ONE_MONTH;
				const isCurrentMonthIsDecember = currentMonthIdx === DECEMBER_ORDINAL_NUMBER;

				if (MONTHS_IDX_LIST.includes(nextMonth)) {
					setCurrentMonthIdx(nextMonth);
				}

				if (isCurrentMonthIsDecember) {
					changeYear("add", ONE_YEAR)
					setCurrentMonthIdx(JANUARY_ORDINAL_NUMBER);
				}
				const month = getMonthCalendarViewDates({
					initialDate: defaultDate,
					year: isCurrentMonthIsDecember ? activeYear + 1 : activeYear,
					month: isCurrentMonthIsDecember ? JANUARY_ORDINAL_NUMBER : nextMonth,
				});
				setMonth(month);
			}

			if (view === "year") {
				changeYear("add", ONE_YEAR);
			}

			if (view === "decade") {
				setActiveYear((prev) => {
					return prev + ONE_DECADE;
				});
				const updatedDecadeYears = getYears(
					add({
						date: new Date(decadeYears[0].getFullYear(), currentMonthIdx, defaultDate.getDate()),
						type: "year",
						count: ONE_DECADE,
					}),
					ONE_DECADE
				);
				setDecadesYears(updatedDecadeYears);
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
					changeYear("subtract", ONE_YEAR)
					setCurrentMonthIdx(DECEMBER_ORDINAL_NUMBER);
				}
				const month = getMonthCalendarViewDates({
					initialDate: defaultDate,
					year: isCurrentMonthIdxIsJanuary ? activeYear - 1 : activeYear,
					month: isCurrentMonthIdxIsJanuary ? DECEMBER_ORDINAL_NUMBER : prevMonth,
				});
				setMonth(month);
			}
			if (view === "year") {
				changeYear("subtract", ONE_YEAR);
			}

			if (view === "decade") {
				setActiveYear((prev) => {
					return prev - ONE_DECADE;
				});
				const updatedDecadeYears = getYears(
					subtract({
						date: new Date(decadeYears[0].getFullYear(), currentMonthIdx, defaultDate.getDate()),
						type: "year",
						count: ONE_DECADE,
					}),
					ONE_DECADE
				);
				setDecadesYears(updatedDecadeYears);
			}
		};

		const clickMonth = (date: Date) => {
			if (onMonthClick !== undefined) {
				onMonthClick(date);
			}
			const daysOfMonth = getMonthCalendarViewDates({ initialDate: date, year: activeYear });
			const newMonthIdx = new Date(daysOfMonth[START_OF_NEW_MONTH_IDX]).getMonth();
			setMonth(daysOfMonth);
			setCurrentMonthIdx(newMonthIdx);
		};

		const headerText = useMemo(() => {
			switch (view) {
				case "month":
					return `${getFormattedMonthToLocale({
						month: month[MIDDLE_DAY_OF_MONTH],
						locale: locale,
					})} ${activeYear}`;
				case "year":
					return `${activeYear}`;
				case "decade": {
					return `${decadeYears[0].getFullYear()} — ${decadeYears[decadeYears.length - 1].getFullYear()}`;
				}
				default:
					return "not available";
			}
		}, [view, month, locale, decadeYears, activeYear]);

		const {
			datePickerHeadertextCn,
			datePickerWrapperCn,
			datePickerHeaderCn,
			datePickerHeaderControlsCn,
			datePickerArrowNextCn,
			datePickerArrowLeftCn,
		} = initDatePickerBaseClassNames(customizationClassNames?.common);

		if (isVisible) {
			return (
				<div className={datePickerWrapperCn} ref={ref}>
					{customHeaderRenderProp !== undefined ? (
						customHeaderRenderProp({
							changeCalendarView,
							toNextUnitNavAction,
							toPrevUnitNavAction,
							headerText,
						})
					) : (
						<div className={datePickerHeaderCn}>
							<button className={"datePicker-header__toggler"} onClick={changeCalendarView} type="button">
								<time className={datePickerHeadertextCn}>{headerText}</time>
							</button>
							<div className={datePickerHeaderControlsCn}>
								<button className={datePickerArrowLeftCn} type="button" onClick={toPrevUnitNavAction} />
								<button className={datePickerArrowNextCn} type="button" onClick={toNextUnitNavAction} />
							</div>
						</div>
					)}
					{customMonthViewRenderProp !== undefined &&
						customMonthViewRenderProp({
							locale,
							month,
							customizedDates,
							currentMonth: currentMonthIdx,
							disabledDates,
							selectedDates,
							onDateChange: selectDay,
							minDate,
							maxDate,
							customMonthClassNames: customizationClassNames?.month,
						})}
					{view === "month" && customMonthViewRenderProp === undefined && (
						<MonthView
							locale={locale}
							selectedDates={selectedDates}
							month={month}
							customDayCellRenderProp={customDayCellRenderProp}
							customizedDates={customizedDates}
							currentMonth={currentMonthIdx}
							disabledDates={disabledDates}
							weekendDays={weekendDays}
							onDateChange={selectDay}
							minDate={minDate}
							maxDate={maxDate}
							customMonthClassNames={customizationClassNames?.month}
						/>
					)}
					{customYearViewRenderProp !== undefined &&
						customYearViewRenderProp({
							months: monthsOfYear,
							currentMonthIdx: currentMonthIdx,
							minDate,
							defaultLocale: locale,
							onMonthClick: clickMonth,
						})}
					{view === "year" && customYearViewRenderProp === undefined && (
						<YearView
							months={monthsOfYear}
							currentMonthIdx={currentMonthIdx}
							customYearClassNames={customizationClassNames?.year}
							minDate={minDate}
							maxDate={maxDate}
							customMonthCellRenderProp={customMonthCellRenderProp}
							onMonthClick={clickMonth}
							defaultLocale={locale}
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
							maxDate={maxDate}
							onYearClick={clickYear}
							years={decadeYears}
							customYearCellRenderProp={customYearCellRenderProp}
							customDecadeClassNames={customizationClassNames?.decade}
						/>
					)}
					{footerElement && footerElement}
				</div>
			);
		} else {
			return null;
		}
	}
);
