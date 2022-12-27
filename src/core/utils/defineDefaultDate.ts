import { DatePickerValue } from "../types/DatePicker.typedef";

export const defineDefaultDate = (value: DatePickerValue) => {
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
