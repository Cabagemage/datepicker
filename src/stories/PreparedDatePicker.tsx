import { useState } from "react";
import { DatePicker } from "../index";

type PreparedDatePickerProps = {
	width?: number;
	onPartialChange?: (dates: Array<Date>) => void;
	onSingleDateChange?: (date: Date) => void;
	onWeekChange?: (value: { start: Date | null; end: Date | null }) => void;
	onIntervalDatesChange?: (value: { start: Date | null; end: Date | null }) => void;
} & Omit<DatePicker, "changeCalendarView" | "onDateChange">;

export const PreparedDatePicker = ({
	width = 360,
	onPartialChange,
	onWeekChange,
	onIntervalDatesChange,
	onSingleDateChange,
	...props
}: PreparedDatePickerProps) => {
	const [view, setView] = useState<DatePicker["view"]>(props.view);

	const changeCurrentCalendarView = () => {
		switch (view) {
			case "month":
				return setView("year");
			case "year":
				return setView("decade");
			case "decade":
				return setView("month");
			default:
				return setView("month");
		}
	};

	const monthClickHandler = (date: Date) => {
		setView("month");

		// by default click on month do nothing. You should configure it manually to make it work.
		props.onMonthClick && props.onMonthClick(date);
	};

	const onYearClick = (date: Date) => {
		setView("year");
		// by default click on year do nothing. You should configure it manually to make it work.
		props.onYearClick && props.onYearClick(date);
	};

	const onDateChange: DatePicker["onDateChange"] = ({ value }) => {
		if (value instanceof Date) {
			if (onSingleDateChange !== undefined) {
				onSingleDateChange(value);
			}
			return;
		}
		if (Array.isArray(value)) {
			if (onPartialChange !== undefined) {
				onPartialChange(value);
			}
			return;
		}
		if (onIntervalDatesChange !== undefined) {
			onIntervalDatesChange(value);
			return;
		}
		if (onWeekChange !== undefined) {
			onWeekChange && onWeekChange(value);
		}
	};
	return (
		<div style={{ width: width, flexShrink: 0 }}>
			<DatePicker
				{...props}
				onDateChange={onDateChange}
				onYearClick={onYearClick}
				changeCalendarView={changeCurrentCalendarView}
				onMonthClick={monthClickHandler}
				view={view}
			/>
		</div>
	);
};
