import { DatePickerYearViewClassNames } from "../types";

export const initYearCalendarClassNames = (customYearClassNames?: Partial<DatePickerYearViewClassNames>) => {
	const yearViewBodyClassName = customYearClassNames?.yearViewBody
		? customYearClassNames.yearViewBody
		: "datePicker-body__year";
	const yearViewMonthCellClassName = customYearClassNames?.yearViewMonthCell
		? customYearClassNames.yearViewMonthCell
		: "datePicker-body__year-cell";
	const yearViewMonthCellDisabledClassName = customYearClassNames?.yearViewCellDisabled
		? customYearClassNames.yearViewCellDisabled
		: "datePicker-body__year_disabled";
	const yearViewMonthSelectedClassName = customYearClassNames?.yearViewMonthCellSelected
		? customYearClassNames.yearViewMonthCellSelected
		: "datePicker-body__year_selected";

	return {
		yearViewBodyClassName,
		yearViewMonthCellClassName,
		yearViewMonthCellDisabledClassName,
		yearViewMonthSelectedClassName,
	};
};
