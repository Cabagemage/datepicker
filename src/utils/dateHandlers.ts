import format from "date-fns/format";
import add from "date-fns/add";
import sub from "date-fns/sub";

type GetCurrentMonth = ({
    year,
    month,
}:{year?: number, month?: number}) => Array<Date>;

const availableMonths = [0 ,1 , 2 , 3 , 4 , 5,6 , 7 , 8 , 9 , 10 , 11];

export const getCurrentMonth:GetCurrentMonth = ({year = new Date().getFullYear(), month = new Date().getMonth()}) => {
    if(!availableMonths.includes(month)){
        throw new Error("Please, add month between 0 - 11")
    }
    const date = new Date(year, month, 1);

    const dates = [];
  
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
}
export const getPreviousAndNextWeek = (initialDate = new Date(), month?:number, year?: number) => {
    const firstDay = new Date(year ?? initialDate.getFullYear(), month ?? initialDate.getMonth(), 1);
    const lastDayOfMonth = new Date(year ?? initialDate.getFullYear(),  month ??initialDate.getMonth()+1, 0);
    const previousWeek = [];
    const nextWeek = [];
    for(let i = 0; i <= 7; i++){
        const result = add(lastDayOfMonth, {days: i});
        nextWeek.push(result)
    }
    for(let i = 0; i <=7; i++){
        const result = sub(firstDay, {days: i})
        previousWeek.push(result)
    }
    return {
        previousWeek: previousWeek.reverse(), nextWeek: nextWeek
    }
}
export const getFinalizedDates = (initialDate = new Date(), month?:number, year?:number) => {
    const {previousWeek, nextWeek} = getPreviousAndNextWeek(initialDate, month, year);
    const currentMonth = getCurrentMonth({year: year ?? initialDate.getFullYear(), month:  month ?? initialDate.getMonth()})
    const firstWeekOfCurrentMonth = currentMonth.slice(0,7);

    const updatedArray:Array<Date> = [];
    firstWeekOfCurrentMonth.forEach((item, idx, arr) => {
        const day = arr[idx];
        if(idx === 0 && day.getDay() !== 1){
            previousWeek.filter((item) => {
                if(item.getDay() !== 0 && item.getDay() !== 6 ){
                    updatedArray.push(item)
                }
            })
        }
    })
    const temporaryArray = updatedArray.concat(currentMonth).concat(nextWeek)
    const result = temporaryArray.filter((day, idx, array) => {
        return (
            array.findIndex((value) => {
                return format(value, "MM dd yyyy") === format(day, "MM dd yyyy");
            }) === idx
        );
    });
    return     result

}
export const getFormattedDay = (date: Date) => {
return format(date, "dd")
}

export const getFormattedMonth = (month: Date, locale = "ru-RU") => {
    const formattedMonth = month.toLocaleDateString (locale, {month: "long", day: undefined })
    return formattedMonth[0].toUpperCase() + formattedMonth.slice(1)
}

export const defaultDaysOfTheWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]