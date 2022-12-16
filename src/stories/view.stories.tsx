import { DatePicker } from "../DatePicker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { CalendarViews } from "../core";

export default {
	title: "DatePicker/View",
	component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const CalendarWithViewSelection: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const [selectedMonth, setSelectedMonth] = useState(new Date());
	const [selectedYear, setSelectedYear] = useState(new Date());
	const [currentViewMode, setCurrentViewMode] = useState<CalendarViews>("year");

	const options = [
		{ value: "year", label: "Year" },
		{ value: "decade", label: "Decade" },
	];

	const monthClickHandler = (value: Date) => {
		setSelectedMonth(value);
		setDate(new Date(selectedYear.getFullYear(), value.getMonth(), 1));
	};

	const onYearClick = (value: Date) => {
		setSelectedYear(new Date(value.getFullYear(), selectedMonth.getMonth(), 1));
		setDate(new Date(value.getFullYear(), selectedMonth.getMonth(), 1));
	};

	return (
		<section>
			<div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: 50, width: 150 }}>
				<label>language select</label>
				<select
					onChange={(e) => {
						return setCurrentViewMode(e.currentTarget.value as CalendarViews);
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
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<DatePicker
					date={date}
					onYearClick={onYearClick}
					changeCalendarView={console.info}
					onDateChange={console.info}
					customHeaderRenderProp={() => {
						return (
							<div>
								{currentViewMode === "year"
									? "current month is " + selectedMonth.toLocaleDateString("en-US", { month: "long" })
									: "current year is " + selectedYear.getFullYear()}
							</div>
						);
					}}
					onMonthClick={monthClickHandler}
					view={currentViewMode}
				/>
			</div>
		</section>
	);
};

export const CalendarViewModeSelection = CalendarWithViewSelection.bind({});
