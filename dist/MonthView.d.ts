/// <reference types="react" />
import { MonthViewProps } from "./core/types/DatePicker.typedef";
export declare const MonthView: ({
	locale,
	month,
	currentMonth,
	selectedDates,
	onSelectDay,
	customizedDates,
	customMonthClassNames,
	minDate,
	disabledDates,
	weekendDates,
	customDayCellRenderProp,
}: MonthViewProps) => JSX.Element;
