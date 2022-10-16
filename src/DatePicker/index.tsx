import { DatePickerProps, DatePickerStyles } from "./DatePicker.typedef";
import "./datePicker.css";
import {getCurrentMonth, getFormattedDay, getFormattedMonth} from "../utils/dateHandlers"



const DatePicker = <T,>(props: DatePickerProps<T>) => {

    const initialsDates = getCurrentMonth();
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
    width: "400px",
}, body: {
    width: "100%"
}, 
activeDay: {

}
}

    return (
        <div style={defaultStyles.wrapper}>
            <div className="header">
                {getFormattedMonth(initialsDates[0])}
            </div>
            <div className="body">
                {initialsDates.map((item) => {return <button className={"day"}>{getFormattedDay(item)}</button>})}
            </div>
        </div>
    )
}

export default DatePicker;