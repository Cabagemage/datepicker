import type { DatePickerProps, CalendarViews } from "../core/types";
import { useState } from "react";
import { DatePicker } from "../index";

export const PreparedDatePicker = (props: Omit<DatePickerProps, "changeCalendarView">) => {
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
		<div style={{ width: 360 }}>
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
