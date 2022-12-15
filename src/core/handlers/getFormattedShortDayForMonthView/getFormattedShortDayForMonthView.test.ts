import { getFormattedShortDayForMonthView } from "./index";

const mockedRandomDates = [
	new Date("2022.12.01"),
	new Date("2022.01.21"),
	new Date("2022.02.28"),
	new Date("2022.03.12"),
	new Date("2022.04.05"),
	new Date("2022.05.06"),
	new Date("2022.06.07"),
	new Date("2022.07.08"),
	new Date("2022.08.09"),
	new Date("2022.09.10"),
	new Date("2022.10.11"),
	new Date("2022.11.30"),
];

const mockedResults = ["1", "21", "28", "12", "5", "6", "7", "8", "9", "10", "11", "30"];

describe("fn should return first date of month", () => {
	test("should return formatted days to dates numbers", () => {
		mockedRandomDates.forEach((item, i) => {
			const formattedShortDayForMonthView = getFormattedShortDayForMonthView(item);

			const result = mockedResults[i];
			expect(formattedShortDayForMonthView).toBe(result);
		});
	});
});
