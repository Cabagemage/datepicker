import type { DatePickerValue } from "../../../types/DatePicker.typedef";

export const defineDefaultSingleSelectedDate = (value: DatePickerValue) => {
	if (!(value instanceof Date)) {
		new Error("Value should be instance of date");
		return [];
	}
	return [value];
};
