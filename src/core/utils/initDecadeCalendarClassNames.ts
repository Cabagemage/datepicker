import { DatePickerDecadeViewClassNames } from "../types/DatePicker.typedef";

export const initDecadeCalendarClassNames = (
	customDecadeClassNames?: Partial<DatePickerDecadeViewClassNames>
) => {
	const decadeViewBodyClassName = customDecadeClassNames?.body
		? customDecadeClassNames.body
		: "datePicker-body__decade";
	const decadeViewCellClassName = customDecadeClassNames?.decadeViewYearCell
		? customDecadeClassNames.decadeViewYearCell
		: "datePicker-body__decade-cell";
	const decadeCellDisabledClassName = customDecadeClassNames?.decadeViewCellDisabled
		? customDecadeClassNames.decadeViewCellDisabled
		: "datePicker-body__decade_disabled";
	const decadeCellSelected = customDecadeClassNames?.decadeViewCellSelected
		? customDecadeClassNames.decadeViewCellSelected
		: "datePicker-body__year_selected";

	return {
		decadeCellDisabledClassName,
		decadeViewBodyClassName,
		decadeCellSelected,
		decadeViewCellClassName,
	};
};
