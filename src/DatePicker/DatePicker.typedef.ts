import type { ChangeEvent, CSSProperties } from "react";

export type DatePickerStyles = {
  wrapper: CSSProperties;
  header: CSSProperties;
  body: CSSProperties;
  activeDay: CSSProperties;
};

type CalendarViews = "month" | "week" | "year" | "years";
type DatePickerMode = "single" | "partial" | "interval" | "week";

export type DatePickerInterval = { start: Date | null; end: Date | null };
export interface DatePickerProps<T> {
  activeDate: Date;
  locale?: Intl.LocalesArgument;
  defaultDate?: Date;
  dates?: Array<T>;
  onDateClick: (
    value: { date: Date },
    e: ChangeEvent<HTMLButtonElement>
  ) => void;
  onMonthClick?: (value: Date) => void;
  onYearClick?: (value: Date) => void;
  onChange: (value: Array<Date | string>) => void;
  onToggleNextMonth: () => void;
  onTogglePrevMonth: () => void;
  mode?: DatePickerMode;
  style?: DatePickerStyles;
  customDayCell?: JSX.Element;
  customMonthCell?: JSX.Element;
  view: CalendarViews;
}
