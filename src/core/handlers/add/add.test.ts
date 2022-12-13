import { formatDate } from "../formatDate";
import { add } from "./index";

const initDate = () => {
  return new Date("2022-12-12");
};

beforeEach(() => {
  return initDate();
});

describe("fn should return prevDate", () => {
  test("Should return date with added dates", () => {
    const date = initDate();
    for (const test of [
      { count: 10, expect: "2022-12-22" },
      { count: 30, expect: "2023-01-11" },
    ]) {
      expect(
        formatDate(add({ date: date, count: test.count, type: "day" }))
      ).toBe(test.expect);
    }
  });

  test("Should return date with added months", () => {
    const mockDateObject = initDate();
    for (const test of [
      { count: 1, expect: "2023-01-12" },
      { count: 2, expect: "2023-02-12" },
      { count: 6, expect: "2023-06-12" },
      { count: 12, expect: "2023-12-12" },
      { count: 24, expect: "2024-12-12" },
    ]) {
      expect(
        formatDate(
          add({ date: mockDateObject, count: test.count, type: "month" })
        )
      ).toBe(test.expect);
    }
  });

  test("Should return date with added years", () => {
    const mockDateObject = initDate();
    for (const test of [
      { count: 1, expect: "2023-12-12" },
      { count: 2, expect: "2024-12-12" },
      { count: 10, expect: "2032-12-12" },
      { count: 20, expect: "2042-12-12" },
      { count: 100, expect: "2122-12-12" },
    ]) {
      expect(
        formatDate(
          add({ date: mockDateObject, count: test.count, type: "year" })
        )
      ).toBe(test.expect);
    }
  });

  test("Should return next week to passed date", () => {
    const mockDateObject = initDate();
    for (const test of [
      { count: 1, expect: "2022-12-19" },
      { count: 2, expect: "2022-12-26" },
      { count: 4, expect: "2023-01-09" },
    ]) {
      expect(
        formatDate(
          add({ date: mockDateObject, count: test.count, type: "week" })
        )
      ).toBe(test.expect);
    }
  });
});
