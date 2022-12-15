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
import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { MonthView } from "./MonthView";
import YearView from "./YearView";
import DecadeView from "./DecadeView";

export const DatePicker = ({
	locale,
	mode = "single",
	minDate,
	disabledDates,
	onYearClick,
	weekendDates,
	onDateClick,
	customizedDates,
	customizationClassNames,
	selectedDates,
	date,
	selectedInterval,
	onMonthClick,
	view,
	changeCalendarView,
	customHeaderRenderProp,
}: DatePickerProps) => {
	const defaultLocale = locale === undefined ? "ru-RU" : locale;
	const defaultDate =
		date !== undefined
			? date
			: selectedDates !== undefined && selectedDates[0] !== undefined
			? selectedDates[0]
			: new Date();
	const INITIAL_MONTH_DATES = getMonthCalendarViewDates({
		initialDate: defaultDate,
		year: defaultDate.getFullYear(),
		month: defaultDate.getMonth(),
	});
	const [currentMonthIdx, setCurrentMonthIdx] = useState(defaultDate.getMonth());
	const [month, setMonth] = useState<Array<Date>>(INITIAL_MONTH_DATES);
	const [currentDate, setCurrentDate] = useState(defaultDate);
	const [updatedSelectedDates, setUpdatedSelectedDates] = useState<Array<string | Date>>([defaultDate]);
	const decadeYears = getYears(subtract({ date: currentDate, type: "year", count: ONE_DECADE }), 11);

	const [datesInterval, setDatesInterval] = useState<DatePickerInterval>(
		selectedInterval ?? {
			start: null,
			end: null,
		}
	);

	const monthsOfYear = getMonthsOfYear(currentDate);

	const clickYear = (date: Date) => {
		const updatedDate = new Date(date.getFullYear(), currentDate.getMonth(), currentDate.getDate());
		setCurrentDate(updatedDate);
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
			onDateClick({ value: [date] });
		}

		if (datesInterval.start !== null && datesInterval.end === null) {
			setDatesInterval((prev) => {
				return { ...prev, end: date };
			});

			const start = new Date(datesInterval.start) < date ? datesInterval.start : date;
			const end = new Date(date) > datesInterval.start ? date : datesInterval.start;
			onDateClick({ value: [start, end] });
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
		onDateClick({
			value: [firstDate, lastDate],
		});
	};
	const selectSingleDate = (date: Date, formattedDate: string) => {
		setUpdatedSelectedDates([formattedDate]);
		onDateClick({ value: date });
	};
	const mappedSelectedDatesToFormattedValue = updatedSelectedDates.map((item) => {
		return formatDate(new Date(item));
	});
	const selectDayForPartial = useCallback(
		(date: Date) => {
			if (mappedSelectedDatesToFormattedValue.includes(formatDate(date))) {
				const filteredDates = updatedSelectedDates.filter((item) => {
					return formatDate(new Date(date)) !== formatDate(new Date(item));
				});
				setUpdatedSelectedDates(filteredDates);
				if (selectedDates !== undefined) {
					onDateClick({
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
			onDateClick({ value: [...mappedSelectedDatesToRawDates, new Date(date)] });
		},
		[updatedSelectedDates]
	);

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
	useEffect(() => {
		const month = getMonthCalendarViewDates({
			initialDate: currentDate,
			month: currentMonthIdx,
		});
		setMonth(month);
	}, [currentMonthIdx, currentDate]);

	const hoverEvent: MouseEventHandler<HTMLButtonElement> = (e) => {
		if (datesInterval.start !== null && datesInterval.end !== null) {
			return;
		}
		const lastTriggeredDate = new Date(e.currentTarget.value);
		if (mode === "interval" && datesInterval.start !== null) {
			const start =
				new Date(datesInterval.start) < lastTriggeredDate ? datesInterval.start : lastTriggeredDate;
			const end = new Date(lastTriggeredDate) > datesInterval.start ? lastTriggeredDate : datesInterval.start;
			const formattedDates = getDatesInRange(start, end).map((item) => {
				return formatDate(item);
			});
			setUpdatedSelectedDates(formattedDates);
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
	const headerViewTogglerText = useMemo(() => {
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
		if (typeof window !== "undefined") {
		}
	}, []);
	return (
		<div className={datePickerWrapperCn}>
			{customHeaderRenderProp !== undefined ? (
				customHeaderRenderProp({ changeCalendarView, toNextUnitNavAction, toPrevUnitNavAction })
			) : (
				<div className={datePickerHeaderCn}>
					<button className={"datePicker-header__toggler"} onClick={changeCalendarView}>
						<time className={"datepicker-header__time"}>{headerViewTogglerText}</time>
					</button>
					<div className={"datePicker__controls"}>
						<button className={datePickerArrowLeftCn} type="button" onClick={toPrevUnitNavAction} />
						<button className={datePickerArrowNextCn} type="button" onClick={toNextUnitNavAction} />
					</div>
				</div>
			)}
			{view === "month" && (
				<MonthView
					locale={defaultLocale}
					month={month}
					customizedDates={customizedDates}
					currentMonth={currentMonthIdx}
					disabledDates={disabledDates}
					weekendDates={weekendDates}
					minDate={minDate}
					customMonthClassNames={customizationClassNames?.month}
					selectedDates={updatedSelectedDates}
					onSelectDay={selectDay}
					onHoverDay={hoverEvent}
				/>
			)}
			{view === "year" && (
				<YearView
					months={monthsOfYear}
					selectedDates={updatedSelectedDates}
					minDate={minDate}
					onMonthClick={clickMonth}
					defaultLocale={defaultLocale}
				/>
			)}
			{view === "decade" && <DecadeView minDate={minDate} onYearClick={clickYear} years={decadeYears} />}
		</div>
	);
};
