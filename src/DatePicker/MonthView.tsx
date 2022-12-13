import classNames from "classnames";
import {
  DAYS_IDX_LIST,
  DEFAULT_TRANSLATED_DAYS_OF_WEEK,
  formatDate,
  getFormattedDateToLocale,
  getFormattedShortDayForMonthView,
  isFirstDateEarlierThanSecondOne,
} from "../core";
import { MouseEventHandler } from "react";
import { CustomizedDate } from "./DatePicker.typedef";

export type MonthViewProps = {
  className?: HTMLDivElement["className"];
  month: Array<Date>;
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
  className,
  minDate,
  disabledDates,
  weekendDates,
}: MonthViewProps) => {
  const mappedBannedDates = disabledDates?.map((item) => {
    return getFormattedDateToLocale(item);
  });
  const formattedSelectedDates = selectedDates.map((item) => {
    return formatDate(new Date(item));
  });
  return (
    <div className={className}>
      <ul className={"datePicker-weekdays"}>
        {/*TODO: Подумать насчет перевода дней недели */}
        {DEFAULT_TRANSLATED_DAYS_OF_WEEK.map((item) => {
          return (
            <li className={"datePicker-weekdays__day"} key={item}>
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
        const isDateDisabled =
          mappedBannedDates !== undefined &&
          mappedBannedDates.includes(getFormattedDateToLocale(item));
        const isWeekendDay =
          weekendDates !== undefined && weekendDates.includes(item.getDay());
        const selectedClassName =
          customizedDate !== undefined ? customizedDate.className : "";
        return (
          <button
            onClick={() => {
              return onSelectDay(item);
            }}
            value={item.toString()}
            onMouseEnter={(e) => {
              return onHoverDay(e);
            }}
            className={classNames(
              `datePicker-body__day`,
              selectedClassName,
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
