import React, { useState } from "react";
import "./App.css";
import DatePicker from "./DatePicker";

function App() {
  const [show, setShow] = useState(false);

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
          onChange={change}
          onDateClick={console.info}
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
