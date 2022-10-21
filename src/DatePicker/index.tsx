import { DatePickerInterval, DatePickerProps } from "./DatePicker.typedef";
import "./datePicker.css";
import {
  DECEMBER_NUMBER,
  getDatesInRange,
  getFinalizedDates,
  getFormattedDateToLocale,
  getFormattedMonthToLocale,
  getMonthsOfYear,
  JANUARY_NUMBER,
  MONTHS_IDX_LIST,
  ONE_MONTH,
  ONE_YEAR,
  START_OF_NEW_MONTH_IDX,
} from "../utils";
import { useEffect, useMemo, useState } from "react";
import add from "date-fns/add";
import { sub } from "date-fns";
import { MonthView } from "./MonthView";
import { isFirstDateEarlierThanSecondOne } from "../utils/handlers/dateHandlers";
const INITIAL_MONTH_DATES = getFinalizedDates({
  initialDate: new Date(),
});
const DatePicker = <T,>({
  locale,
  mode = "single",
  ...props
}: DatePickerProps<T>) => {
  const defaultLocale = locale === undefined ? "en-US" : locale;
  const [view, setView] = useState(props.view);

  const [currentMonthIdx, setCurrentMonthIdx] = useState(new Date().getMonth());
  const [month, setMonth] = useState(INITIAL_MONTH_DATES);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Array<string | Date>>([
    getFormattedDateToLocale(currentDate),
  ]);
  const [datesInterval, setDatesInterval] = useState<DatePickerInterval>({
    start: null,
    end: null,
  });
  const yearMonths = getMonthsOfYear(currentDate);

  const getNextMonth = () => {
    const nextMonth = currentMonthIdx + 1;
    if (MONTHS_IDX_LIST.includes(nextMonth)) {
      setCurrentMonthIdx(nextMonth);
      return;
    }
    setCurrentDate((prev) => {
      return add(prev, { years: ONE_YEAR });
    });
    setCurrentMonthIdx(JANUARY_NUMBER);
  };

  const getPrevMonth = () => {
    const prevMonth = currentMonthIdx - ONE_MONTH;

    if (MONTHS_IDX_LIST.includes(prevMonth)) {
      setCurrentMonthIdx(prevMonth);
      return;
    }
    setCurrentDate((prev) => {
      return sub(prev, { years: ONE_YEAR });
    });
    setCurrentMonthIdx(DECEMBER_NUMBER);
  };

  const selectDay = (date: Date) => {
    const formattedDate = getFormattedDateToLocale(date);
    if (mode === "single") {
      setSelectedDates([formattedDate]);
    }
    if (mode === "partial") {
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
    }
    if (mode === "interval") {
      if (datesInterval.start === null) {
        setDatesInterval((prev) => {
          return { ...prev, start: date };
        });
        setSelectedDates([date]);
      }
      if (datesInterval.start !== null && datesInterval.end === null) {
        setDatesInterval((prev) => {
          return { ...prev, end: date };
        });
      }
      if (datesInterval.end && datesInterval.start) {
        console.info("boba");
        setDatesInterval((prev) => {
          return { ...prev, start: date, end: null };
        });
      }
    }
  };
  useEffect(() => {
    const month = getFinalizedDates({
      initialDate: currentDate,
      month: currentMonthIdx,
    });
    setMonth(month);
  }, [currentMonthIdx, currentDate]);

  const hoverEvent: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (datesInterval.start !== null && datesInterval.end !== null) {
      return;
    }

    const lastTriggeredDate = new Date(e.currentTarget.value);

    if (mode === "interval" && datesInterval.start !== null) {
      const formattedDates = getDatesInRange(
        datesInterval.start,
        lastTriggeredDate
      ).map((item) => {
        return getFormattedDateToLocale(item);
      });
      setSelectedDates(formattedDates);
    }
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
  const clickMonth = (date: Date) => {
    const daysOfMonth = getFinalizedDates({ initialDate: date });
    setMonth(daysOfMonth);
    const newMonthIdx = new Date(
      daysOfMonth[START_OF_NEW_MONTH_IDX]
    ).getMonth();
    setCurrentMonthIdx(newMonthIdx);
    setView("month");
  };
  const headerViewTogglerText = useMemo(() => {
    switch (view) {
      case "month":
        return `${getFormattedMonthToLocale({
          month: month[START_OF_NEW_MONTH_IDX],
          locale: defaultLocale,
        })} ${currentDate.getFullYear()}`;
      case "year":
        return `${currentDate.getFullYear()}`;
      default:
        return "test";
    }
  }, [currentDate, view, month, defaultLocale]);

  return (
    <div className={"datePicker-wrapper"}>
      <div className="datePicker-header">
        <button
          className={"datePicker-header__togler"}
          onClick={changeCurrentCalendarView}
        >
          <time className={"datepicker-header__time"}>
            {headerViewTogglerText}
          </time>
        </button>

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
      {view === "month" && (
        <MonthView
          month={month}
          className="datePicker-body"
          currentMonth={currentMonthIdx}
          weekendDates={[6, 0]}
          selectedDates={selectedDates}
          onSelectDay={selectDay}
          onHoverDay={hoverEvent}
        />
      )}
      {view === "year" && (
        <div className={"datePicker-body"}>
          {yearMonths.map((item) => {
            return (
              <button
                onClick={() => {
                  return clickMonth(item);
                }}
                className={"datePicker-body__month-cell"}
                key={item.toString()}
              >
                {getFormattedMonthToLocale({
                  month: item,
                  locale: defaultLocale,
                  format: "long",
                })}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
