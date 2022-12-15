import { GetDatesInRange } from "../../types";
import { add } from "../add";

export const getDatesInRange: GetDatesInRange = (startDate, endDate) => {
	if (startDate === null || endDate === null) {
		throw new Error("Start date of end date wasnt passed");
	}
	const dates: Array<Date> = [];
	let currentDate = startDate;
	while (currentDate <= endDate) {
		dates.push(new Date(currentDate));
		currentDate = add({ date: currentDate, count: 1, type: "day" });
	}
	return dates;
};
