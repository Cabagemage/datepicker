/// <reference types="react" />
import * as react from 'react';

declare const DAYS_IDX_LIST: number[];

declare type GetCurrentMonth = ({ year, month }: {
    year?: number;
    month?: number;
}) => Array<Date>;
declare type DateType = "string" | Date | null;
declare type GetDatesInRange = (start: DateType, end: DateType) => Array<Date>;
declare type GetFormattedMonthParams = {
    month: Date;
    locale: Intl.LocalesArgument;
    format?: "short" | "long";
};
declare type GetFormattedMonthToLocale = (params: GetFormattedMonthParams) => string;
declare type GetMonthsOfYear = (date: Date) => Array<Date>;
declare type GetFormattedShortDay = (date: Date) => string;

declare type CalendarViews = "month" | "year" | "decade";
declare type DatePickerMode = "single" | "partial" | "interval" | "week";
declare type DatePickerInterval = {
    start: Date | null;
    end: Date | null;
};
declare type DatePickerChangeHandler = ({ value }: {
    value: Array<Date> | Date;
}) => void;
declare type CustomizedDate = {
    className: HTMLButtonElement["className"];
    date: Date;
    isDisabled?: boolean;
    textOnHover?: string;
};
declare type DatePickerMonthViewClassNames = {
    monthViewMonthBody: HTMLDivElement["className"];
    monthViewWeekDays: HTMLUListElement["className"];
    monthViewDay: HTMLButtonElement["className"];
    monthViewDayActive: HTMLButtonElement["className"];
    monthViewDayDefaultBackgroundClassName: HTMLButtonElement["className"];
    monthViewDayDayText: HTMLSpanElement["className"];
    monthViewDisabledDate: HTMLButtonElement["className"];
    monthViewWeekDaysListItem: HTMLLIElement["className"];
    monthViewDateIsNotRelatedToMonth: HTMLButtonElement["className"];
};
declare type DatePickerYearViewClassNames = {
    yearViewBody: HTMLDivElement["className"];
    yearViewMonthCell: HTMLButtonElement["className"];
    yearViewMonthCellSelected: HTMLButtonElement["className"];
    yearViewCellDisabled: HTMLButtonElement["className"];
};
declare type DatePickerDecadeViewClassNames = {
    body: HTMLDivElement["className"];
    decadeViewYearCell: HTMLButtonElement["className"];
    decadeViewCellDisabled: HTMLButtonElement["className"];
    decadeViewCellSelected: HTMLButtonElement["className"];
};
declare type DatePickerCommonClassNames = {
    wrapper: HTMLDivElement["className"];
    header: HTMLDivElement["className"];
    arrowLeft: HTMLButtonElement["className"];
    arrowRight: HTMLButtonElement["className"];
};
declare type DatePickerClassNames = Partial<{
    month: Partial<DatePickerMonthViewClassNames>;
    common: Partial<DatePickerCommonClassNames>;
    year: Partial<DatePickerYearViewClassNames>;
    decade: Partial<DatePickerDecadeViewClassNames>;
}>;
declare type MinDateOptions = {
    isPassedDateIncluded?: boolean;
};
declare type MinDate = {
    date: Date;
    options?: MinDateOptions;
};
declare type DatePickerControlsProps = {
    changeCalendarView: () => void;
    toPrevUnitNavAction: () => void;
    headerText: string;
    toNextUnitNavAction: () => void;
};
declare type BaseCellRenderProps = {
    date: Date;
    onDateClick: (date: Date) => void;
};
interface DatePickerProps {
    locale?: Intl.LocalesArgument;
    date?: Date;
    minDate?: MinDate;
    disabledDates?: Array<Date>;
    customHeaderRenderProp?: (props: DatePickerControlsProps) => JSX.Element;
    customMonthViewRenderProp?: (props: MonthViewProps) => JSX.Element;
    customYearViewRenderProp?: (props: YearViewProps) => JSX.Element;
    customDecadeViewRenderProp?: (props: DecadeViewProps) => JSX.Element;
    customYearCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
    customMonthCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
    customDayCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
    weekendDates?: typeof DAYS_IDX_LIST;
    customizationClassNames?: Partial<DatePickerClassNames>;
    changeCalendarView: () => void;
    customizedDates?: Array<CustomizedDate>;
    selectedDates?: Array<Date>;
    selectedInterval?: DatePickerInterval;
    onMonthClick?: (value: Date) => void;
    onYearClick?: (value: Date) => void;
    onDateChange: DatePickerChangeHandler;
    mode?: DatePickerMode;
    view: CalendarViews;
}
declare type YearViewProps = {
    months: Array<Date>;
    onMonthClick: (date: Date) => void;
    defaultLocale: Intl.LocalesArgument;
    currentMonthIdx: number;
    customMonthCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
    minDate?: MinDate;
    customYearClassNames?: Partial<DatePickerYearViewClassNames>;
};
declare type DecadeViewProps = {
    years: Array<Date>;
    onYearClick: (date: Date) => void;
    customYearCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
    minDate?: MinDate;
    activeYear?: number;
    customDecadeClassNames?: Partial<DatePickerDecadeViewClassNames>;
};
declare type MonthViewProps = {
    locale: Intl.LocalesArgument;
    month: Array<Date>;
    customMonthClassNames?: Partial<DatePickerMonthViewClassNames>;
    customizedDates?: Array<CustomizedDate>;
    customDayCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
    currentMonth: number;
    onSelectDay: (date: Date) => void;
    selectedDates: Array<string | Date>;
    minDate?: MinDate;
    disabledDates?: Array<Date | string>;
    weekendDates?: typeof DAYS_IDX_LIST;
};

declare const DatePicker: react.ForwardRefExoticComponent<DatePickerProps & react.RefAttributes<HTMLDivElement | null>>;

export { CalendarViews, CustomizedDate, DatePicker, DatePickerChangeHandler, DatePickerClassNames, DatePickerCommonClassNames, DatePickerControlsProps, DatePickerInterval, DatePickerMonthViewClassNames, DatePickerProps, DatePickerYearViewClassNames, DateType, GetCurrentMonth, GetDatesInRange, GetFormattedMonthToLocale, GetFormattedShortDay, GetMonthsOfYear, MinDate, MinDateOptions };
