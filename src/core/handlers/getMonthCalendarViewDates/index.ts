import { GetMonthCalendarViewDates } from "../../types/commonTypes";
import { formatDate } from "../formatDate";
import { MAX_DATES_LENGTH } from "../../constants";
import { getCurrentMonth } from "../getCurrentMonth";
import { getFirstWeekOfMonth } from "../getFirstWeekOfMonth";
import { getLastWeekOfMonth } from "../getLastWeekOfMonth";

export const getMonthCalendarViewDates: GetMonthCalendarViewDates = ({
  initialDate = new Date(),
  month,
  year,
}) => {
  const firstWeekOfMonth = getFirstWeekOfMonth({ initialDate, month, year });
  const lastWeekOfMonth = getLastWeekOfMonth({ initialDate, month, year });
  const currentMonth = getCurrentMonth({
    year: year ?? initialDate.getFullYear(),
    month: month ?? initialDate.getMonth(),
  });

  const temporaryArray = firstWeekOfMonth
    .concat(currentMonth)
    .concat(lastWeekOfMonth);
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
