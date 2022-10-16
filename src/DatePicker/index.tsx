import { DatePickerProps, DatePickerStyles } from "./DatePicker.typedef";
import "./datePicker.css";
import {
    defaultDaysOfTheWeek,
    getCurrentMonth, getFinalizedDates,
    getFormattedDay,
    getFormattedMonth,
} from "../utils/dateHandlers"
import {useEffect, useState} from "react";
import classNames from "classnames";


const days = getFinalizedDates()

const DatePicker = <T,>(props: DatePickerProps<T>) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [month, setMonth] = useState(days)
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const initialsDates = getCurrentMonth({year: currentYear, month: currentMonth});
const defaultStyles:DatePickerStyles = {
header: {
width: "100%",
height: "350",
position: "relative",
},
wrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "338px",
    padding: "24px",
    border: "1px solid #1890FF", borderRadius: "16px"
}, body: {
    width: "338px"
}, 
activeDay: {

}
}
const getNextMonth = () => {
    setCurrentMonth((prev) => {return  ++prev} )
   setMonth(getFinalizedDates(new Date(), 10))
    console.info(getFinalizedDates(new Date(), 10))
}
useEffect(() => {
    console.info(getFinalizedDates(new Date(), 10))
}, [currentMonth])

    return (
        <div style={defaultStyles.wrapper}>
            <div className="header">
                <time className={"datepicker-header__time"}>{getFormattedMonth(month[7])} {currentYear}</time>
                <div className={"flex controls"}>
                    <button className={"controller prev"} />
                    <button className={"controller next"} onClick={getNextMonth} />
                </div>
            </div>
            <ul className={"list flex row"}>
                {defaultDaysOfTheWeek.map((item) => {
                    return    <li key={item}>{item}</li>
                })}
            </ul>
            <div className="body">
                {month.map((item) =>
                {
                    const isDateNotRelatedToCurrentMonth = item.getMonth()  !== currentMonth
                    return <button className={classNames("day", {"greyText":isDateNotRelatedToCurrentMonth})} key={item.toString()}>{getFormattedDay(item)}</button>})}
            </div>
        </div>
    )
}

export default DatePicker;