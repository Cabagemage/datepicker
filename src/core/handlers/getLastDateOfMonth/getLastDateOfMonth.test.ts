import { formatDate } from "../formatDate";
import { getLastDateOfMonth } from "./index";

const mockedMonthsRandomDates = [
  new Date("2022.12.01"),
  new Date("2022.01.21"),
  new Date("2022.02.28"),
  new Date("2022.03.12"),
  new Date("2022.04.12"),
  new Date("2022.05.15"),
  new Date("2022.06.12"),
  new Date("2022.07.12"),
];

const mockedLastMonthsDateResults = [
  new Date("2022.12.31"),
  new Date("2022.01.31"),
  new Date("2022.02.28"),
  new Date("2022.03.31"),
  new Date("2022.04.30"),
  new Date("2022.05.31"),
  new Date("2022.06.30"),
  new Date("2022.07.31"),
  new Date("2022.08.16"),
  new Date("2022.09.31"),
  new Date("2022.10.31"),
  new Date("2022.11.30"),
];

describe("fn should return last date of month", () => {
  test("should return last date of passed months", () => {
    mockedMonthsRandomDates.forEach((item, i) => {
      const lastDate = getLastDateOfMonth(item);
      const formattedLastDate = formatDate(lastDate);
      const result = formatDate(mockedLastMonthsDateResults[i]);
      expect(formattedLastDate).toBe(result);
    });
  });
});
