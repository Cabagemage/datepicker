import React from "react";
import "./App.css";
import DatePicker from "./DatePicker";

function App() {
  return (
    <div className="App">
      <DatePicker
        locale={"ru-RU"}
        onChange={console.info}
        onDateClick={console.info}
        onTogglePrevMonth={console.info}
        onToggleNextMonth={console.info}
        activeDate={new Date()}
        view="month"
        mode={"interval"}
      />
    </div>
  );
}

export default App;
