import { DatePicker } from "../index";
import type { DatePickerClassNames, CustomizedDate } from "../index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useEffect, useState } from "react";
import { getDatesInRange, getMonday, getSunday } from "../core/handlers";
import { PreparedDatePicker } from "./PreparedDatePicker";
import "./cssExamples.css";
import "./animeCalendar.css";
export default {
	title: "DatePicker/customization",
	component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const CustomizedDatesTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const change = (date: Date) => {
		setDate(date);
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
					value={date}
					onSingleDateChange={change}
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
	const change = (date: Date) => {
		setDate(date);
	};

	return (
		<section>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					value={date}
					onSingleDateChange={change}
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
	const change = (date: Date) => {
		setDate(date);
	};
	const customClassNames: DatePickerClassNames = {
		month: {
			monthViewDay: "customMonthViewDay",
			monthViewMonthBody: "customMonthBody",
			monthViewWeekDays: "customWeekDays",
			monthViewWeekDaysListItem: "customWeekDay",
		},
		year: { yearViewMonthCell: "customViewMonthCell", yearViewBody: "yearViewBody" },
		decade: {
			decadeViewYearCell: "decadeViewYearCell",
			body: "decadeBody",
		},
		common: { wrapper: "customWrapper", arrowLeft: "arrLeft", arrowRight: "arrRight" },
	};

	return (
		<section>
			<p>I'm not designer, so, its only one variant what you can customize. (everything)</p>
			<div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
				<PreparedDatePicker
					customizationClassNames={customClassNames}
					value={date}
					onSingleDateChange={change}
					locale={"en"}
					mode={"single"}
					footerElement={<p>selectedDate is {date.toDateString()}</p>}
					view={"month"}
				/>
			</div>
		</section>
	);
};
const OtherLanguageTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const [currentLanguage, setCurrentLanguage] = useState<string>("ru");
	const change = (date: Date) => {
		setDate(date);
	};

	const options = [
		{ value: "ru-RU", label: "Russian" },
		{ value: "en", label: "English" },
		{ value: "hi", label: "Hindi" },
		{ value: "chi", label: "Chinese" },
	];

	return (
		<section>
			<div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "start" }}>
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
				<PreparedDatePicker
					value={date}
					onSingleDateChange={change}
					locale={currentLanguage}
					mode={"single"}
					view={"month"}
				/>
			</div>
		</section>
	);
};

const AnimeDatePickerTemplate: ComponentStory<typeof DatePicker> = () => {
	const [date, setDate] = useState(new Date());
	const [animeDates, setAnimeDates] = useState<Array<string>>([]);
	const change = (date: Date) => {
		setDate(date);
	};
	const getAnimeGirls = async () => {
		const animeFirstPart = await fetch("https://api.waifu.pics/many/sfw/waifu", {
			method: "POST",
			mode: "cors",
			cache: "default",
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({}),
		});
		const animeSecondPart = await fetch("https://api.waifu.pics/many/sfw/waifu", {
			method: "POST",
			mode: "cors",
			cache: "default",
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({}),
		});
		const animeFirstPartJson = (await animeFirstPart.json()) as { files: Array<string> };
		const animeSecondPartJSON = (await animeSecondPart.json()) as { files: Array<string> };
		setAnimeDates(animeFirstPartJson.files.concat(animeSecondPartJSON.files.slice(0, 8)));
	};

	useEffect(() => {
		getAnimeGirls();
	}, []);

	const customClassNames: DatePickerClassNames = {
		month: {
			monthViewDay: "customMonthViewDay",
			monthViewMonthBody: "customMonthBody",
			monthViewWeekDays: "customWeekDays",
			monthViewWeekDaysListItem: "customWeekDay",
		},
		year: { yearViewMonthCell: "customViewMonthCell", yearViewBody: "yearViewBody" },
		decade: {
			decadeViewYearCell: "decadeViewYearCell",
			body: "decadeBody",
		},
		common: { wrapper: "body", arrowLeft: "arrLeft", arrowRight: "arrRight" },
	};

	const changeMonth = async (cb: () => void) => {
		await getAnimeGirls();
		cb();
	};

	const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
	return (
		<section style={{ width: "100%", height: "100vh" }}>
			<h2>
				This is brightful example how deep you can customize anything here. No matter what you want to make
				and why.
			</h2>
			<PreparedDatePicker
				customizationClassNames={customClassNames}
				value={date}
				customHeaderRenderProp={({ toNextUnitNavAction, toPrevUnitNavAction, headerText }) => {
					return (
						<div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
							<button
								onClick={async () => {
									await changeMonth(toPrevUnitNavAction);
								}}
							>
								Prev
							</button>
							<span style={{ fontSize: 36 }}>{headerText}</span>
							<button
								onClick={async () => {
									await changeMonth(toNextUnitNavAction);
								}}
							>
								Next
							</button>
						</div>
					);
				}}
				customMonthViewRenderProp={({ month }) => {
					const animeListWithDates = animeDates.map((item, i) => {
						return {
							image: item,
							date: month[i],
						};
					});
					return (
						<>
							<div className={"animeWeedDays"}>
								{week.map((item) => {
									return (
										<div className={"animeWeekDay"} key={item}>
											{item}
										</div>
									);
								})}
							</div>
							<div className={"monthWrapper"}>
								{animeListWithDates.map((date) => {
									return (
										<div className={"anime"} key={date.date.toDateString()}>
											<span className={"anime__text"}>{date.date.toLocaleDateString()}</span>
											<div className={"anime__description"}></div>
											<img
												className={"animeImg"}
												src={date.image}
												alt={date.date.toLocaleDateString()}
												loading={"lazy"}
											/>
										</div>
									);
								})}
							</div>
						</>
					);
				}}
				onSingleDateChange={change}
				locale={"en"}
				mode={"single"}
				view={"month"}
			/>
		</section>
	);
};

export const AnimeCalendar = AnimeDatePickerTemplate.bind({});
export const OtherLanguage = OtherLanguageTemplate.bind({});
export const CustomCalendarClassNames = CustomCalendarClassNamesTemplate.bind({});
export const CustomHeader = CustomHeaderTemplate.bind({});
export const CustomDates = CustomizedDatesTemplate.bind({});
