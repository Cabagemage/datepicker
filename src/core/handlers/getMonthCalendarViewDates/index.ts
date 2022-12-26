import { GetMonthCalendarViewDates } from "../../types/commonTypes";
import { formatDate } from "../formatDate";
import { MAX_DATES_LENGTH } from "../../constants";
import { getCurrentMonth } from "../getCurrentMonth";
import { getFirstWeekOfMonth } from "../getFirstWeekOfMonth";
import { getLastWeekOfMonth } from "../getLastWeekOfMonth";
import { getMonday } from "../getMonday";
import { getSunday } from "../getSunday";
import { getDatesInRange } from "../getDatesInRange";

export const getMonthCalendarViewDates: GetMonthCalendarViewDates = ({
	initialDate = new Date(),
	month,
	year,
}) => {
	const firstWeekOfMonth = getFirstWeekOfMonth({ initialDate, month, year });
	const lastWeekOfMonth = getLastWeekOfMonth({ initialDate, month, year });

	const currentMonth = getCurrentMonth({
		year: year ?? initialDate.getFullYear(),
		month: month ?? initialDate.getMonth(),
	});
	const nextMondayOfLastWeekOfMonth = getMonday(lastWeekOfMonth[lastWeekOfMonth.length - 1]);
	const nextSundayOfLastWeekOfMonth = getSunday(lastWeekOfMonth[lastWeekOfMonth.length - 1]);
	const lastWeek = getDatesInRange(nextMondayOfLastWeekOfMonth, nextSundayOfLastWeekOfMonth);
	const previousMonthFirstWeekStart =
		firstWeekOfMonth.length >= 14 ? firstWeekOfMonth.slice(7) : firstWeekOfMonth;
	const temporaryArray = previousMonthFirstWeekStart
		.concat(currentMonth)
		.concat(lastWeekOfMonth)
		.concat(lastWeek);

	const excludeRepeatedElements = temporaryArray.filter((day, idx, array) => {
		return (
			array.findIndex((value) => {
				return formatDate(value) === formatDate(day);
			}) === idx
		);
	});

	const monthCalendarViewDates =
		MAX_DATES_LENGTH < excludeRepeatedElements.length
			? excludeRepeatedElements.slice(0, -7)
			: excludeRepeatedElements;
	return monthCalendarViewDates;
};
