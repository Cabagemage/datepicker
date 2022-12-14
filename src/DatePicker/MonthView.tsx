import classNames from "classnames";
import {
  DAYS_IDX_LIST,
  DEFAULT_TRANSLATED_DAYS_OF_WEEK,
  formatDate,
  getFormattedShortDayForMonthView,
  isFirstDateEarlierThanSecondOne,
} from "../core";
import type { MouseEventHandler } from "react";
import type {
  CustomizedDate,
  DatePickerMonthViewClassNames,
} from "./DatePicker.typedef";

export type MonthViewProps = {
  month: Array<Date>;
  customMonthClassNames?: Partial<DatePickerMonthViewClassNames>;
  customizedDates?: Array<CustomizedDate>;
  currentMonth: number;
  onSelectDay: (date: Date) => void;
  onHoverDay: MouseEventHandler<HTMLButtonElement>;
  selectedDates: Array<string | Date>;
  minDate?: Date;
  disabledDates?: Array<Date | string>;
  weekendDates?: typeof DAYS_IDX_LIST;
};
export const MonthView = ({
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

  return (
    <div
      className={
        customMonthClassNames !== undefined &&
        customMonthClassNames.monthViewMonthBody !== undefined
          ? customMonthClassNames.monthViewMonthBody
          : "datePicker-body"
      }
    >
      <ul
        className={
          customMonthClassNames !== undefined &&
          customMonthClassNames.monthViewWeekDays !== undefined
            ? customMonthClassNames.monthViewWeekDays
            : "datePicker-weekdays"
        }
      >
        {/* TODO: Think about translations for days of week */}
        {DEFAULT_TRANSLATED_DAYS_OF_WEEK.map((item) => {
          return (
            <li
              className={
                customMonthClassNames !== undefined &&
                customMonthClassNames.monthViewWeekDaysListItem !== undefined
                  ? customMonthClassNames.monthViewWeekDaysListItem
                  : "datePicker-weekdays__day"
              }
              key={item}
            >
              {item}
            </li>
          );
        })}
      </ul>
      {month.map((item) => {
        const isDateNotRelatedToCurrentMonth = item.getMonth() !== currentMonth;
        const customizedDate = customizedDates?.find((customizedDate) => {
          return formatDate(item) === formatDate(customizedDate.date);
        });
        const isDisabled =
          minDate !== undefined
            ? isFirstDateEarlierThanSecondOne(item, minDate)
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
                greyText: isDateNotRelatedToCurrentMonth,
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
