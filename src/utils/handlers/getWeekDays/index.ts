import { getMonday } from "../getMonday";
import { getSunday } from "../getSunday";
import { getDatesInRange } from "../getDatesInRange";

export const getWeekDays = (date: Date) => {
  const beginningOfWeek = getMonday(date);
  const weekEnd = getSunday(date);
  return getDatesInRange(beginningOfWeek, weekEnd);
};
