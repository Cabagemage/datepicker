import { isDateValid } from "../isDateValid";
import { InvalidDate } from "../../errors/InvalidDate";

export const formatDate = (date: Date, separator = "-"): string => {
	if (!isDateValid(date)) {
		throw new InvalidDate(`You pass wrong date for ${formatDate.name} fn`);
	}
	const newDate = new Date(date);
	let month = "" + (newDate.getMonth() + 1);
	let day = "" + newDate.getDate();
	const year = newDate.getFullYear();

	if (month.length < 2) {
		month = "0" + month;
	}
	if (day.length < 2) {
		day = "0" + day;
	}
	return [year, month, day].join(separator);
};
