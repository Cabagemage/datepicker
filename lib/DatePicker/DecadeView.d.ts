/// <reference types="react" />
import type { MinDate } from "../core";
declare type YearViewProps = {
	years: Array<Date>;
	onYearClick: (date: Date) => void;
	minDate?: MinDate;
};
declare const DecadeView: ({ years, onYearClick, minDate }: YearViewProps) => JSX.Element;
export default DecadeView;
