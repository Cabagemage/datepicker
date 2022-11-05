import format from "date-fns/format";
import add from "date-fns/add";
import {
  compareAsc,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  previousMonday,
  startOfWeek,
  startOfYear,
} from "date-fns";
import {
  MAX_DATES_LENGTH,
  MONDAY,
  MONTHS_IDX_LIST,
  ONE_WEEK,
} from "../constants";
import {
  GetCurrentMonth,
  GetDatesInRange,
  GetFormattedShortDay,
  GetFormattedMonthToLocale,
  GetPreviousAndNextWeekForMonth,
  GetMonthsOfYear,
  GetFormattedDayToLocale,
  GetFinalizedDatesArray,
} from "../types/commonTypes";

export const getDatesInRange: GetDatesInRange = (startDate, endDate) => {
  if (startDate === null || endDate === null) {
    throw new Error("Start date of end date wasnt passed");
  }
  return eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });
};

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
  const previousMondayOfMonthStart = previousMonday(startDate);
  const lastDayOfMonth = endOfMonth(startDate);
  const lastDayOfEndWeek = add(lastDayOfMonth, { days: ONE_WEEK });
  const lastDayOfPrevWeek = add(previousMondayOfMonthStart, { days: ONE_WEEK });
  // Первая неделя месяца
  const firstMonthWeek = eachWeekOfInterval(
    { start: previousMondayOfMonthStart, end: lastDayOfPrevWeek },
    { weekStartsOn: MONDAY }
  );
  // Последняя неделя месяца.
  const lastMonthWeek = eachWeekOfInterval(
    { start: lastDayOfMonth, end: lastDayOfEndWeek },
    { weekStartsOn: MONDAY }
  );
  const firstDatePickerWeek = getDatesInRange(
    firstMonthWeek[0],
    firstMonthWeek[1]
  );
  const lastDatePickerWeek = getDatesInRange(
    lastMonthWeek[0],
    lastMonthWeek[1]
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
        return format(value, "MM dd yyyy") === format(day, "MM dd yyyy");
      }) === idx
    );
  });
  const sortedDates = excludeRepeatedElements.sort(compareAsc);
  const slicedDates = MAX_DATES_LENGTH.includes(sortedDates.length)
    ? sortedDates.slice(0, -1)
    : sortedDates;
  return slicedDates;
};

// returns number in format 1, 2,3, 4, 5 casted to string;
export const getFormattedShortDay: GetFormattedShortDay = (date) => {
  return format(date, "d");
};

// return date in format day.month.yyyy (20.05.2022)
export const getFormattedDateToLocale: GetFormattedDayToLocale = (date) => {
  const parsedToDate = new Date(date);
  return format(parsedToDate, "dd.MM.yyyy");
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

export const getMonthsOfYear: GetMonthsOfYear = (date) => {
  const getStartOfYear = startOfYear(date);
  const getEndOfYear = endOfYear(date);
  return eachMonthOfInterval({ start: getStartOfYear, end: getEndOfYear });
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
  return format(new Date(date), "w", { weekStartsOn: 1 });
};

export const getWeekDays = (date: Date) => {
  const beginningOfWeek = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });

  return getDatesInRange(beginningOfWeek, weekEnd);
};
