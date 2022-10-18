import format from "date-fns/format";
import add from "date-fns/add";
import {
  compareAsc,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  previousMonday,
} from "date-fns";

type GetCurrentMonth = ({
  year,
  month,
}: {
  year?: number;
  month?: number;
}) => Array<Date>;
type DateType = "string" | Date | null;

const availableMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const getDaysInterval = ([start, end]: [Date, Date]) => {
  let dateList: Array<Date> = [];
  const startDate = start;
  const endDate = end;
  while (startDate < new Date(endDate)) {
    dateList = [...dateList, new Date(startDate)];
    startDate.setDate(startDate.getDate() + 1);
  }
  dateList = [...dateList, new Date(endDate)];
  return dateList;
};
export const getCurrentMonth: GetCurrentMonth = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
}) => {
  if (!availableMonths.includes(month)) {
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
export const getPreviousAndNextWeek = (
  initialDate = new Date(),
  month?: number,
  year?: number
) => {
  const startDate = new Date(
    year ?? initialDate.getFullYear(),
    month ?? initialDate.getMonth(),
    1
  );
  const previousMondayOfMonthStart = previousMonday(startDate);
  const lastDayOfMonth = endOfMonth(startDate);
  const lastDayOfEndWeek = add(lastDayOfMonth, { days: 7 });
  const lastDayOfPrevWeek = add(previousMondayOfMonthStart, { days: 7 });
  // Первая неделя месяца
  const firstMonthWeek = eachWeekOfInterval(
    { start: previousMondayOfMonthStart, end: lastDayOfPrevWeek },
    { weekStartsOn: 1 }
  );
  // Последняя неделя месяца.
  const lastMonthWeek = eachWeekOfInterval(
    { start: lastDayOfMonth, end: lastDayOfEndWeek },
    { weekStartsOn: 1 }
  );
  const firstDatePickerWeek = getDaysInterval([
    firstMonthWeek[0],
    firstMonthWeek[1],
  ]);
  const lastDatePickerWeek = getDaysInterval([
    lastMonthWeek[0],
    lastMonthWeek[1],
  ]);

  return {
    previousWeek: firstDatePickerWeek,
    nextWeek: lastDatePickerWeek,
  };
};
export const getFinalizedDates = (
  initialDate = new Date(),
  month?: number,
  year?: number
) => {
  const { previousWeek, nextWeek } = getPreviousAndNextWeek(
    initialDate,
    month,
    year
  );
  const currentMonth = getCurrentMonth({
    year: year ?? initialDate.getFullYear(),
    month: month ?? initialDate.getMonth(),
  });
  const firstWeekOfCurrentMonth = currentMonth.slice(0, 7);

  const updatedArray: Array<Date> = [];
  firstWeekOfCurrentMonth.forEach((item, idx, arr) => {
    const day = arr[idx];
    if (idx === 0 && day.getDay() !== 1) {
      previousWeek.filter((item) => {
        if (item.getDay() !== 0 && item.getDay() !== 6) {
          updatedArray.push(item);
        }
      });
    }
  });
  const temporaryArray = updatedArray.concat(currentMonth).concat(nextWeek);
  const result = temporaryArray.filter((day, idx, array) => {
    return (
      array.findIndex((value) => {
        return format(value, "MM dd yyyy") === format(day, "MM dd yyyy");
      }) === idx
    );
  });
  return result.sort(compareAsc);
};
export const getFormattedDay = (date: Date) => {
  return format(date, "dd");
};
export const getFormattedDate = (date: Date | string) => {
  const parsedToDate = new Date(date);
  return format(parsedToDate, "dd.MM.yyyy");
};

export const getDatesInRange = (startDate: DateType, endDate: DateType) => {
  if (startDate === null || endDate === null) {
    return;
  }
  return eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });
};

export const getFormattedMonth = (month: Date, locale = "ru-RU") => {
  const formattedMonth = month.toLocaleDateString(locale, {
    month: "long",
    day: undefined,
  });
  return formattedMonth[0].toUpperCase() + formattedMonth.slice(1);
};

export const defaultDaysOfTheWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
