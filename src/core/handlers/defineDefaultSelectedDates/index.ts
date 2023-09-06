import { getDatesInRange } from "../getDatesInRange";
import { defineDefaultWeekSelectedDates } from "./defineDefaultWeekSelectedDates";
import { defineDefaultSingleSelectedDate } from "./defineDefaultSingleDate";
import { defineDefaultMultipleDates } from "./defineDefaultMultipleDates";
import type { DatePickerMode, DatePickerValue } from "../../types/DatePicker.typedef";

export const defineDefaultSelectedDates = (mode: DatePickerMode, value: DatePickerValue) => {
	if (mode === "week") {
		return defineDefaultWeekSelectedDates(value);
	}

	if (mode === "single") {
		return defineDefaultSingleSelectedDate(value);
	}

	if (Array.isArray(value)) {
		return defineDefaultMultipleDates(value);
	}
	if (!(value instanceof Date) && value.start !== null && value.end !== null) {
		return getDatesInRange(value.start, value.end);
	}

	return [];
};
