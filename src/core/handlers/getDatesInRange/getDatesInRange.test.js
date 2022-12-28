import { formatDate } from "../formatDate";
import { getDatesInRange } from "./index";

const start = "2022-12-12";
const end = "2022-12-24";
describe("fn should return prevDate", () => {
	test("fn should return array of dates", () => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const dates = getDatesInRange(startDate, endDate).map((item) => {
			return formatDate(item);
		});

		expect(dates).toEqual([
			start,
			"2022-12-13",
			"2022-12-14",
			"2022-12-15",
			"2022-12-16",
			"2022-12-17",
			"2022-12-18",
			"2022-12-19",
			"2022-12-20",
			"2022-12-21",
			"2022-12-22",
			"2022-12-23",
			end,
		]);
	});

	test("array length should be correct", () => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const dates = getDatesInRange(startDate, endDate).map((item) => {
			return formatDate(item);
		});

		expect(dates.length).toBe(13);
	});
});
