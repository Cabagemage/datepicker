// return formattedDate to short or long format. output: Oct / October
import { GetFormattedMonthToLocale } from "../../types";

export const getFormattedMonthToLocale: GetFormattedMonthToLocale = ({ month, format, locale }) => {
	const monthFormat = format === undefined ? "long" : format;
	const formattedMonth = month.toLocaleDateString(locale, {
		month: monthFormat,
		day: undefined,
	});
	return formattedMonth[0].toUpperCase() + formattedMonth.slice(1);
};
