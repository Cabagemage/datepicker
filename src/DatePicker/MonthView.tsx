import classNames from "classnames";
import {
  add,
  DAYS_IDX_LIST,
  formatDate,
  getDatesInRange,
  getFormattedShortDayForMonthView,
  getMonday,
  getSunday,
  isFirstDateEarlierThanSecondOne,
} from "../core";
import type { MouseEventHandler } from "react";
import type {
  CustomizedDate,
  DatePickerMonthViewClassNames,
  MinDate,
} from "./DatePicker.typedef";
import { formatDayOfWeek } from "../core/handlers/formatDayOfWeek/formatDayOfWeek";

export type MonthViewProps = {
  locale: Intl.LocalesArgument;
  month: Array<Date>;
  customMonthClassNames?: Partial<DatePickerMonthViewClassNames>;
  customizedDates?: Array<CustomizedDate>;
  currentMonth: number;
  onSelectDay: (date: Date) => void;
  onHoverDay: MouseEventHandler<HTMLButtonElement>;
  selectedDates: Array<string | Date>;
  minDate?: MinDate;
  disabledDates?: Array<Date | string>;
  weekendDates?: typeof DAYS_IDX_LIST;
};

const daysOfWeek = () => {
  const startDate = getMonday(new Date());
  const endDate = getSunday(new Date());
  const dates = getDatesInRange(startDate, endDate);
  return dates;
};
const week = daysOfWeek();

export const MonthView = ({
  locale,
  month,
  currentMonth,
  selectedDates,
  onSelectDay,
  customizedDates,
  onHoverDay,
  customMonthClassNames,
  minDate,
  disabledDates,
  weekendDates,
}: MonthViewProps) => {
  const mappedBannedDates = disabledDates?.map((item) => {
    return formatDate(new Date(item));
  });

  const formattedSelectedDates = selectedDates.map((item) => {
    return formatDate(new Date(item));
  });

  const monthDayCellClassName = customMonthClassNames?.monthViewDay
    ? customMonthClassNames.monthViewDay
    : `datePicker-body__day`;

  const monthDayCellActiveClassName =
    customMonthClassNames?.monthViewDayActive !== undefined
      ? customMonthClassNames.monthViewDayActive
      : "datePicker__selectedDate";

  const monthDayCellDisabledClassName =
    customMonthClassNames?.monthViewDisabledDate
      ? customMonthClassNames.monthViewDisabledDate
      : "datePicker-body__day_disabled";

  const monthDayCellTextClassName = customMonthClassNames?.monthViewDayDayText
    ? customMonthClassNames.monthViewDayDayText
    : "datePicker-body__day-text";

  const defaultMonthDayCellBackgroundClassName =
    customMonthClassNames?.monthViewDayDefaultBackgroundClassName
      ? customMonthClassNames.monthViewDayDefaultBackgroundClassName
      : "datePicker-body__day_transparent";
  const monthViewMonthBodyClassName =
    customMonthClassNames?.monthViewMonthBody !== undefined
      ? customMonthClassNames.monthViewMonthBody
      : "datePicker-body";
  const monthViewWeekDaysClassName = customMonthClassNames?.monthViewWeekDays
    ? customMonthClassNames.monthViewWeekDays
    : "datePicker-weekdays";
  const monthViewWeekDaysListItemClassName =
    customMonthClassNames?.monthViewWeekDaysListItem
      ? customMonthClassNames.monthViewWeekDaysListItem
      : "datePicker-weekdays__day";

  return (
    <div className={monthViewMonthBodyClassName}>
      <ul className={monthViewWeekDaysClassName}>
        {week.map((item, idx) => {
          return (
            <li className={monthViewWeekDaysListItemClassName} key={idx}>
              {formatDayOfWeek(item, locale)}
            </li>
          );
        })}
      </ul>
      {month.map((item) => {
        const isDateNotRelatedToCurrentMonth = item.getMonth() !== currentMonth;
        const customizedDate = customizedDates?.find((customizedDate) => {
          return formatDate(item) === formatDate(customizedDate.date);
        });
        const endDate =
          minDate?.options?.isPassedDateIncluded === true
            ? add({
                date: minDate?.date ?? new Date(),
                type: "day",
                count: 1,
              })
            : minDate?.date ?? new Date();

        const isDisabled =
          minDate !== undefined
            ? isFirstDateEarlierThanSecondOne(item, endDate)
            : false;
        const isSelected = formattedSelectedDates.includes(formatDate(item));
        const isCustomizedDateIsDisabled =
          customizedDate !== undefined ? customizedDate.isDisabled : false;
        const isDateDisabled =
          (mappedBannedDates !== undefined &&
            mappedBannedDates.includes(formatDate(item))) ||
          isCustomizedDateIsDisabled;
        const isWeekendDay =
          weekendDates !== undefined && weekendDates.includes(item.getDay());
        const customizedDateClassName =
          customizedDate !== undefined ? customizedDate.className : "";

        return (
          <button
            onClick={() => {
              return onSelectDay(item);
            }}
            title={
              customizedDate !== undefined ? customizedDate.textOnHover : ""
            }
            value={item.toString()}
            onMouseEnter={(e) => {
              return onHoverDay(e);
            }}
            className={classNames(
              [monthDayCellClassName],
              customizedDateClassName,
              {
                [defaultMonthDayCellBackgroundClassName]:
                  customizedDate === undefined,
              },
              {
                "datePicker__inactive-text": isDateNotRelatedToCurrentMonth,
              },
              {
                [monthDayCellActiveClassName]:
                  isSelected && !isDateDisabled && !isWeekendDay,
                [monthDayCellDisabledClassName]:
                  isDisabled || isDateDisabled || isWeekendDay,
              }
            )}
            key={item.toString()}
            disabled={isDisabled || isDateDisabled || isWeekendDay}
          >
            <span className={monthDayCellTextClassName}>
              {getFormattedShortDayForMonthView(item)}
            </span>
          </button>
        );
      })}
    </div>
  );
};
