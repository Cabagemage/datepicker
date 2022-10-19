import classNames from "classnames";
import {
  DEFAULT_TRANSLATED_DAYS_OF_WEEK,
  getFormattedDateToLocale,
  getFormattedShortDay,
} from "../utils";
import { MouseEventHandler } from "react";

export type MonthViewProps = {
  className?: HTMLDivElement["className"];
  month: Array<Date>;
  currentMonth: number;
  onSelectDay: (date: Date) => void;
  onHoverDay: MouseEventHandler<HTMLButtonElement>;
  selectedDates: Array<string | Date>;
};
export const MonthView = ({
  month,
  currentMonth,
  selectedDates,
  onSelectDay,
  onHoverDay,
  className,
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
                selected: selectedDates.includes(
                  getFormattedDateToLocale(item)
                ),
              }
            )}
            key={item.toString()}
          >
            {getFormattedShortDay(item)}
          </button>
        );
      })}
    </div>
  );
};
