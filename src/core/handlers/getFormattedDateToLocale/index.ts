import { GetFormattedDayToLocale } from "../../types/commonTypes";

export const getFormattedDateToLocale: GetFormattedDayToLocale = (date) => {
  const parsedToDate = new Date(date);
  return parsedToDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
