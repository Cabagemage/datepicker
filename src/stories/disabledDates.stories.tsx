import { DatePicker } from "../index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChangeEventHandler, useState } from "react";
import { getDatesInRange, getMonday, getSunday } from "../core/handlers";
import { PreparedDatePicker } from "./PreparedDatePicker";

export default {
	title: "DatePicker/disable some days",
	component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const CalendarWithWeekendDaysTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const [isWeekendDaysDisabled, setIsWeekendDaysDisabled] = useState(false);
	const changeDate = (date: Date) => {
		setDate(date);
	};

	const changeCheckboxValue: ChangeEventHandler<HTMLInputElement> = (e) => {
		setIsWeekendDaysDisabled(e.target.checked);
	};
	return (
		<section>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					value={date}
					onSingleDateChange={changeDate}
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
	const changeDate = (date: Date) => {
		setDate(date);
	};

	const monday = getMonday(new Date());
	const sunday = getSunday(new Date());

	const customizedDatesForFirstWeek = getDatesInRange(monday, sunday);
	return (
		<section>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					value={date}
					onSingleDateChange={changeDate}
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

const CalendarWithMinMaxDatePassedTemplate: ComponentStory<typeof DatePicker> = () => {
	const [minDate, setMinDate] = useState(new Date());
	const [maxDate, setMaxDate] = useState(new Date());
	const [shouldMinDateBeDisabled, setShouldMinDateBeDisabled] = useState(true);
	const [shouldMaxDateBeDisabled, setShouldMaxDateBeDisabled] = useState(true);
	const changeMinDate = (date: Date) => {
		setMinDate(date);
	};
	const changeMaxDate = (date: Date) => {
		setMaxDate(date);
	};
	return (
		<section>
			<div>
				<h2>All dates until/include selected date will be disabled.</h2>
				<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
					<PreparedDatePicker
						value={minDate}
						onSingleDateChange={changeMinDate}
						locale={"en"}
						mode={"single"}
						view={"month"}
					/>
					<PreparedDatePicker
						value={new Date()}
						minDate={{ date: minDate, options: { isPassedDateIncluded: shouldMinDateBeDisabled } }}
						onSingleDateChange={changeMinDate}
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
			</div>
			<div>
				<h2>Select maxDate. Also, min date that you chose on previous datePicker also shows here</h2>
				<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
					<PreparedDatePicker
						value={maxDate}
						onSingleDateChange={changeMaxDate}
						locale={"en"}
						mode={"single"}
						view={"month"}
					/>
					<PreparedDatePicker
						value={maxDate}
						minDate={{ date: minDate, options: { isPassedDateIncluded: shouldMinDateBeDisabled } }}
						maxDate={{ date: maxDate, options: { isPassedDateIncluded: shouldMaxDateBeDisabled } }}
						locale={"en"}
						mode={"single"}
						view={"month"}
					/>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<label>Should latest one be disabled?</label>
						<button
							onClick={() => {
								setShouldMaxDateBeDisabled(!shouldMaxDateBeDisabled);
							}}
						>
							{shouldMaxDateBeDisabled ? "yes" : "no"}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};
export const CalendarWithMinDatePassed = CalendarWithMinMaxDatePassedTemplate.bind({});
export const CalendarWithWeekendDates = CalendarWithWeekendDaysTemplate.bind({});
export const CalendarWithCustomDisabledDates = CalendarWithCustomDisabledDatesTemplate.bind({});
