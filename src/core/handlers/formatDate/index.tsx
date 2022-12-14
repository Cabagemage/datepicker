// role of this function - format dates for tests & inner usage to get equality of passed dates.
// as example, it's using in month view to get active dates.
export const formatDate = (date: Date, separator = "-"): string => {
  const newDate = new Date(date);
  let month = "" + (newDate.getMonth() + 1);
  let day = "" + newDate.getDate();
  const year = newDate.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join(separator);
};
