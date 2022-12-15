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

const DatePicker = ({
  locale,
  mode = "single",
  minDate,
  disabledDates,
  onYearClick,
  onTogglePrevMonth,
  onToggleNextMonth,
  weekendDates,
  onDateClick,
  customizedDates,
  customizationClassNames,
  defaultSelectedDates,
  date,
  defaultSelectedInterval,
  onMonthClick,
  view,
  changeCalendarView,
}: DatePickerProps) => {
  const defaultLocale = locale === undefined ? "ru-RU" : locale;
  const INITIAL_MONTH_DATES = getMonthCalendarViewDates({
    initialDate: date,
    year: date.getFullYear(),
    month: date.getMonth(),
  });

  const [currentMonthIdx, setCurrentMonthIdx] = useState(date.getMonth());
  const [month, setMonth] = useState(INITIAL_MONTH_DATES);
  const [currentDate, setCurrentDate] = useState(date);
  const [selectedDates, setSelectedDates] = useState<Array<string | Date>>(
    defaultSelectedDates ?? [date]
  );
  const [datesInterval, setDatesInterval] = useState<DatePickerInterval>(
    defaultSelectedInterval ?? {
      start: null,
      end: null,
    }
  );

  const yearMonths = getMonthsOfYear(currentDate);
  const changeYear = (action: "add" | "subtract") => {
    if (action === "add") {
      setCurrentDate((prev) => {
        return add({ date: prev, type: "year", count: ONE_YEAR });
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
      const isCurrentMonthIsDecember =
        currentMonthIdx === DECEMBER_ORDINAL_NUMBER;
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
      const isCurrentMonthIdxIsJanuary =
        currentMonthIdx === JANUARY_ORDINAL_NUMBER;
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
          onClick={changeCalendarView}
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
          locale={defaultLocale}
          month={month}
          customizedDates={customizedDates}
          currentMonth={currentMonthIdx}
          disabledDates={disabledDates}
          weekendDates={weekendDates}
          minDate={minDate}
          customMonthClassNames={customizationClassNames?.month}
          selectedDates={selectedDates}
          onSelectDay={selectDay}
          onHoverDay={hoverEvent}
        />
      )}
      {view === "year" && (
        <YearView
          months={yearMonths}
          selectedDates={selectedDates}
          minDate={new Date("2022.11.15")}
          onMonthClick={clickMonth}
          defaultLocale={defaultLocale}
        />
      )}
    </div>
  );
};

export default DatePicker;
