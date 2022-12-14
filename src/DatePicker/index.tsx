import { DatePickerInterval, DatePickerProps } from "./DatePicker.typedef";
import "./datePicker.css";
import {
  getMonthCalendarViewDates,
  getFormattedMonthToLocale,
  add,
  getMonthsOfYear,
  subtract,
  getDatesInRange,
  formatDate,
  getMonday,
  getSunday,
} from "../core/handlers";
import {
  JANUARY_ORDINAL_NUMBER,
  MONTHS_IDX_LIST,
  ONE_MONTH,
  ONE_YEAR,
  START_OF_NEW_MONTH_IDX,
  DECEMBER_ORDINAL_NUMBER,
} from "../core/constants";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { MonthView } from "./MonthView";
import YearView from "./YearView";

const INITIAL_MONTH_DATES = getMonthCalendarViewDates({
  initialDate: new Date(),
});

const DatePicker = ({
  locale,
  mode = "single",
  onDateClick,
  customizedDates,
  customizationClassNames,
  onMonthClick,
  ...props
}: DatePickerProps) => {
  const defaultLocale = locale === undefined ? "ru-RU" : locale;
  const [view, setView] = useState(props.view);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(new Date().getMonth());
  const [month, setMonth] = useState(INITIAL_MONTH_DATES);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Array<string | Date>>([]);
  const [datesInterval, setDatesInterval] = useState<DatePickerInterval>({
    start: null,
    end: null,
  });
  const yearMonths = getMonthsOfYear(currentDate);
  const changeYear = (action: "add" | "subtract") => {
    if (action === "add") {
      setCurrentDate((prev) => {
        return add({ date: prev, type: "year", count: 1 });
      });
    }
    if (action === "subtract") {
      setCurrentDate((prev) => {
        return subtract({ date: prev, type: "year", count: ONE_YEAR });
      });
    }
  };
  const toNextUnitNavAction = () => {
    if (view === "month") {
      const nextMonth = currentMonthIdx + ONE_MONTH;
      const isCurrentMonthIsDecember = currentMonthIdx === 11;
      if (MONTHS_IDX_LIST.includes(nextMonth)) {
        setCurrentMonthIdx(nextMonth);
      }
      if (isCurrentMonthIsDecember) {
        changeYear("add");
        setCurrentMonthIdx(JANUARY_ORDINAL_NUMBER);
      }
    }
    if (view === "year") {
      changeYear("add");
    }
  };

  const toPrevUnitNavAction = () => {
    if (view === "month") {
      const prevMonth = currentMonthIdx - ONE_MONTH;
      if (MONTHS_IDX_LIST.includes(prevMonth)) {
        setCurrentMonthIdx(prevMonth);
      }
      const isCurrentMonthIdxIsJanuary = currentMonthIdx === 0;
      if (isCurrentMonthIdxIsJanuary) {
        changeYear("subtract");
        setCurrentMonthIdx(DECEMBER_ORDINAL_NUMBER);
      }
    }
    if (view === "year") {
      changeYear("subtract");
    }
  };

  const selectDayForInterval = (date: Date) => {
    const isDateIncluded = selectedDates.includes(date);
    if (datesInterval.start && datesInterval.end && isDateIncluded) {
      setDatesInterval({ start: null, end: null });
      setSelectedDates([]);
    }
    if (datesInterval.start && datesInterval.end && !isDateIncluded) {
      setDatesInterval({ start: date, end: null });
      setSelectedDates([date]);
    }
    if (datesInterval.start === null) {
      setDatesInterval((prev) => {
        return { ...prev, start: date };
      });
      setSelectedDates([date]);
      onDateClick({ value: [date] });
    }

    if (datesInterval.start !== null && datesInterval.end === null) {
      setDatesInterval((prev) => {
        return { ...prev, end: date };
      });

      const start =
        new Date(datesInterval.start) < date ? datesInterval.start : date;
      const end =
        new Date(date) > datesInterval.start ? date : datesInterval.start;
      onDateClick({ value: [start, end] });
    }
  };
  const selectDayForWeek = (date: Date) => {
    const firstDate = getMonday(date);
    const lastDate = getSunday(date);
    setDatesInterval({
      start: firstDate,
      end: lastDate,
    });
    const formattedDates = getDatesInRange(firstDate, lastDate).map((item) => {
      return formatDate(item);
    });
    setSelectedDates(formattedDates);
    onDateClick({
      value: [firstDate, lastDate],
    });
  };
  const selectSingleDate = (date: Date, formattedDate: string) => {
    setSelectedDates([formattedDate]);
    onDateClick({ value: date });
  };
  const mappedSelectedDatesToFormattedValue = selectedDates.map((item) => {
    return formatDate(new Date(item));
  });
  const selectDayForPartial = (date: Date) => {
    if (mappedSelectedDatesToFormattedValue.includes(formatDate(date))) {
      const filteredDates = selectedDates.filter((item) => {
        return formatDate(new Date(date)) !== formatDate(new Date(item));
      });
      setSelectedDates(filteredDates);
      return;
    }
    setSelectedDates((prev) => {
      return [...prev, date];
    });
    const mappedSelectedDatesToRawDates = selectedDates.map((item) => {
      return new Date(item);
    });
    onDateClick({ value: [...mappedSelectedDatesToRawDates, new Date(date)] });
  };

  const selectDay = (date: Date) => {
    const formattedDate = formatDate(date);
    if (mode === "single") {
      selectSingleDate(date, formattedDate);
    }
    if (mode === "partial") {
      selectDayForPartial(date);
    }
    if (mode === "interval") {
      selectDayForInterval(date);
    }
    if (mode === "week") {
      selectDayForWeek(date);
    }
  };
  useEffect(() => {
    const month = getMonthCalendarViewDates({
      initialDate: currentDate,
      month: currentMonthIdx,
    });
    setMonth(month);
  }, [currentMonthIdx, currentDate]);

  const hoverEvent: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (datesInterval.start !== null && datesInterval.end !== null) {
      return;
    }
    const lastTriggeredDate = new Date(e.currentTarget.value);
    if (mode === "interval" && datesInterval.start !== null) {
      const start =
        new Date(datesInterval.start) < lastTriggeredDate
          ? datesInterval.start
          : lastTriggeredDate;
      const end =
        new Date(lastTriggeredDate) > datesInterval.start
          ? lastTriggeredDate
          : datesInterval.start;
      const formattedDates = getDatesInRange(start, end).map((item) => {
        return formatDate(item);
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
    if (onMonthClick) {
      onMonthClick(date);
    }
    const daysOfMonth = getMonthCalendarViewDates({ initialDate: date });
    const newMonthIdx = new Date(
      daysOfMonth[START_OF_NEW_MONTH_IDX]
    ).getMonth();

    setMonth(daysOfMonth);
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
            onClick={toPrevUnitNavAction}
          />
          <button
            className={
              "datePicker__controller datePicker__controller_type_next"
            }
            onClick={toNextUnitNavAction}
          />
        </div>
      </div>
      {view === "month" && (
        <MonthView
          month={month}
          customizedDates={customizedDates}
          currentMonth={currentMonthIdx}
          disabledDates={[]}
          selectedDates={selectedDates}
          onSelectDay={selectDay}
          onHoverDay={hoverEvent}
        />
      )}
      {view === "year" && (
        <YearView
          months={yearMonths}
          selectedDates={selectedDates}
          minDate={new Date("nov")}
          onMonthClick={clickMonth}
          defaultLocale={"ru-RU"}
        />
      )}
    </div>
  );
};

export default DatePicker;
