import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./page.css";
import { DatePicker } from "../DatePicker";
import { useState } from "react";
import { CalendarViews, DatePickerChangeHandler } from "../core";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "DatePicker",
	component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState<Array<Date>>([new Date()]);
	const [view, setView] = useState<CalendarViews>("month");

	const change: DatePickerChangeHandler = (args) => {
		if (Array.isArray(args.value)) {
			setDate(args.value);
		}
	};

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
		<section className={"page"}>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<DatePicker
					date={date[0]}
					onYearClick={onYearClick}
					changeCalendarView={changeCurrentCalendarView}
					onDateClick={change}
					locale={"en"}
					onMonthClick={monthClickHandler}
					view={view}
					mode={"interval"}
				/>
				<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
					<label>Start</label>
					<input readOnly value={date[0].toLocaleDateString()} style={{ height: 50 }} />
				</div>
				<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
					<label>End</label>
					<input readOnly value={date[date.length - 1].toLocaleDateString()} style={{ height: 50 }} />
				</div>
			</div>
		</section>
	);
};

export const Interval = Template.bind({});
