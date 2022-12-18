import type { DatePickerProps, CalendarViews } from "../core/types";
import { useState } from "react";
import { DatePicker } from "../index";

type PreparedDatePickerProps = {
	width?: number;
} & Omit<DatePickerProps, "changeCalendarView">;
export const PreparedDatePicker = ({ width = 360, ...props }: PreparedDatePickerProps) => {
	const [view, setView] = useState<CalendarViews>(props.view);

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

	const monthClickHandler = () => {
		setView("month");
	};

	const onYearClick = () => {
		setView("year");
	};

	return (
		<div style={{ width: width }}>
			<DatePicker
				{...props}
				onYearClick={onYearClick}
				changeCalendarView={changeCurrentCalendarView}
				onMonthClick={monthClickHandler}
				view={view}
			/>
		</div>
	);
};
