import { DAYS_IDX_LIST } from "../index";

export type CalendarViews = "month" | "week" | "year" | "decade";
type DatePickerMode = "single" | "partial" | "interval" | "week";

export type DatePickerInterval = { start: Date | null; end: Date | null };
export type DatePickerChangeHandler = ({ value }: { value: Array<Date> | Date }) => void;

export type CustomizedDate = {
	className: HTMLButtonElement["className"];
	date: Date;
	isDisabled?: boolean;
	textOnHover?: string;
};

export type DatePickerMonthViewClassNames = {
	monthViewMonthBody: HTMLDivElement["className"];
	monthViewWeekDays: HTMLUListElement["className"];
	monthViewDay: HTMLButtonElement["className"];
	monthViewDayActive: HTMLButtonElement["className"];
	monthViewDayDefaultBackgroundClassName: HTMLButtonElement["className"];
	monthViewDayDayText: HTMLSpanElement["className"];
	monthViewDisabledDate: HTMLButtonElement["className"];
	monthViewWeekDaysListItem: HTMLLIElement["className"];
};

export type DatePickerYearViewClassNames = {
	yearViewMonthCell: HTMLButtonElement["className"];
};
export type DatePickerDecadeViewClassNames = {
	body: HTMLDivElement["className"];
};
export type DatePickerCommonClassNames = {
	wrapper: HTMLDivElement["className"];
	header: HTMLDivElement["className"];
	arrowLeft: HTMLButtonElement["className"];
	arrowRight: HTMLButtonElement["className"];
};

export type DatePickerClassNames = Partial<{
	month: Partial<DatePickerMonthViewClassNames>;
	common: Partial<DatePickerCommonClassNames>;
	year: Partial<DatePickerYearViewClassNames>;
	decade: Partial<DatePickerDecadeViewClassNames>;
}>;

export type MinDateOptions = {
	isPassedDateIncluded?: boolean;
};
export type MinDate = { date: Date; options?: MinDateOptions };

export type DatePickerControlsProps = {
	changeCalendarView: () => void;
	toPrevUnitNavAction: () => void;
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
