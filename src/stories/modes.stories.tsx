import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DatePicker } from "../DatePicker";
import { useState } from "react";
import { add, DatePickerChangeHandler } from "../core";
import { PreparedDatePicker } from "./PreparedDatePicker";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "DatePicker/mode",
	component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const IntervalTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState<Array<Date>>([new Date()]);
	const change: DatePickerChangeHandler = (args) => {
		if (Array.isArray(args.value)) {
			setDate(args.value);
		}
	};

	return (
		<section style={{ display: "flex", flexDirection: "column", gap: 25 }}>
			<h1>Interval has no interval option passed</h1>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					date={date[0]}
					onDateClick={change}
					locale={"en"}
					mode={"interval"}
					view={"month"}
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
			<div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "start" }}>
				<h1>Interval with interval option start passed</h1>
				<PreparedDatePicker
					selectedInterval={{ start: new Date(), end: null }}
					onDateClick={change}
					locale={"en"}
					mode={"interval"}
					view={"month"}
				/>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "start" }}>
				<h1>Interval with interval option start & end passed</h1>
				<PreparedDatePicker
					selectedInterval={{
						start: date[0],
						end: add({ date: date[0], count: 5, type: "day" }),
					}}
					onDateClick={change}
					locale={"en"}
					mode={"interval"}
					view={"month"}
				/>
			</div>
		</section>
	);
};

const SingleTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const change: DatePickerChangeHandler = (args) => {
		if (!Array.isArray(args.value)) {
			setDate(args.value);
		}
	};

	return (
		<section>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker date={date} onDateClick={change} locale={"en"} mode={"single"} view={"month"} />
				<input readOnly value={date.toLocaleDateString()} style={{ height: 50 }} />
			</div>
		</section>
	);
};

const PartialTemplate: ComponentStory<typeof DatePicker> = () => {
	const [pickedDates, setPickedDates] = useState<Array<Date>>([new Date()]);

	const change: DatePickerChangeHandler = (args) => {
		if (Array.isArray(args.value)) {
			setPickedDates(args.value);
		}
	};

	return (
		<section className={"page"}>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					view={"month"}
					selectedDates={pickedDates}
					onDateClick={change}
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
export const Partial = PartialTemplate.bind({});
export const Single = SingleTemplate.bind({});
export const Interval = IntervalTemplate.bind({});
