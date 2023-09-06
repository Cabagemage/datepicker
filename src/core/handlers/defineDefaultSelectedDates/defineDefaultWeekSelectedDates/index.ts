import { getMonday } from "../../getMonday";
import { getSunday } from "../../getSunday";
import { getDatesInRange } from "../../getDatesInRange";
import { formatDate } from "../../formatDate";
import type { DatePickerValue } from "../../../types/DatePicker.typedef";

export const defineDefaultWeekSelectedDates = (value: DatePickerValue) => {
	if (!(value instanceof Date)) {
		new Error("Value should be instance of date");
		return [];
	}
	const monday = getMonday(value);
	const sunday = getSunday(value);
	return getDatesInRange(monday, sunday).map((item) => {
		return formatDate(item);
	});
};
