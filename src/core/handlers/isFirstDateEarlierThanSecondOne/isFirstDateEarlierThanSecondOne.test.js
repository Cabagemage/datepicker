import { isFirstDateEarlierThanSecondOne } from "./index";

const randomDates = [
	new Date("2022-01-11"),
	new Date("2022-12-12"),
	new Date("2022-12-31"),
	new Date("2000-12-14"),
	new Date("1968-12-15"),
	new Date("1967-12-16"),
	new Date("1600-12-17"),
];

const testDate = new Date("2023-12-31");
describe("should confirm that date is earlier than second one", () => {
	test("every mock data should return true", () => {
		randomDates.forEach((item) => {
			const result = isFirstDateEarlierThanSecondOne(item, testDate);
			expect(result).toBe(true);
		});
	});
	test("", () => {
		randomDates.forEach((item) => {
			const result = isFirstDateEarlierThanSecondOne(item, testDate);
			expect(result).toBe(true);
		});
	});
});
