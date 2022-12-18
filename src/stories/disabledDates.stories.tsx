import { DatePicker } from "../index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChangeEventHandler, useState } from "react";
import { DatePickerChangeHandler } from "../index";
import { getDatesInRange, getMonday, getSunday } from "../core/handlers";
import { PreparedDatePicker } from "./PreparedDatePicker";

export default {
	title: "DatePicker/disable some days",
	component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const CalendarWithWeekendDaysTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const [isWeekendDaysDisabled, setIsWeekendDaysDisabled] = useState(false);
	const change: DatePickerChangeHandler = (args) => {
		if (!Array.isArray(args.value)) {
			setDate(args.value);
		}
	};

	const changeCheckboxValue: ChangeEventHandler<HTMLInputElement> = (e) => {
		setIsWeekendDaysDisabled(e.target.checked);
	};
	return (
		<section>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					date={date}
					onDateChange={change}
					customizationClassNames={{ month: { monthWeekendDay: "customWeekendDay" } }}
					weekendDays={{ weekendDays: [0, 6], shouldBeDisabled: isWeekendDaysDisabled }}
					locale={"en"}
					mode={"single"}
					view={"month"}
				/>
				<input readOnly value={date.toLocaleDateString()} style={{ height: 50 }} />
				<div>
					<label htmlFor={"disableWeekend"}>Disable weekend days</label>
					<input type={"checkbox"} id={"disableWeekend"} onChange={changeCheckboxValue} />
				</div>
			</div>
		</section>
	);
};

const CalendarWithCustomDisabledDatesTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const change: DatePickerChangeHandler = (args) => {
		if (!Array.isArray(args.value)) {
			setDate(args.value);
		}
	};

	const monday = getMonday(new Date());
	const sunday = getSunday(new Date());

	const customizedDatesForFirstWeek = getDatesInRange(monday, sunday);
	return (
		<section>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					date={date}
					onDateChange={change}
					disabledDates={customizedDatesForFirstWeek}
					locale={"en"}
					mode={"single"}
					view={"month"}
				/>
				<input readOnly value={date.toLocaleDateString()} style={{ height: 50 }} />
			</div>
		</section>
	);
};

const CalendarWithMinDatePassedTemplate: ComponentStory<typeof DatePicker> = () => {
	const [minDate, setMinDate] = useState(new Date());
	const [shouldMinDateBeDisabled, setShouldMinDateBeDisabled] = useState(true);
	const change: DatePickerChangeHandler = (args) => {
		if (!Array.isArray(args.value)) {
			setMinDate(args.value);
		}
	};
	return (
		<section>
			<h2>All dates until/include selected date will be disabled.</h2>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					date={minDate}
					onDateChange={change}
					locale={"en"}
					mode={"single"}
					view={"month"}
				/>
				<PreparedDatePicker
					minDate={{ date: minDate, options: { isPassedDateIncluded: shouldMinDateBeDisabled } }}
					onDateChange={change}
					locale={"en"}
					mode={"single"}
					view={"month"}
				/>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<label>Should minDate be disabled?</label>
					<button
						onClick={() => {
							setShouldMinDateBeDisabled(!shouldMinDateBeDisabled);
						}}
					>
						{shouldMinDateBeDisabled ? "yes" : "no"}
					</button>
				</div>
			</div>
		</section>
	);
};
export const CalendarWithMinDatePassed = CalendarWithMinDatePassedTemplate.bind({});
export const CalendarWithWeekendDates = CalendarWithWeekendDaysTemplate.bind({});
export const CalendarWithCustomDisabledDates = CalendarWithCustomDisabledDatesTemplate.bind({});
