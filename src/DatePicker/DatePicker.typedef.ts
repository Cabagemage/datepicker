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
  textOnHover?: string;
};

export type DatePickerMonthViewClassNames = {
  monthViewMonthBody: HTMLDivElement["className"];
  monthViewWeekDays: HTMLUListElement["className"];
  monthViewDay: HTMLButtonElement["className"];
  monthViewDayActive: HTMLButtonElement["className"];
  monthViewDayDefaultBackgroundClassName: HTMLButtonElement["className"];
  monthViewDayDayText: HTMLSpanElement["className"];
  monthViewDisabledDate: HTMLButtonElement["className"];
  monthViewWeekDaysListItem: HTMLLIElement["className"];
};

export type DatePickerYearViewClassNames = {
  yearViewMonthCell: HTMLButtonElement["className"];
};

export type DatePickerCommonClassNames = {
  wrapper: HTMLDivElement["className"];
  header: HTMLDivElement["className"];
};

export type DatePickerClassNames = {
  month: Partial<DatePickerMonthViewClassNames>;
  common: Partial<DatePickerCommonClassNames>;
  year: Partial<DatePickerYearViewClassNames>;
};

export interface DatePickerProps {
  activeDate: Date;
  locale?: Intl.LocalesArgument;
  defaultDate?: Date;
  customizationClassNames?: Partial<DatePickerClassNames>;
  customizedDates?: Array<CustomizedDate>;
  onMonthClick?: (value: Date) => void;
  onYearClick?: (value: Date) => void;
  onDateClick: DatePickerChangeHandler;
  onToggleNextMonth: () => void;
  onTogglePrevMonth: () => void;
  mode?: DatePickerMode;
  style?: DatePickerStyles;
  view: CalendarViews;
}
