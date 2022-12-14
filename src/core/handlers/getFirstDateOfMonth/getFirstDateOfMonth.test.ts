import { formatDate } from "../formatDate";
import { getFirstDateOfMonth } from "./index";

const mockedMonthsRandomDates = [
  new Date("2022.12.01"),
  new Date("2022.01.21"),
  new Date("2022.02.28"),
  new Date("2022.03.12"),
  new Date("2022.04.12"),
  new Date("2022.05.15"),
  new Date("2022.06.12"),
  new Date("2022.07.12"),
  new Date("2022.08.07"),
  new Date("2022.09.07"),
  new Date("2022.10.17"),
  new Date("2022.11.19"),
];
const mockedFirstDateOfMonthResults = [
  new Date("2022.12.01"),
  new Date("2022.01.01"),
  new Date("2022.02.01"),
  new Date("2022.03.01"),
  new Date("2022.04.01"),
  new Date("2022.05.01"),
  new Date("2022.06.01"),
  new Date("2022.07.01"),
  new Date("2022.08.01"),
  new Date("2022.09.01"),
  new Date("2022.10.01"),
  new Date("2022.11.01"),
];

describe("fn should return first date of month", () => {
  test("should return array of first month date of passed dates", () => {
    mockedMonthsRandomDates.forEach((item, i) => {
      const firstDate = getFirstDateOfMonth(item);
      const formattedLastDate = formatDate(firstDate);
      const result = formatDate(mockedFirstDateOfMonthResults[i]);
      expect(formattedLastDate).toBe(result);
    });
  });
});
