import format from "date-fns/format";
export const getCurrentMonth = (year = new Date().getFullYear(), month = new Date().getMonth()) => {
    const date = new Date(year, month, 1);

    const dates = [];
  
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
}

export const getFormattedDay = (date: Date) => {
return format(date, "dd")
}

export const getFormattedMonth = (month: Date, locale = "ru-RU") => {
return month.toLocaleDateString (locale, {month: "long", day: undefined })
}