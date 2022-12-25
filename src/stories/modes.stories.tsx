import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DatePicker, DatePickerInterval } from "../index";
import { useState } from "react";
import { getOrdinalNumberOfWeek } from "../core/handlers";
import { PreparedDatePicker } from "./PreparedDatePicker";

export default {
	title: "DatePicker/mode",
	component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const IntervalTemplate: ComponentStory<typeof DatePicker> = () => {
	const [interval, setInterval] = useState<DatePickerInterval>({ start: null, end: null });
	const changeInterval = (datesInterval: DatePickerInterval) => {
		console.info(datesInterval);
		setInterval(datesInterval);
	};

	return (
		<section style={{ display: "flex", flexDirection: "column", gap: 25 }}>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					value={interval}
					onIntervalDatesChange={changeInterval}
					locale={"en"}
					mode={"interval"}
					view={"month"}
				/>
				<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
					<label>Start</label>
					<input
						readOnly
						value={interval.start?.toLocaleDateString() ?? "Select date"}
						style={{ height: 50 }}
					/>
				</div>
				<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
					<label>End</label>
					<input
						readOnly
						value={interval.end?.toLocaleDateString() ?? "Select date"}
						style={{ height: 50 }}
					/>
				</div>
			</div>
		</section>
	);
};

const SingleTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const changeDate = (date: Date) => {
		setDate(date);
	};

	return (
		<section>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					value={date}
					onSingleDateChange={changeDate}
					locale={"en"}
					mode={"single"}
					view={"month"}
				/>
				<input readOnly value={date.toLocaleDateString()} style={{ height: 50 }} />
			</div>
		</section>
	);
};

const PartialTemplate: ComponentStory<typeof DatePicker> = () => {
	const [pickedDates, setPickedDates] = useState<Array<Date>>([new Date()]);

	const changePartialDates = (dates: Array<Date>) => {
		setPickedDates(dates);
	};

	return (
		<section className={"page"}>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					value={pickedDates}
					view={"month"}
					onPartialChange={changePartialDates}
					locale={"en"}
					mode={"partial"}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flexWrap: "wrap",
						gap: "5px",
						alignItems: "center",
					}}
				>
					{pickedDates.map((item) => {
						return <span key={item.toDateString()}>{item.toLocaleDateString()}</span>;
					})}
				</div>
			</div>
		</section>
	);
};

const WeekTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState<Date>(new Date());
	const [inputText, setInputText] = useState("Select a date to get week start & end");
	const weekNumber = getOrdinalNumberOfWeek(date);
	const change = ({ start, end }: { start: Date; end: Date }) => {
		setDate(start);
		setInputText(`week start: ${start.toLocaleDateString()}. week end: ${end.toLocaleDateString()}`);
	};

	return (
		<section className={"page"}>
			<p>
				If you want set default week value, you should pass array with date of start week or two dates (start
				& end).
			</p>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker view={"month"} value={date} onWeekChange={change} locale={"en"} mode={"week"} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flexWrap: "wrap",
						gap: "5px",
						alignItems: "center",
					}}
				>
					<span>ordinal number of week is: {weekNumber}</span>
					<div style={{ display: "flex", gap: 25 }}>
						<span>{inputText}</span>
					</div>
				</div>
			</div>
		</section>
	);
};
export const Week = WeekTemplate.bind({});
export const Partial = PartialTemplate.bind({});
export const Single = SingleTemplate.bind({});
export const Interval = IntervalTemplate.bind({});
