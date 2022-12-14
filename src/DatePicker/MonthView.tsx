import classNames from "classnames";
import {
  DAYS_IDX_LIST,
  DEFAULT_TRANSLATED_DAYS_OF_WEEK,
  formatDate,
  getFormattedShortDayForMonthView,
  isFirstDateEarlierThanSecondOne,
} from "../core";
import { MouseEventHandler } from "react";
import {
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

  return (
    <div
      className={
        customMonthClassNames !== undefined
          ? customMonthClassNames.monthViewMonthBody
          : "datePicker-body"
      }
    >
      <ul
        className={
          customMonthClassNames !== undefined
            ? customMonthClassNames.monthViewWeekDays
            : "datePicker-weekdays"
        }
      >
        {/* TODO: Think about translations for days of week */}
        {DEFAULT_TRANSLATED_DAYS_OF_WEEK.map((item) => {
          return (
            <li
              className={
                customMonthClassNames !== undefined
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
              `datePicker-body__day`,
              customizedDateClassName,
              {
                "datePicker-body__day_transparent":
                  customizedDate === undefined,
              },
              {
                greyText: isDateNotRelatedToCurrentMonth,
              },
              {
                selected: isSelected && !isDateDisabled && !isWeekendDay,
                "datePicker-body__day_disabled":
                  isDisabled || isDateDisabled || isWeekendDay,
              }
            )}
            key={item.toString()}
            disabled={isDisabled || isDateDisabled || isWeekendDay}
          >
            <span className={"datePicker-body__day-text"}>
              {getFormattedShortDayForMonthView(item)}
            </span>
          </button>
        );
      })}
    </div>
  );
};
