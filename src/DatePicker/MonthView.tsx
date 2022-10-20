import classNames from "classnames";
import {
  DEFAULT_TRANSLATED_DAYS_OF_WEEK,
  getFormattedDateToLocale,
  getFormattedShortDay,
} from "../utils";
import { MouseEventHandler } from "react";
import { isEndTimeEarlierThanStartTime } from "../utils/handlers/dateHandlers";

export type MonthViewProps = {
  className?: HTMLDivElement["className"];
  month: Array<Date>;
  currentMonth: number;
  onSelectDay: (date: Date) => void;
  onHoverDay: MouseEventHandler<HTMLButtonElement>;
  selectedDates: Array<string | Date>;
  minDate?: Date;
};
export const MonthView = ({
  month,
  currentMonth,
  selectedDates,
  onSelectDay,
  onHoverDay,
  className,
  minDate,
}: MonthViewProps) => {
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
            ? isEndTimeEarlierThanStartTime(item, minDate)
            : false;
        const isSelected = selectedDates.includes(
          getFormattedDateToLocale(item)
        );
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
                selected: isSelected,
                "datePicker-body__day_disabled": isDisabled,
              }
            )}
            key={item.toString()}
            disabled={isDisabled}
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
