// function to get sunday of passed date;
import { isDateValid } from "../isDateValid";
import { InvalidDate } from "../../errors/InvalidDate";

export const getSunday = (date: Date) => {
	if (!isDateValid(date)) {
		throw new InvalidDate(`You pass wrong date for ${getSunday.name} fn`);
	}
	const isSunday = date.getDay() === 0;

	if (isSunday) {
		return date;
	}

	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
};
