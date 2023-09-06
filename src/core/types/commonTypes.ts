export type GetCurrentMonth = ({ year, month }: { year?: number; month?: number }) => Array<Date>;

export type DateType = Date | "string" | null;

export type GetDatesInRange = (start: DateType, end: DateType) => Array<Date>;

export type GetDatesOptions = {
	initialDate?: Date;
	month?: number;
	year?: number;
};

export type FormatMonthParams = {
	month: Date;
	locale: Intl.LocalesArgument;
	format?: "long" | "short";
};

export type GetFormattedMonthToLocale = (params: FormatMonthParams) => string;

export type GetMonthCalendarViewDates = (params: GetDatesOptions) => Array<Date>;
export type GetMonthsOfYear = (date: Date) => Array<Date>;

export type GetFormattedShortDay = (date: Date) => string;
export type DateUnit = "day" | "month" | "week" | "year";
