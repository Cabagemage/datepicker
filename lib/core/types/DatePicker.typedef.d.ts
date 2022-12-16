/// <reference types="react" />
import { DAYS_IDX_LIST } from "../index";
export declare type CalendarViews = "month" | "year" | "decade";
declare type DatePickerMode = "single" | "partial" | "interval" | "week";
export declare type DatePickerInterval = {
    start: Date | null;
    end: Date | null;
};
export declare type DatePickerChangeHandler = ({ value }: {
    value: Array<Date> | Date;
}) => void;
export declare type CustomizedDate = {
    className: HTMLButtonElement["className"];
    date: Date;
    isDisabled?: boolean;
    textOnHover?: string;
};
export declare type DatePickerMonthViewClassNames = {
    monthViewMonthBody: HTMLDivElement["className"];
    monthViewWeekDays: HTMLUListElement["className"];
    monthViewDay: HTMLButtonElement["className"];
    monthViewDayActive: HTMLButtonElement["className"];
    monthViewDayDefaultBackgroundClassName: HTMLButtonElement["className"];
    monthViewDayDayText: HTMLSpanElement["className"];
    monthViewDisabledDate: HTMLButtonElement["className"];
    monthViewWeekDaysListItem: HTMLLIElement["className"];
};
export declare type DatePickerYearViewClassNames = {
    yearViewMonthCell: HTMLButtonElement["className"];
};
export declare type DatePickerDecadeViewClassNames = {
    body: HTMLDivElement["className"];
};
export declare type DatePickerCommonClassNames = {
    wrapper: HTMLDivElement["className"];
    header: HTMLDivElement["className"];
    arrowLeft: HTMLButtonElement["className"];
    arrowRight: HTMLButtonElement["className"];
};
export declare type DatePickerClassNames = Partial<{
    month: Partial<DatePickerMonthViewClassNames>;
    common: Partial<DatePickerCommonClassNames>;
    year: Partial<DatePickerYearViewClassNames>;
    decade: Partial<DatePickerDecadeViewClassNames>;
}>;
export declare type MinDateOptions = {
    isPassedDateIncluded?: boolean;
};
export declare type MinDate = {
    date: Date;
    options?: MinDateOptions;
};
export declare type DatePickerControlsProps = {
    changeCalendarView: () => void;
    toPrevUnitNavAction: () => void;
    headerText: string;
    toNextUnitNavAction: () => void;
};
export interface DatePickerProps {
    locale?: Intl.LocalesArgument;
    date?: Date;
    minDate?: MinDate;
    disabledDates?: Array<Date>;
    customHeaderRenderProp?: (props: DatePickerControlsProps) => JSX.Element;
    weekendDates?: typeof DAYS_IDX_LIST;
    customizationClassNames?: Partial<DatePickerClassNames>;
    changeCalendarView: () => void;
    customizedDates?: Array<CustomizedDate>;
    selectedDates?: Array<Date>;
    selectedInterval?: DatePickerInterval;
    onMonthClick?: (value: Date) => void;
    onYearClick?: (value: Date) => void;
    onDateClick: DatePickerChangeHandler;
    mode?: DatePickerMode;
    view: CalendarViews;
}
export {};
