import { getYears } from "./index";

describe("fn get decade", () => {
	test("fn should return array of dates", () => {
		const startDate = new Date("2022-12-12");
		const dates = getYears(startDate, 10).map((item) => {
			return item.getFullYear().toString();
		});

		expect(dates).toEqual([
			"2022",
			"2023",
			"2024",
			"2025",
			"2026",
			"2027",
			"2028",
			"2029",
			"2030",
			"2031",
			"2032",
		]);
	});
});
