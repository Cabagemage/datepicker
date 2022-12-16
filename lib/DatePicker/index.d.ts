/// <reference types="react" />
import type { DatePickerProps } from "../core";
import "./datePicker.css";
export declare const DatePicker: ({
	locale,
	mode,
	minDate,
	disabledDates,
	onYearClick,
	weekendDates,
	onDateClick,
	customizedDates,
	customizationClassNames,
	selectedDates,
	date,
	selectedInterval,
	onMonthClick,
	view,
	changeCalendarView,
	customHeaderRenderProp,
}: DatePickerProps) => JSX.Element;
