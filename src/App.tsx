import React from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from "./DatePicker"

function App() {
  return (
    <div className="App">
    <DatePicker  onDateClick={console.info} onTogglePrevMonth={console.info} onToggleNextMonth={console.info} activeDate={new Date()} view="month"  />
    </div>
  );
}

export default App;
