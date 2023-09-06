// function to get monday of passed date week.
import { isDateValid } from "../isDateValid";
import { InvalidDate } from "../../errors/InvalidDate";

export const getMonday = (date: Date) => {
	if (!isDateValid(date)) {
		throw new InvalidDate(`You pass wrong date for ${getMonday.name} fn`);
	}
	const sunday = date.getDay() === 0;

	// we can't subtract 0 to get current sunday, that's why we'll pass date - 6 days in this block of code
	if (sunday) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
	}

	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
};
