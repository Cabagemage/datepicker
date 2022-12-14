import React, { useState } from "react";
import "./App.css";
import DatePicker from "./DatePicker";
import { CustomizedDate } from "./DatePicker/DatePicker.typedef";

function App() {
  const [show, setShow] = useState(false);

  const customizedDates: Array<CustomizedDate> = [
    {
      date: new Date(),
      className: "selected__test",
    },
    {
      date: new Date("Sat Dec 17 2022 00:00:00 GMT+0300 (Moscow Standard Time"),
      className: "selected__test",
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
  const change = (args: any) => {
    console.info(args);
  };
  const getShow = () => {
    setShow(true);
  };
  return (
    <div className="App">
      <button onClick={getShow}>НАЖМИ МЕНЯ</button>
      {show && (
        <DatePicker
          locale={"ru-RU"}
          customizedDates={customizedDates}
          onDateClick={change}
          defaultDate={new Date()}
          onTogglePrevMonth={console.info}
          onToggleNextMonth={console.info}
          activeDate={new Date()}
          view="month"
          mode={"interval"}
        />
      )}
    </div>
  );
}

export default App;
