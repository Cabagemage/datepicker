import { formatDate } from "../formatDate";
import { getDatesInRange } from "./index";

describe("fn should return prevDate", () => {
  test("fn should return array of dates", () => {
    const startDate = new Date("2022-12-12");
    const endDate = new Date("2022-12-24");
    const dates = getDatesInRange(startDate, endDate).map((item) => {
      return formatDate(item);
    });

    expect(dates).toEqual([
      "2022-12-12",
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
      "2022-12-24",
    ]);
  });

  test("array length should be correct", () => {
    const startDate = new Date("2022-12-12");
    const endDate = new Date("2022-12-24");
    const dates = getDatesInRange(startDate, endDate).map((item) => {
      return formatDate(item);
    });

    expect(dates.length).toBe(13);
  });
});
