import {getFirstDateOfMonth} from "../getFirstDateOfMonth";
import {getMonday} from "../getMonday";
import {subtract} from "../subtract";
import {getDatesInRange} from "../getDatesInRange";
import {GetDatesOptions} from "../../types/commonTypes";

export const getFirstWeekOfMonth = ({initialDate = new Date(), month, year}:GetDatesOptions):Array<Date> => {
    const startDate = new Date(
        year ?? initialDate.getFullYear(),
        month ?? initialDate.getMonth(),
        1
    );
    const firstDayOfMonth = getFirstDateOfMonth(startDate);
    const mondayFromPreviousMonthOrCurrentMonth = getMonday(firstDayOfMonth);
    const nextMonthAfterPreviousMonthOrCurrentMonthMonday = getMonday(
        new Date(startDate?.getFullYear(), startDate?.getMonth(), 7)
    );
    // Если понедельник совпадает с первым числом месяца, то мы получаем последний понедельник предыдущего месяца.
    const finalStartMonday =
        mondayFromPreviousMonthOrCurrentMonth.toUTCString() ===
        nextMonthAfterPreviousMonthOrCurrentMonthMonday.toUTCString()
            ? getMonday(subtract({ date: firstDayOfMonth, count: 7, type: "day" }))
            : mondayFromPreviousMonthOrCurrentMonth;

    const week = getDatesInRange(
        finalStartMonday,
        nextMonthAfterPreviousMonthOrCurrentMonthMonday
    );


    return week;
};