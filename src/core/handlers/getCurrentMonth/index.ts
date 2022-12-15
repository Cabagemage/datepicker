import { GetCurrentMonth } from "../../types";
import { MONTHS_IDX_LIST } from "../../constants";

export const getCurrentMonth: GetCurrentMonth = ({
	year = new Date().getFullYear(),
	month = new Date().getMonth(),
}) => {
	if (!MONTHS_IDX_LIST.includes(month)) {
		throw new Error("Please, add month between 0 - 11");
	}
	const date = new Date(year, month, 1);

	const dates = [];

	while (date.getMonth() === month) {
		dates.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}

	return dates;
};
