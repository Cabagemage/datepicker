/// <reference types="react" />
import type { MinDate } from "../core";
declare type YearViewProps = {
	months: Array<Date>;
	onMonthClick: (date: Date) => void;
	defaultLocale: Intl.LocalesArgument;
	minDate?: MinDate;
	selectedDates: Array<string | Date>;
};
declare const YearView: ({
	months,
	onMonthClick,
	defaultLocale,
	minDate,
	selectedDates,
}: YearViewProps) => JSX.Element;
export default YearView;
