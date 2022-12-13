import type { CSSProperties } from "react";

export type DatePickerStyles = {
  wrapper: CSSProperties;
  header: CSSProperties;
  body: CSSProperties;
  activeDay: CSSProperties;
};

type CalendarViews = "month" | "week" | "year" | "years";
type DatePickerMode = "single" | "partial" | "interval" | "week";

export type DatePickerInterval = { start: Date | null; end: Date | null };
export type DatePickerChangeHandler = ({
  value,
}: {
  value: Array<Date> | Date;
}) => void;

export type CustomizedDate = {
  className: HTMLButtonElement["className"];
  date: Date;
  isDisabled?: boolean;
};

export interface DatePickerProps<T> {
  activeDate: Date;
  locale?: Intl.LocalesArgument;
  defaultDate?: Date;
  customizedDates?: Array<CustomizedDate>;
  onMonthClick?: (value: Date) => void;
  onYearClick?: (value: Date) => void;
  onDateClick: DatePickerChangeHandler;
  onToggleNextMonth: () => void;
  onTogglePrevMonth: () => void;
  mode?: DatePickerMode;
  style?: DatePickerStyles;
  customDayCell?: JSX.Element;
  customMonthCell?: JSX.Element;
  view: CalendarViews;
}
