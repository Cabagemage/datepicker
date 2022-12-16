import { DAYS_IDX_LIST } from "../core";
import type { MouseEventHandler } from "react";
import type { CustomizedDate, DatePickerMonthViewClassNames, MinDate } from "../core";
export declare type MonthViewProps = {
	locale: Intl.LocalesArgument;
	month: Array<Date>;
	customMonthClassNames?: Partial<DatePickerMonthViewClassNames>;
	customizedDates?: Array<CustomizedDate>;
	currentMonth: number;
	onSelectDay: (date: Date) => void;
	onHoverDay: MouseEventHandler<HTMLButtonElement>;
	selectedDates: Array<string | Date>;
	minDate?: MinDate;
	disabledDates?: Array<Date | string>;
	weekendDates?: typeof DAYS_IDX_LIST;
};
export declare const MonthView: ({
	locale,
	month,
	currentMonth,
	selectedDates,
	onSelectDay,
	customizedDates,
	onHoverDay,
	customMonthClassNames,
	minDate,
	disabledDates,
	weekendDates,
}: MonthViewProps) => JSX.Element;
