import { add } from "./add";
import { MAX_DATES_LENGTH, MONTHS_IDX_LIST } from "../constants";
import {
  GetCurrentMonth,
  GetFormattedShortDay,
  GetFormattedMonthToLocale,
  GetPreviousAndNextWeekForMonth,
  GetFormattedDayToLocale,
  GetFinalizedDatesArray,
} from "../types/commonTypes";
import { getDatesInRange } from "./getDatesInRange";
import { getMonday } from "./getMonday";
import { getLastDateOfMonth } from "./getLastDateOfMonth";
import { getSunday } from "./getSunday";
import { getFirstDateOfMonth } from "./getFirstDateOfMonth";
import { subtract } from "./subtract";
import { getWeek } from "./getWeek";
import { formatDate } from "./formatDate";

const getCurrentMonth: GetCurrentMonth = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
}) => {
  if (!MONTHS_IDX_LIST.includes(month)) {
    throw new Error("Please, add month between 0 - 11");
  }
  const date = new Date(year, month, 1);

  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};
const getPreviousAndNextWeek: GetPreviousAndNextWeekForMonth = ({
  initialDate = new Date(),
  month,
  year,
}) => {
  const startDate = new Date(
    year ?? initialDate.getFullYear(),
    month ?? initialDate.getMonth(),
    1
  );
  const lastDayOfMonth = getLastDateOfMonth(startDate);
  const firstDayOfMonth = getFirstDateOfMonth(startDate);
  const lastMondayOfMonth = getMonday(lastDayOfMonth);
  const mondayFromPreviousMonthOrCurrentMonth = getMonday(firstDayOfMonth);
  const nextMonthAfterPreviousMonthOrCurrentMonthMonday = getMonday(
    new Date(startDate?.getFullYear(), startDate?.getMonth(), 7)
  );
  const firstMondayOfNextMonth = getMonday(
    add({ date: lastMondayOfMonth, type: "day", count: 7 })
  );
  // Если понедельник совпадает с первым числом месяца, то мы получаем последний понедельник предыдущего месяца.
  const finalStartMonday =
    mondayFromPreviousMonthOrCurrentMonth.toUTCString() ===
    nextMonthAfterPreviousMonthOrCurrentMonthMonday.toUTCString()
      ? getMonday(subtract({ date: firstDayOfMonth, count: 7, type: "day" }))
      : mondayFromPreviousMonthOrCurrentMonth;

  const firstDatePickerWeek = getDatesInRange(
    finalStartMonday,
    nextMonthAfterPreviousMonthOrCurrentMonthMonday
  );
  const lastDatePickerWeek = getDatesInRange(
    lastMondayOfMonth,
    firstMondayOfNextMonth
  );

  return {
    previousWeek: firstDatePickerWeek,
    nextWeek: lastDatePickerWeek,
  };
};
export const getFinalizedDates: GetFinalizedDatesArray = ({
  initialDate = new Date(),
  month,
  year,
}) => {
  const { previousWeek, nextWeek } = getPreviousAndNextWeek({
    initialDate,
    month,
    year,
  });
  const currentMonth = getCurrentMonth({
    year: year ?? initialDate.getFullYear(),
    month: month ?? initialDate.getMonth(),
  });

  const temporaryArray = previousWeek.concat(currentMonth).concat(nextWeek);
  const excludeRepeatedElements = temporaryArray.filter((day, idx, array) => {
    return (
      array.findIndex((value) => {
        return formatDate(value) === formatDate(day);
      }) === idx
    );
  });

  const slicedDates = MAX_DATES_LENGTH.includes(excludeRepeatedElements.length)
    ? excludeRepeatedElements.slice(0, -1)
    : excludeRepeatedElements;
  return slicedDates;
};

// returns number in format 1, 2,3, 4, 5 casted to string;
export const getFormattedShortDay: GetFormattedShortDay = (date) => {
  return date.toLocaleDateString("ru-RU", { day: "numeric" });
};

// return date in format day.month.yyyy (20.05.2022)
export const getFormattedDateToLocale: GetFormattedDayToLocale = (date) => {
  const parsedToDate = new Date(date);
  return parsedToDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// return formattedDate to short or long format. output: Oct / October
export const getFormattedMonthToLocale: GetFormattedMonthToLocale = ({
  month,
  format,
  locale,
}) => {
  const monthFormat = format === undefined ? "long" : format;
  const formattedMonth = month.toLocaleDateString(locale, {
    month: monthFormat,
    day: undefined,
  });
  return formattedMonth[0].toUpperCase() + formattedMonth.slice(1);
};

// Функция, определяющая, что переданная дата меньше, чем дата конца
export const isFirstDateEarlierThanSecondOne = (
  start: Date | string,
  end: Date | string
): boolean => {
  const endTime = new Date(end);
  const startTime = new Date(start);
  const today = new Date().toLocaleDateString();
  return (
    startTime.getTime() <= endTime.getTime() &&
    today !== startTime.toLocaleDateString()
  );
};

export const getWeekOfYear = (date: Date | string) => {
  return getWeek(new Date(date));
};

export const getWeekDays = (date: Date) => {
  const beginningOfWeek = getMonday(date);
  const weekEnd = getSunday(date);
  return getDatesInRange(beginningOfWeek, weekEnd);
};
