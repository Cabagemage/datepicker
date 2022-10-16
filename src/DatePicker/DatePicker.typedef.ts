import type { ChangeEvent, CSSProperties } from "react";


export type DatePickerStyles = {
    wrapper: CSSProperties;
        header: CSSProperties;
        body: CSSProperties;
        activeDay: CSSProperties;
}

type CalendarViews = "month" | "week" | "year"

export interface DatePickerProps<T>{
    activeDate: Date;
    defaultDate?: Date;
    dates?: Array<T>;
    onDateClick: (value: {date: Date}, e: ChangeEvent<HTMLButtonElement>) => void;
    onToggleNextMonth: () => void;
    onTogglePrevMonth: () => void;
    style?:DatePickerStyles;
    customDayCell?: JSX.Element;
    customMonthCell?: JSX.Element;
    view: CalendarViews;
}