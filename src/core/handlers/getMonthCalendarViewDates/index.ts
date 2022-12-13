import {
  GetDatesOptions,
  GetMonthCalendarViewDates,
} from "../../types/commonTypes";
import { formatDate } from "../formatDate";
import { MAX_DATES_LENGTH } from "../../constants";
import { getCurrentMonth } from "../getCurrentMonth";
import { getLastDateOfMonth } from "../getLastDateOfMonth";
import { getFirstDateOfMonth } from "../getFirstDateOfMonth";
import { getMonday } from "../getMonday";
import { add } from "../add";
import { subtract } from "../subtract";
import { getDatesInRange } from "../getDatesInRange";

type GetPreviousAndNextWeekForMonth = (args: GetDatesOptions) => {
  nextWeek: Array<Date>;
  previousWeek: Array<Date>;
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

export const getMonthCalendarViewDates: GetMonthCalendarViewDates = ({
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
