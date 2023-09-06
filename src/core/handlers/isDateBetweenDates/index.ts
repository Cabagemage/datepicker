import { isDateValid } from "../isDateValid";
import { InvalidDate } from "../../errors/InvalidDate";

type IsDateBetweenDates = {
	date: Date;
	startDate: Date;
	endDate: Date;
};

export const isDateBetweenDates = ({ date, startDate, endDate }: IsDateBetweenDates): boolean => {
	const passedDates = [date, startDate, endDate];
	for (let i = 0; i < passedDates.length; ++i) {
		if (!isDateValid(passedDates[i])) {
			throw new InvalidDate(`You pass wrong date for ${isDateBetweenDates.name} fn`);
		}
	}

	return date > startDate && date < endDate;
};
