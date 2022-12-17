export declare type GetCurrentMonth = ({ year, month }: {
    year?: number;
    month?: number;
}) => Array<Date>;
export declare type DateType = "string" | Date | null;
export declare type GetDatesInRange = (start: DateType, end: DateType) => Array<Date>;
export declare type GetDatesOptions = {
    initialDate?: Date;
    month?: number;
    year?: number;
};
declare type GetFormattedMonthParams = {
    month: Date;
    locale: Intl.LocalesArgument;
    format?: "short" | "long";
};
export declare type GetFormattedMonthToLocale = (params: GetFormattedMonthParams) => string;
export declare type GetMonthCalendarViewDates = (params: GetDatesOptions) => Array<Date>;
export declare type GetMonthsOfYear = (date: Date) => Array<Date>;
export declare type GetFormattedShortDay = (date: Date) => string;
export declare type DateUnit = "month" | "year" | "day" | "week";
export {};
