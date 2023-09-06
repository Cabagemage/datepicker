import type { DatePickerValue } from "../../../types/DatePicker.typedef";
import { getDatesInRange } from "../../getDatesInRange";

export const defineDefaultMultipleDates = (value: DatePickerValue) => {
	if (Array.isArray(value)) {
		const startAndEndDates = [value[0], value[1]];
		const isStartDateIsDefined = startAndEndDates.some((value) => {
			return value !== undefined;
		});
		const isStartAndEndDateIsDefined = startAndEndDates.every((value) => {
			return value !== undefined;
		});
		if (isStartDateIsDefined) {
			return [value[0]];
		}

		if (isStartAndEndDateIsDefined) {
			const firstDate = value[0];
			const secondDate = value[1];
			const start = new Date(firstDate) < secondDate ? firstDate : secondDate;
			const end = new Date(secondDate) > firstDate ? secondDate : firstDate;
			return getDatesInRange(start, end);
		}
		return value;
	}
	return [];
};
