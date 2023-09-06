import { useCallback, useState } from "react";
import {
	DECEMBER_ORDINAL_NUMBER,
	JANUARY_ORDINAL_NUMBER,
	MIDDLE_DAY_OF_MONTH,
	MONTHS_ORDINAL_NUMBERS_LIST,
	ONE_DECADE,
	ONE_MONTH,
	ONE_YEAR,
	START_OF_NEW_MONTH_IDX,
} from "../constants";
import { add, getMonthCalendarViewDates, getMonthsOfYear, getYears, subtract } from "../handlers";
import type { CalendarViews } from "../types";
import type { DatePickerValue } from "../types/DatePicker.typedef";
import { defineDefaultDate } from "../utils/defineDefaultDate";

type UseDatePickerCore = {
	view: CalendarViews;
	value: DatePickerValue;
};

const useDatePickerCore = ({ view, value }: UseDatePickerCore) => {
	const defaultDate = defineDefaultDate(value);
	const INITIAL_MONTH_DATES = getMonthCalendarViewDates({
		initialDate: defaultDate,
		year: defaultDate.getFullYear(),
		month: defaultDate.getMonth(),
	});
	const defaultDecadesYears = getYears(
		subtract({ date: defaultDate, type: "year", count: ONE_DECADE }),
		ONE_DECADE
	);

	const [month, setMonth] = useState<Array<Date>>(INITIAL_MONTH_DATES);
	const [currentMonthIdx, setCurrentMonthIdx] = useState(month[MIDDLE_DAY_OF_MONTH].getMonth());
	const [decadeYears, setDecadesYears] = useState(defaultDecadesYears);
	const [monthsOfYear, setMonthsOfYear] = useState(getMonthsOfYear(defaultDate));
	const [activeYear, setActiveYear] = useState<number>(defaultDate.getFullYear());

	// when user click on year cell
	const selectYear = useCallback(
		(date: Date) => {
			const updatedMonths = getMonthsOfYear(
				new Date(date.getFullYear(), currentMonthIdx, defaultDate.getDate())
			);
			setMonthsOfYear(updatedMonths);
			setActiveYear(date.getFullYear());
		},
		[currentMonthIdx, defaultDate]
	);

	// when user use navigation arrows
	const changeYear = useCallback(
		(action: "add" | "subtract", count: number) => {
			const changedYear = action === "add" ? activeYear + count : activeYear - count;
			const updatedMonths = getMonthsOfYear(new Date(changedYear, currentMonthIdx, defaultDate.getDate()));
			setMonthsOfYear(updatedMonths);
			setActiveYear(changedYear);
		},
		[activeYear, currentMonthIdx, defaultDate]
	);

	const toNextUnitNavAction = useCallback(() => {
		if (view === "month") {
			const nextMonth = currentMonthIdx + ONE_MONTH;
			const isCurrentMonthIsDecember = currentMonthIdx === DECEMBER_ORDINAL_NUMBER;

			if (MONTHS_ORDINAL_NUMBERS_LIST.includes(nextMonth)) {
				setCurrentMonthIdx(nextMonth);
			}

			if (isCurrentMonthIsDecember) {
				changeYear("add", ONE_YEAR);
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
	}, [activeYear, changeYear, currentMonthIdx, decadeYears, defaultDate, view]);

	const toPrevUnitNavAction = useCallback(() => {
		if (view === "month") {
			const prevMonth = currentMonthIdx - ONE_MONTH;
			if (MONTHS_ORDINAL_NUMBERS_LIST.includes(prevMonth)) {
				setCurrentMonthIdx(prevMonth);
			}
			const isCurrentMonthIdxIsJanuary = currentMonthIdx === JANUARY_ORDINAL_NUMBER;
			if (isCurrentMonthIdxIsJanuary) {
				changeYear("subtract", ONE_YEAR);
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
	}, [activeYear, changeYear, currentMonthIdx, decadeYears, defaultDate, view]);

	const selectMonth = useCallback(
		(date: Date) => {
			const daysOfMonth = getMonthCalendarViewDates({ initialDate: date, year: activeYear });
			const newMonthIdx = new Date(daysOfMonth[START_OF_NEW_MONTH_IDX]).getMonth();
			setMonth(daysOfMonth);
			setCurrentMonthIdx(newMonthIdx);
		},
		[activeYear]
	);

	return {
		selectMonth,
		monthsOfYear,
		currentMonthIdx,
		toPrevUnitNavAction,
		toNextUnitNavAction,
		selectYear,
		month,
		decadeYears,
		activeYear,
	};
};

export default useDatePickerCore;
