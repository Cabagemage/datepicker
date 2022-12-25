import { DatePickerMonthViewClassNames } from "../types";

export const initMonthCalendarClassNames = (
	customMonthClassNames?: Partial<DatePickerMonthViewClassNames>
) => {
	const monthDayCellClassName = customMonthClassNames?.monthViewDay
		? customMonthClassNames.monthViewDay
		: `datePicker-body__day`;

	const monthDayCellActiveClassName =
		customMonthClassNames?.monthViewDayActive !== undefined
			? customMonthClassNames.monthViewDayActive
			: "datePicker__selectedDate";

	const monthDayCellDisabledClassName = customMonthClassNames?.monthViewDisabledDate
		? customMonthClassNames.monthViewDisabledDate
		: "datePicker-body__day_disabled";

	const monthDayCellTextClassName = customMonthClassNames?.monthViewDayDayText
		? customMonthClassNames.monthViewDayDayText
		: "datePicker-body__day-text";

	const defaultMonthDayCellBackgroundClassName = customMonthClassNames?.monthViewDayDefaultBackgroundClassName
		? customMonthClassNames.monthViewDayDefaultBackgroundClassName
		: "datePicker-body__day_transparent";

	const monthViewMonthBodyClassName =
		customMonthClassNames?.monthViewMonthBody !== undefined
			? customMonthClassNames.monthViewMonthBody
			: "datePicker-body";

	const monthViewWeekDaysClassName = customMonthClassNames?.monthViewWeekDays
		? customMonthClassNames.monthViewWeekDays
		: "datePicker-weekdays";
	const monthViewWeekDaysListItemClassName = customMonthClassNames?.monthViewWeekDaysListItem
		? customMonthClassNames.monthViewWeekDaysListItem
		: "datePicker-weekdays__day";
	const monthViewDateIsNotRelatedToMonthClassName = customMonthClassNames?.monthViewDateIsNotRelatedToMonth
		? customMonthClassNames.monthViewDateIsNotRelatedToMonth
		: "datePicker__inactive-text";

	const monthViewIsTodayClassName = customMonthClassNames?.monthViewToday
		? customMonthClassNames.monthViewToday
		: "datePicker__day-today";

	// in default theme, weekend Day has no styling
	const monthWeekendDayClassName = customMonthClassNames?.monthWeekendDay
		? customMonthClassNames.monthWeekendDay
		: "";
	return {
		monthDayCellClassName,
		monthDayCellActiveClassName,
		monthDayCellDisabledClassName,
		monthDayCellTextClassName,
		defaultMonthDayCellBackgroundClassName,
		monthViewMonthBodyClassName,
		monthViewWeekDaysClassName,
		monthViewWeekDaysListItemClassName,
		monthViewDateIsNotRelatedToMonthClassName,
		monthViewIsTodayClassName,
		monthWeekendDayClassName,
	};
};
