import type { DatePickerProps } from "./core/types";
import "./datePicker.css";
import {
	getMonthCalendarViewDates,
	getFormattedMonthToLocale,
	add,
	getMonthsOfYear,
	subtract,
	getYears,
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
import { forwardRef, useEffect, useMemo, useState } from "react";
import { MonthView } from "./MonthView";
import YearView from "./YearView";
import DecadeView from "./DecadeView";

export const DatePicker = forwardRef<HTMLDivElement | null, DatePickerProps>(
	(
		{
			locale = "en",
			mode = "single",
			minDate,
			disabledDates,
			onYearClick,
			weekendDays,
			onDateChange,
			customizedDates,
			customizationClassNames,
			onMonthClick,
			value,
			view,
			changeCalendarView,
			customHeaderRenderProp,
			customDecadeViewRenderProp,
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
		const INITIAL_MONTH_DATES = getMonthCalendarViewDates({
			initialDate: defaultDate,
			year: defaultDate.getFullYear(),
			month: defaultDate.getMonth(),
		});

		const [month, setMonth] = useState<Array<Date>>(INITIAL_MONTH_DATES);
		const [currentMonthIdx, setCurrentMonthIdx] = useState(month[MIDDLE_DAY_OF_MONTH].getMonth());
		const [currentDate, setCurrentDate] = useState(defaultDate);
		const decadeYears = getYears(subtract({ date: currentDate, type: "year", count: ONE_DECADE }), 11);
		const [activeYear, setActiveYear] = useState<number>(currentDate.getFullYear());
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
						locale: locale,
					})} ${activeYear}`;
				case "year":
					return `${activeYear}`;
				case "decade": {
					return `${previousDecadeStart.getFullYear()} — ${activeYear}`;
				}
				default:
					return "test";
			}
		}, [currentDate, view, month, locale]);

		const datePickerWrapperCn = customizationClassNames?.common?.wrapper
			? customizationClassNames.common.wrapper
			: "datePicker-wrapper";
		const datePickerHeaderCn = customizationClassNames?.common?.header
			? customizationClassNames.common.header
			: "datePicker-header";
		const datePickerArrowLeftCn = customizationClassNames?.common?.arrowLeft
			? customizationClassNames.common.arrowLeft
			: "datePicker__controller datePicker__controller_type_prev";
		const datePickerArrowNextCn = customizationClassNames?.common?.arrowRight
			? customizationClassNames.common.arrowRight
			: "datePicker__controller datePicker__controller_type_next";
		const datePickerHeaderControlsCn = customizationClassNames?.common?.headerControls
			? customizationClassNames?.common.headerControls
			: "datePicker__controls";
		const datePickerHeadertextCn = customizationClassNames?.common?.headerText
			? customizationClassNames?.common.headerText
			: "datepicker-header__time";

		useEffect(() => {
			const month = getMonthCalendarViewDates({
				initialDate: currentDate,
				month: currentMonthIdx,
			});
			setMonth(month);
		}, [currentMonthIdx, currentDate]);

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
							locale: locale,
							month: month,
							customizedDates: customizedDates,
							currentMonth: currentMonthIdx,
							disabledDates: disabledDates,
							value: value,
							onDateChange: onDateChange,
							minDate: minDate,
							customMonthClassNames: customizationClassNames?.month,
						})}
					{view === "month" && customMonthViewRenderProp === undefined && (
						<MonthView
							locale={locale}
							mode={mode}
							month={month}
							value={value}
							customDayCellRenderProp={customDayCellRenderProp}
							customizedDates={customizedDates}
							currentMonth={currentMonthIdx}
							disabledDates={disabledDates}
							weekendDays={weekendDays}
							onDateChange={onDateChange}
							minDate={minDate}
							customMonthClassNames={customizationClassNames?.month}
						/>
					)}
					{customYearViewRenderProp !== undefined &&
						customYearViewRenderProp({
							months: monthsOfYear,
							currentMonthIdx: currentMonthIdx,
							minDate: minDate,
							onMonthClick: clickMonth,
							defaultLocale: locale,
						})}
					{view === "year" && customYearViewRenderProp === undefined && (
						<YearView
							months={monthsOfYear}
							currentMonthIdx={currentMonthIdx}
							customYearClassNames={customizationClassNames?.year}
							minDate={minDate}
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
