import React, { useState } from "react";
import "./App.css";
import DatePicker from "./DatePicker";
import {
  CalendarViews,
  CustomizedDate,
  DatePickerChangeHandler,
} from "./DatePicker/DatePicker.typedef";

function App() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarViews>("month");
  const customizedDates: Array<CustomizedDate> = [
    {
      date: new Date(),
      className: "selected__test",
      textOnHover: "Мастер работает в другом офисе",
    },
    {
      date: new Date("Sat Dec 17 2022 00:00:00 GMT+0300 (Moscow Standard Time"),
      className: "selected__test",
      textOnHover: "Мастер не работает в ето время",
    },
    {
      date: new Date("Sat Dec 16 2022 00:00:00 GMT+0300 (Moscow Standard Time"),
      className: "selected__test2",
    },
    {
      date: new Date("Sat Dec 15 2022 00:00:00 GMT+0300 (Moscow Standard Time"),
      className: "selected__test2",
    },
    {
      date: new Date("Sat Dec 13 2022 00:00:00 GMT+0300 (Moscow Standard Time"),
      className: "selected__test2",
    },
  ];
  const change: DatePickerChangeHandler = (args) => {
    if (!Array.isArray(args.value)) {
      setDate(args.value);
    }
  };
  const getShow = () => {
    setShow(!show);
  };
  const changeCurrentCalendarView = () => {
    switch (view) {
      case "month":
        return setView("year");
      case "year":
        return setView("years");
      default:
        return setView("month");
    }
  };
  const changeViewToMonth = () => {
    setView("month");
  };
  return (
    <div className="App">
      <button onClick={getShow}>НАЖМИ МЕНЯ</button>
      {show && (
        <DatePicker
          date={date}
          changeCalendarView={changeCurrentCalendarView}
          locale={"ru-RU"}
          customizedDates={customizedDates}
          onDateClick={change}
          onMonthClick={changeViewToMonth}
          minDate={{
            date: new Date(),
            options: { isPassedDateIncluded: false },
          }}
          onTogglePrevMonth={console.info}
          onToggleNextMonth={console.info}
          view={view}
          mode={"week"}
        />
      )}
    </div>
  );
}

export default App;
