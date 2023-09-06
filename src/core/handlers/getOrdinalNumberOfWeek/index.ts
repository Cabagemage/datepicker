import { isDateValid } from "../isDateValid";
import { InvalidDate } from "../../errors/InvalidDate";

export const getOrdinalNumberOfWeek = (date: Date) => {
	if (!isDateValid(date)) {
		throw new InvalidDate(`You pass wrong date for ${getOrdinalNumberOfWeek.name} fn`);
	}
	const millisecondsInDay = 86400000;
	const yearStart = +new Date(date.getFullYear(), 0, 1);
	const today = +new Date(date.getFullYear(), date.getMonth(), date.getDate());
	const dayOfYear: number = (today - yearStart + millisecondsInDay) / millisecondsInDay;
	return Math.ceil(dayOfYear / 7);
};
