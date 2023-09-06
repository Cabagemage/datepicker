import { isDateValid } from "../isDateValid";
import { InvalidDate } from "../../errors/InvalidDate";

export const isFirstDateEarlierThanSecondOne = (start: Date | string, end: Date | string): boolean => {
	const endTime = new Date(end);
	const startTime = new Date(start);

	if (!isDateValid(endTime) || !isDateValid(startTime)) {
		throw new InvalidDate(`You pass wrong date for ${isFirstDateEarlierThanSecondOne.name} fn`);
	}
	return (
		startTime.getTime() <= endTime.getTime() &&
		endTime.toLocaleDateString() !== startTime.toLocaleDateString()
	);
};
