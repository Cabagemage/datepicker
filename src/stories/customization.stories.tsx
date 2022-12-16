import { DatePicker } from "../DatePicker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import {
	CustomizedDate,
	DatePickerChangeHandler,
	DatePickerClassNames,
	getDatesInRange,
	getMonday,
	getSunday,
} from "../core";
import { PreparedDatePicker } from "./PreparedDatePicker";
import "./cssExamples.css";

export default {
	title: "DatePicker/customization",
	component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const CustomizedDatesTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const change: DatePickerChangeHandler = (args) => {
		if (!Array.isArray(args.value)) {
			setDate(args.value);
		}
	};
	const monday = getMonday(new Date());
	const sunday = getSunday(new Date());

	const customizedDatesForFirstWeek: Array<CustomizedDate> = getDatesInRange(monday, sunday).map(
		(item, idx) => {
			return {
				date: item,
				className: "customDate__1",
				textOnHover: "8-800-555-35-35",
				isDisabled: !!(idx % 2),
			};
		}
	);
	return (
		<section>
			<p style={{ marginBottom: 50 }}>
				You can customize :hover only with !important directive. It'll be fixed later.
			</p>

			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					date={date}
					onDateClick={change}
					customizedDates={customizedDatesForFirstWeek}
					locale={"en"}
					mode={"single"}
					view={"month"}
				/>
				<input readOnly value={date.toLocaleDateString()} style={{ height: 50 }} />
			</div>
		</section>
	);
};

const CustomHeaderTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const change: DatePickerChangeHandler = (args) => {
		if (!Array.isArray(args.value)) {
			setDate(args.value);
		}
	};

	return (
		<section>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					date={date}
					onDateClick={change}
					customHeaderRenderProp={({
						toNextUnitNavAction,
						toPrevUnitNavAction,
						changeCalendarView,
						headerText,
					}) => {
						return (
							<div style={{ display: "flex", gap: "25px", justifyContent: "space-between" }}>
								<button onClick={toPrevUnitNavAction}>PREVIOUS</button>
								<button onClick={changeCalendarView}>{headerText}</button>
								<button onClick={toNextUnitNavAction}>NEXT</button>
							</div>
						);
					}}
					locale={"en"}
					mode={"single"}
					view={"month"}
				/>
				<input readOnly value={date.toLocaleDateString()} style={{ height: 50 }} />
			</div>
		</section>
	);
};

const CustomCalendarClassNamesTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const change: DatePickerChangeHandler = (args) => {
		if (!Array.isArray(args.value)) {
			setDate(args.value);
		}
	};
	const customClassNames: DatePickerClassNames = {
		month: {
			monthViewDay: "customMonthViewDay",
			monthViewMonthBody: "customMonthBody",
			monthViewDisabledDate: "",
			monthViewWeekDays: "customWeekDays",
			monthViewWeekDaysListItem: "customWeekDay",
		},
		common: { wrapper: "customWrapper" },
	};

	return (
		<section>
			<p>I'm not designer, so, its only one variant what you can customize. (everything)</p>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					customizationClassNames={customClassNames}
					date={date}
					onDateClick={change}
					locale={"en"}
					mode={"single"}
					view={"month"}
				/>
				<input readOnly value={date.toLocaleDateString()} style={{ height: 50 }} />
			</div>
		</section>
	);
};
const OtherLanguageTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const [currentLanguage, setCurrentLanguage] = useState<string>("ru");
	const change: DatePickerChangeHandler = (args) => {
		if (!Array.isArray(args.value)) {
			setDate(args.value);
		}
	};

	const options = [
		{ value: "ru-RU", label: "Russian" },
		{ value: "en", label: "English" },
		{ value: "hi", label: "Hindi" },
		{ value: "chi", label: "Chinese" },
	];

	return (
		<section>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					date={date}
					onDateClick={change}
					locale={currentLanguage}
					mode={"single"}
					view={"month"}
				/>
				<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
					<label>language select</label>
					<select
						onChange={(e) => {
							return setCurrentLanguage(e.currentTarget.value);
						}}
					>
						{options.map((item) => {
							return (
								<option key={item.value} value={item.value}>
									{item.label}
								</option>
							);
						})}
					</select>
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: "5px", height: 45 }}>
					<label>selected date</label>
					<input readOnly value={date.toLocaleDateString(currentLanguage)} />
				</div>
			</div>
		</section>
	);
};
export const OtherLanguage = OtherLanguageTemplate.bind({});
export const CustomCalendarClassNames = CustomCalendarClassNamesTemplate.bind({});
export const CustomHeader = CustomHeaderTemplate.bind({});
export const CustomDates = CustomizedDatesTemplate.bind({});
