import { getOrdinalNumberOfWeek } from "./index";

const mockedWeek = [new Date("2022.01.01"), new Date("2022.01.08"), new Date("2022.12.14")];

const result = [1, 2, 50];
describe("fn should return monday", () => {
	test("should be monday of passed week", () => {
		mockedWeek.forEach((item, i) => {
			const monday = getOrdinalNumberOfWeek(item);
			expect(monday).toBe(result[i]);
		});
	});
});
