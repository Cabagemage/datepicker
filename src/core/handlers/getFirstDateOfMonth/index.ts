import { isDateValid } from "../isDateValid";
import { InvalidDate } from "../../errors/InvalidDate";

export const getFirstDateOfMonth = (date: Date) => {
	if (!isDateValid(date)) {
		throw new InvalidDate("You pass wrong date for formatDate fn");
	}
	return new Date(date.getFullYear(), date.getMonth(), 1);
};
