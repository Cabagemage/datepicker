import { isDateValid } from "../isDateValid";
import { InvalidDate } from "../../errors/InvalidDate";

export const formatDayOfWeek = (date: Date, locale: Intl.LocalesArgument) => {
	if (!isDateValid(date)) {
		throw new InvalidDate("You pass wrong date for formatDate fn");
	}
	return date.toLocaleDateString(locale, { weekday: "short" });
};
