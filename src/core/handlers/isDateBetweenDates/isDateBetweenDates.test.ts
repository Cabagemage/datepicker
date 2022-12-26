import { isDateBetweenDates } from "./index";

const randomDates = [
	new Date("2022-01-11"),
	new Date("2022-05-12"),
	new Date("2022-07-14"),
	new Date("2022-08-15"),
	new Date("2022-09-16"),
	new Date("2022-12-17"),
];

const testDate = new Date("2022-06-31");
describe("should test that date is between other dates", () => {
	test("should return true", () => {
		expect(
			isDateBetweenDates({
				date: testDate,
				startDate: randomDates[0],
				endDate: randomDates[randomDates.length - 1],
			})
		).toBe(true);
	});
});
