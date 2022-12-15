import { useState } from "react";
import {DatePicker} from "./index";
import { CalendarViews, CustomizedDate, DatePickerChangeHandler } from "./core";

function App() {
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());
	const [view, setView] = useState<CalendarViews>("month");
	const customizedDates: Array<CustomizedDate> = [
		{
			date: new Date(),
			className: "selected__test",
			textOnHover: "Мастер работает в другом офисе",
			isDisabled: true,
		},
		{
			date: new Date("Sat Dec 17 2022 00:00:00 GMT+0300 (Moscow Standard Time"),
			className: "selected__test",
			textOnHover: "Мастер не работает в ето время",
		},
		{
			date: new Date("Sat Dec 16 2022 00:00:00 GMT+0300 (Moscow Standard Time"),
			className: "selected__test2",
		},
		{
			date: new Date("Sat Dec 15 2022 00:00:00 GMT+0300 (Moscow Standard Time"),
			className: "selected__test2",
		},
		{
			date: new Date("Sat Dec 13 2022 00:00:00 GMT+0300 (Moscow Standard Time"),
			className: "selected__test2",
		},
	];

	const change: DatePickerChangeHandler = (args) => {
		if (!Array.isArray(args.value)) {
			setDate(args.value);
		}
	};

	const getShow = () => {
		setShow(!show);
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

	const changeViewToMonth = () => {
		setView("month");
	};
	const onYearClick = (yearDate: Date) => {
		setDate(new Date(yearDate.getFullYear(), date.getMonth(), date.getDate()));
		setView("year");
	};
	return (
		<div className="App">
			<button onClick={getShow}>НАЖМИ МЕНЯ</button>
			{show && (
				<DatePicker
					date={date}
					onYearClick={onYearClick}
					changeCalendarView={changeCurrentCalendarView}
					locale={"ru-RU"}
					customizedDates={customizedDates}
					onDateClick={change}
					onMonthClick={changeViewToMonth}
					minDate={{
						date: new Date(),
						options: { isPassedDateIncluded: false },
					}}
					view={view}
					mode={"week"}
				/>
			)}
		</div>
	);
}

export default App;
