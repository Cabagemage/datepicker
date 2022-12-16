import { getMonday } from "./index";
import { formatDate } from "../formatDate";

const mockedWeek = [
	new Date("Thu Dec 08 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Fri Dec 09 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Thu Dec 08 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Wed Dec 07 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Tue Dec 06 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Mon Dec 05 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Sat Dec 10 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
	new Date("Sun Dec 11 2022 00:00:00 GMT+0300 (Moscow Standard Time)"),
];

describe("fn should return monday", () => {
	test("should be monday of passed week", () => {
		const result = new Date("Mon Dec 05 2022 00:00:00 GMT+0300 (Moscow Standard Time)");
		mockedWeek.forEach((item) => {
			const monday = getMonday(item);
			expect(formatDate(monday)).toBe(formatDate(result));
		});
	});
});
