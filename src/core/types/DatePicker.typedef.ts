import { DAYS_IDX_LIST } from "../index";

export type CalendarViews = "month" | "year" | "decade";
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
	monthViewDateIsNotRelatedToMonth: HTMLButtonElement["className"];
};

export type DatePickerYearViewClassNames = {
	yearViewBody: HTMLDivElement["className"];
	yearViewMonthCell: HTMLButtonElement["className"];
	yearViewMonthCellSelected: HTMLButtonElement["className"];
	yearViewCellDisabled: HTMLButtonElement["className"];
};
export type DatePickerDecadeViewClassNames = {
	body: HTMLDivElement["className"];
	decadeViewYearCell: HTMLButtonElement["className"];
	decadeViewCellDisabled: HTMLButtonElement["className"];
	decadeViewCellSelected: HTMLButtonElement["className"];
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
	headerText: string;
	toNextUnitNavAction: () => void;
};
type BaseCellRenderProps = { date: Date; onDateClick: (date: Date) => void };

export interface DatePickerProps {
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

export type YearViewProps = {
	months: Array<Date>;
	onMonthClick: (date: Date) => void;
	defaultLocale: Intl.LocalesArgument;
	currentMonthIdx: number;
	customMonthCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
	minDate?: MinDate;
	customYearClassNames?: Partial<DatePickerYearViewClassNames>;
};
export type DecadeViewProps = {
	years: Array<Date>;
	onYearClick: (date: Date) => void;
	customYearCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
	minDate?: MinDate;
	activeYear?: number;
	customDecadeClassNames?: Partial<DatePickerDecadeViewClassNames>;
};

export type MonthViewProps = {
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
