// returns number in format 1, 2,3, 4, 5 casted to string;
import { GetFormattedShortDay } from "../../types";

export const getFormattedShortDayForMonthView: GetFormattedShortDay = (date) => {
	return date.getDate().toString();
};
