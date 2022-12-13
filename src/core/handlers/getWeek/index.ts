export const getWeek = (date: Date) => {
  const millisecondsInDay = 86400000;
  const yearStart = +new Date(date.getFullYear(), 0, 1);
  const today = +new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayOfYear: number =
    (today - yearStart + millisecondsInDay) / millisecondsInDay;
  return Math.ceil(dayOfYear / 7);
};
