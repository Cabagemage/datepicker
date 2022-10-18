import { DatePickerProps, DatePickerStyles } from "./DatePicker.typedef";
import "./datePicker.css";
import {
  defaultDaysOfTheWeek,
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
type DatePickerInterval = { start: Date | null; end: Date | null };
const DatePicker = <T,>({ locale, ...props }: DatePickerProps<T>) => {
  const defaultLocale = locale === undefined ? "en-US" : locale;

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [month, setMonth] = useState(days);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState([
    getFormattedDate(new Date()),
  ]);
  const [currentMode, setCurrentMode] = useState<DatePickerMode>("single");
  const [datesInterval, setDatesInterval] = useState<DatePickerInterval>({
    start: null,
    end: null,
  });
  const isNumberOfMonthIsCorrect = currentMonth >= 0 && currentMonth <= 11;
  const getNextMonth = () => {
    const nextMonth = isNumberOfMonthIsCorrect ? currentMonth + 1 : 0;
    setCurrentMonth(nextMonth);
  };
  const getPrevMonth = () => {
    const prevMonth = isNumberOfMonthIsCorrect ? currentMonth - 1 : 0;

    if (currentMonth) {
      console.info(prevMonth);
      return;
    }
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
      setInterval((prev) => {
        return {
          ...prev,
        };
      });
      selectDay(new Date(e.currentTarget.value));
    }
    console.info(e.currentTarget.value);
  };

  return (
    <div className={"datePicker-wrapper"}>
      <div className="datePicker-header">
        <time className={"datepicker-header__time"}>
          {getFormattedMonth(month[7], defaultLocale)} {currentYear}
        </time>
        <div className={"datePicker__controls"}>
          <button
            className={
              "datePicker__controller datePicker__controller_type_prev"
            }
            onClick={getPrevMonth}
          />
          <button
            className={
              "datePicker__controller datePicker__controller_type_next"
            }
            onClick={getNextMonth}
          />
        </div>
      </div>
      <ul className={"datePicker-weekdays"}>
        {defaultDaysOfTheWeek.map((item) => {
          return (
            <li className={"datePicker-weekdays__day"} key={item}>
              {item}
            </li>
          );
        })}
      </ul>
      <div className="datePicker-body">
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
                "datePicker-body__day",
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
