import { formatDate } from "../formatDate";
import { subtract } from "./index";

const initDate = () => {
	return new Date("2022-12-12");
};

beforeEach(() => {
	return initDate();
});

describe("fn should return prevDate", () => {
	test("Should return prev week start", () => {
		const date = initDate();
		for (const test of [
			{ count: 10, expect: "2022-12-02" },
			{ count: 30, expect: "2022-11-12" },
		]) {
			expect(formatDate(subtract({ date: date, count: test.count, type: "day" }))).toBe(test.expect);
		}
	});

	test("Should return prev month start", () => {
		const mockDateObject = initDate();
		for (const test of [
			{ count: 1, expect: "2022-11-12" },
			{ count: 2, expect: "2022-10-12" },
			{ count: 6, expect: "2022-06-12" },
			{ count: 12, expect: "2021-12-12" },
			{ count: 24, expect: "2020-12-12" },
		]) {
			expect(formatDate(subtract({ date: mockDateObject, count: test.count, type: "month" }))).toBe(
				test.expect
			);
		}
	});

	test("Should return substracted years date", () => {
		const mockDateObject = initDate();
		for (const test of [
			{ count: 1, expect: "2021-12-12" },
			{ count: 2, expect: "2020-12-12" },
			{ count: 10, expect: "2012-12-12" },
			{ count: 20, expect: "2002-12-12" },
			{ count: 100, expect: "1922-12-12" },
		]) {
			expect(formatDate(subtract({ date: mockDateObject, count: test.count, type: "year" }))).toBe(
				test.expect
			);
		}
	});

	test("Should return prev week", () => {
		const mockDateObject = initDate();
		for (const test of [
			{ count: 1, expect: "2022-12-05" },
			{ count: 2, expect: "2022-11-28" },
			{ count: 4, expect: "2022-11-14" },
		]) {
			expect(formatDate(subtract({ date: mockDateObject, count: test.count, type: "week" }))).toBe(
				test.expect
			);
		}
	});
});
