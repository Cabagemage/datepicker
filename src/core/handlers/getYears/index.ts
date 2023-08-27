import { add } from "../add";
import { isDateValid } from "../isDateValid";
import { InvalidDate } from "../../errors/InvalidDate";

export const getYears = (startDate: Date, count: number) => {
	if (!isDateValid(startDate)) {
		throw new InvalidDate(`You pass wrong date for ${getYears.name} fn`);
	}
	const years = [];
	for (let i = 0; years.length <= count; ++i) {
		const year = add({ date: startDate, count: i, type: "year" });
		years.push(new Date(year.getFullYear(), 0, 1));
	}

	return years;
};
