import { add } from "../add";

export const getYears = (startDate: Date, count: number) => {
	const years = [];

	for (let i = 0; years.length <= count; ++i) {
		const year = add({ date: startDate, count: i, type: "year" });
		years.push(new Date(year.getFullYear(), 0, 1));
	}

	return years;
};
