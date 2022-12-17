import { getLastDateOfMonth } from "../getLastDateOfMonth";
import { getMonday } from "../getMonday";
import { add } from "../add";
import { getDatesInRange } from "../getDatesInRange";
import type { GetDatesOptions } from "../../types/commonTypes";

export const getLastWeekOfMonth = ({
	initialDate = new Date(),
	month,
	year,
}: GetDatesOptions): Array<Date> => {
	const startDate = new Date(year ?? initialDate.getFullYear(), month ?? initialDate.getMonth(), 1);

	const lastDayOfMonth = getLastDateOfMonth(startDate);
	const lastMondayOfMonth = getMonday(lastDayOfMonth);
	const firstMondayOfNextMonth = getMonday(add({ date: lastMondayOfMonth, type: "day", count: 7 }));

	const lastDatePickerWeek = getDatesInRange(lastMondayOfMonth, firstMondayOfNextMonth);

	return lastDatePickerWeek;
};
