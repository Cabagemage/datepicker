import { GetMonthsOfYear } from "../../types";
import { add } from "../add";

export const getMonthsOfYear: GetMonthsOfYear = (date) => {
	const getStartOfYear = new Date(date.getFullYear(), 0, 1);
	const getEndOfYear = new Date(date.getFullYear(), 11, 31);
	const months = [];
	let currentDate = getStartOfYear;
	while (currentDate <= getEndOfYear) {
		months.push(currentDate);
		currentDate = add({ date: currentDate, count: 1, type: "month" });
	}
	return months;
};
