import { DatePickerProps, DatePickerStyles } from "./DatePicker.typedef";
import "./datePicker.css";
import {
  defaultDaysOfTheWeek,
  getCurrentMonth,
  getFinalizedDates,
  getFormattedDate,
  getFormattedDay,
  getFormattedMonth,
} from "../utils/dateHandlers";
import { useEffect, useState } from "react";
import classNames from "classnames";

const days = getFinalizedDates();
const defaultStyles: DatePickerStyles = {
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
    border: "1px solid #1890FF",
    borderRadius: "16px",
  },
  body: {
    width: "338px",
  },
  activeDay: {},
};

type DatePickerMode = "single" | "partial" | "interval";
type DatePickerInterval = { start: Date; end: Date };
const DatePicker = <T,>(props: DatePickerProps<T>) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [month, setMonth] = useState(days);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState([
    getFormattedDate(new Date()),
  ]);
  const [currentMode, setCurrentMode] = useState<DatePickerMode>("single");
  const [datesInterval, setDatesInterval] = useState<DatePickerInterval>({
    start: new Date(),
    end: new Date(),
  });
  const isNumberOfMonthIsCorrect = currentMonth >= 0 && currentMonth <= 10;
  const getNextMonth = () => {
    const nextMonth = isNumberOfMonthIsCorrect ? currentMonth + 1 : 0;
    setCurrentMonth(nextMonth);
  };
  const getPrevMonth = () => {
    const prevMonth = isNumberOfMonthIsCorrect ? currentMonth - 1 : 0;
    setCurrentMonth(prevMonth);
  };

  const doubleClickOnDay = () => {
    setCurrentMode("partial");
  };

  const selectDay = (date: Date) => {
    const formattedDate = getFormattedDate(date);
    if (currentMode === "single") {
      setSelectedDates([formattedDate]);
    }
    if (currentMode === "partial") {
      if (selectedDates.includes(formattedDate)) {
        const filteredDates = selectedDates.filter((item) => {
          console.info(item, formattedDate);
          return item !== formattedDate;
        });
        setSelectedDates(filteredDates);
        return;
      }
      setSelectedDates((prev) => {
        return [...prev, formattedDate];
      });
      if (selectedDates.length < 1) {
        setCurrentMode("single");
      }
    }
    if (currentMode === "interval") {
      setSelectedDates((prev) => {
        return [...prev, formattedDate];
      });
    }
  };
  useEffect(() => {
    const month = getFinalizedDates(new Date(), currentMonth);
    console.info(month);
    setMonth(month);
  }, [currentMonth]);

  const downKeyEvent: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    const currentKey = e.key;
    if (currentKey === "Shift") {
      setCurrentMode("interval");
    }
  };
  const hoverEvent: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (currentMode === "interval") {
      selectDay(new Date(e.currentTarget.value));
    }
    console.info(e.currentTarget.value);
  };
  return (
    <div style={defaultStyles.wrapper}>
      <div className="header">
        <time className={"datepicker-header__time"}>
          {getFormattedMonth(month[7])} {currentYear}
        </time>
        <div className={"flex controls"}>
          <button className={"controller prev"} onClick={getPrevMonth} />
          <button className={"controller next"} onClick={getNextMonth} />
        </div>
      </div>
      <ul className={"list flex row"}>
        {defaultDaysOfTheWeek.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <div className="body">
        {month.map((item) => {
          const isDateNotRelatedToCurrentMonth =
            item.getMonth() !== currentMonth;
          return (
            <button
              onClick={() => {
                return selectDay(item);
              }}
              onKeyDown={downKeyEvent}
              value={item.toString()}
              onMouseEnter={(e) => {
                return hoverEvent(e);
              }}
              onDoubleClick={doubleClickOnDay}
              className={classNames(
                "day",
                {
                  greyText: isDateNotRelatedToCurrentMonth,
                },
                { selected: selectedDates.includes(getFormattedDate(item)) }
              )}
              key={item.toString()}
            >
              {getFormattedDay(item)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
