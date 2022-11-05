import classNames from "classnames";
import {
  DAYS_IDX_LIST,
  DEFAULT_TRANSLATED_DAYS_OF_WEEK,
  getFormattedDateToLocale,
  getFormattedShortDay,
} from "../utils";
import { MouseEventHandler } from "react";
import { isFirstDateEarlierThanSecondOne } from "../utils/handlers/dateHandlers";

export type MonthViewProps = {
  className?: HTMLDivElement["className"];
  month: Array<Date>;
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
  onHoverDay,
  className,
  minDate,
  disabledDates,
  weekendDates,
}: MonthViewProps) => {
  const mappedBannedDates = disabledDates?.map((item) => {
    return getFormattedDateToLocale(item);
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
        const isDisabled =
          minDate !== undefined
            ? isFirstDateEarlierThanSecondOne(item, minDate)
            : false;
        const isSelected = selectedDates.includes(
          getFormattedDateToLocale(item)
        );
        const isDateDisabled =
          mappedBannedDates !== undefined &&
          mappedBannedDates.includes(getFormattedDateToLocale(item));
        const isWeekendDay =
          weekendDates !== undefined && weekendDates.includes(item.getDay());

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
              "datePicker-body__day",
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
              {getFormattedShortDay(item)}
            </span>
          </button>
        );
      })}
    </div>
  );
};
