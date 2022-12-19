import classNames from "classnames";
import {
	add,
	formatDate,
	getDatesInRange,
	getFormattedShortDayForMonthView,
	getMonday,
	getSunday,
	isFirstDateEarlierThanSecondOne,
} from "./core/handlers";
import { formatDayOfWeek } from "./core/handlers/formatDayOfWeek";
import { MonthViewProps } from "./core/types/DatePicker.typedef";
import { useState } from "react";

const daysOfWeek = () => {
	const startDate = getMonday(new Date());
	const endDate = getSunday(new Date());
	const dates = getDatesInRange(startDate, endDate);
	return dates;
};
const week = daysOfWeek();

export const MonthView = ({
	locale,
	month,
	currentMonth,
	mode,
	value,
	onDateChange,
	customizedDates,
	customMonthClassNames,
	minDate,
	disabledDates,
	weekendDays,
	customDayCellRenderProp,
}: MonthViewProps) => {
	const defineDefaultSelectedDates = () => {
		if (mode === "week" && value instanceof Date) {
			const monday = getMonday(value);
			const sunday = getSunday(value);
			const formattedDates = getDatesInRange(monday, sunday).map((item) => {
				return formatDate(item);
			});
			return formattedDates;
		}

		if (value instanceof Date) {
			return [value];
		}

		if (Array.isArray(value)) {
			const isFirstDateDefined = value[0] !== undefined ? value[0] : false;
			const isSecondDateDefined = value[1] !== undefined ? value[1] : false;
			if (isFirstDateDefined) {
				return [value[0]];
			}
			if (isFirstDateDefined && isSecondDateDefined) {
				const firstDate = value[0];
				const secondDate = value[1];
				const start = new Date(firstDate) < secondDate ? firstDate : secondDate;
				const end = new Date(secondDate) > firstDate ? secondDate : firstDate;
				return getDatesInRange(start, end);
			}
		} else {
			if (value.start !== null && value.end !== null) {
				return getDatesInRange(value.start, value.end);
			}
		}
		return [];
	};

	const defaultSelectedDates = defineDefaultSelectedDates();
	const [selectedDates, setSelectedDates] = useState<Array<string | Date>>(defaultSelectedDates);
	const selectDayForInterval = (date: Date) => {
		if (value instanceof Date || Array.isArray(value)) {
			return;
		}
		const isDateIncluded = selectedDates.includes(formatDate(date));
		if (value.start && value.end && isDateIncluded) {
			onDateChange({ value: { start: null, end: null } });
			setSelectedDates([]);
		}
		if (value.start && value.end && !isDateIncluded) {
			onDateChange({ value: { start: date, end: null } });
			setSelectedDates([formatDate(date)]);
		}
		if (value.start === null) {
			onDateChange({ value: { start: date, end: value.end } });
			setSelectedDates([formatDate(date)]);
		}

		if (value.start !== null && value.end === null) {
			onDateChange({ value: { start: value.start, end: date } });
			const start = new Date(value.start) < date ? value.start : date;
			const end = new Date(date) > value.start ? date : value.start;
			const formattedDates = getDatesInRange(start, end).map((item) => {
				return formatDate(item);
			});
			setSelectedDates(formattedDates);
			onDateChange({ value: [start, end] });
		}
	};
	const selectDayForWeek = (date: Date) => {
		const firstDate = getMonday(date);
		const lastDate = getSunday(date);
		onDateChange({ value: { start: firstDate, end: lastDate } });
		const formattedDates = getDatesInRange(firstDate, lastDate).map((item) => {
			return formatDate(item);
		});
		setSelectedDates(formattedDates);
		onDateChange({
			value: date,
		});
	};
	const selectSingleDate = (date: Date, formattedDate: string) => {
		setSelectedDates([formattedDate]);
		onDateChange({ value: date });
	};
	const mappedSelectedDatesToFormattedValue = selectedDates.map((item) => {
		return formatDate(new Date(item));
	});
	const selectDayForPartial = (date: Date) => {
		if (mappedSelectedDatesToFormattedValue.includes(formatDate(date))) {
			const filteredDates = selectedDates.filter((item) => {
				return formatDate(new Date(date)) !== formatDate(new Date(item));
			});
			setSelectedDates(filteredDates);
			if (selectedDates.length > 0) {
				onDateChange({
					value: selectedDates
						.filter((item) => {
							return item !== formatDate(date);
						})
						.map((date) => {
							return new Date(date);
						}),
				});
			}

			return;
		}
		setSelectedDates((prev) => {
			return [...prev, formatDate(date)];
		});
		const mappedSelectedDatesToRawDates = selectedDates.map((item) => {
			return new Date(item);
		});
		onDateChange({ value: [...mappedSelectedDatesToRawDates, new Date(date)] });
	};

	const selectDay = (date: Date) => {
		const formattedDate = formatDate(date);
		if (mode === "single") {
			selectSingleDate(date, formattedDate);
		}
		if (mode === "partial") {
			selectDayForPartial(date);
		}
		if (mode === "interval") {
			selectDayForInterval(date);
		}
		if (mode === "week") {
			selectDayForWeek(date);
		}
	};

	const mappedBannedDates = disabledDates?.map((item) => {
		return formatDate(new Date(item));
	});

	const formattedSelectedDates = selectedDates.map((item) => {
		return formatDate(new Date(item));
	});

	const monthDayCellClassName = customMonthClassNames?.monthViewDay
		? customMonthClassNames.monthViewDay
		: `datePicker-body__day`;

	const monthDayCellActiveClassName =
		customMonthClassNames?.monthViewDayActive !== undefined
			? customMonthClassNames.monthViewDayActive
			: "datePicker__selectedDate";

	const monthDayCellDisabledClassName = customMonthClassNames?.monthViewDisabledDate
		? customMonthClassNames.monthViewDisabledDate
		: "datePicker-body__day_disabled";

	const monthDayCellTextClassName = customMonthClassNames?.monthViewDayDayText
		? customMonthClassNames.monthViewDayDayText
		: "datePicker-body__day-text";

	const defaultMonthDayCellBackgroundClassName = customMonthClassNames?.monthViewDayDefaultBackgroundClassName
		? customMonthClassNames.monthViewDayDefaultBackgroundClassName
		: "datePicker-body__day_transparent";

	const monthViewMonthBodyClassName =
		customMonthClassNames?.monthViewMonthBody !== undefined
			? customMonthClassNames.monthViewMonthBody
			: "datePicker-body";

	const monthViewWeekDaysClassName = customMonthClassNames?.monthViewWeekDays
		? customMonthClassNames.monthViewWeekDays
		: "datePicker-weekdays";
	const monthViewWeekDaysListItemClassName = customMonthClassNames?.monthViewWeekDaysListItem
		? customMonthClassNames.monthViewWeekDaysListItem
		: "datePicker-weekdays__day";
	const monthViewDateIsNotRelatedToMonthClassName = customMonthClassNames?.monthViewDateIsNotRelatedToMonth
		? customMonthClassNames.monthViewDateIsNotRelatedToMonth
		: "datePicker__inactive-text";

	const monthViewIsToday = customMonthClassNames?.monthViewToday
		? customMonthClassNames.monthViewToday
		: "datePicker__month-today";

	// in default theme, weekend Day has no styling
	const monthWeekendDayCn = customMonthClassNames?.monthWeekendDay
		? customMonthClassNames.monthWeekendDay
		: "";

	return (
		<div className={monthViewMonthBodyClassName}>
			<ul className={monthViewWeekDaysClassName}>
				{week.map((item, idx) => {
					return (
						<li className={monthViewWeekDaysListItemClassName} key={idx}>
							{formatDayOfWeek(item, locale)}
						</li>
					);
				})}
			</ul>
			{month.map((item) => {
				const isDateNotRelatedToCurrentMonth = item.getMonth() !== currentMonth;
				const customizedDate = customizedDates?.find((customizedDate) => {
					return formatDate(item) === formatDate(customizedDate.date);
				});
				const endDate =
					minDate?.options?.isPassedDateIncluded === true
						? add({
								date: minDate?.date ?? new Date(),
								type: "day",
								count: 1,
						  })
						: minDate?.date ?? new Date();

				const isDisabled = minDate !== undefined ? isFirstDateEarlierThanSecondOne(item, endDate) : false;
				const isSelected = formattedSelectedDates.includes(formatDate(item));
				const isToday = new Date().toDateString() === item.toDateString();
				const isCustomizedDateIsDisabled = customizedDate !== undefined ? customizedDate.isDisabled : false;
				const isDateDisabled =
					(mappedBannedDates !== undefined && mappedBannedDates.includes(formatDate(item))) ||
					isCustomizedDateIsDisabled;
				const isWeekendDay = weekendDays !== undefined && weekendDays.weekendDays.includes(item.getDay());
				const isWeekendDaysShouldBeDisabled =
					weekendDays !== undefined ? weekendDays.shouldBeDisabled : false;
				const customizedDateClassName = customizedDate !== undefined ? customizedDate.className : "";

				if (customDayCellRenderProp !== undefined) {
					customDayCellRenderProp({ date: item, onDateClick: selectDay });
				}

				return (
					<button
						type="button"
						onClick={() => {
							return selectDay(item);
						}}
						title={customizedDate !== undefined ? customizedDate.textOnHover : ""}
						value={item.toString()}
						className={classNames(
							[monthDayCellClassName],
							customizedDateClassName,
							{
								[defaultMonthDayCellBackgroundClassName]: customizedDate === undefined,
							},
							{ [monthWeekendDayCn]: isWeekendDay },
							{
								[monthViewIsToday]: isToday,
							},
							{
								[monthViewDateIsNotRelatedToMonthClassName]: isDateNotRelatedToCurrentMonth,
							},
							{
								[monthDayCellActiveClassName]: isSelected && !isDateDisabled,
								[monthDayCellDisabledClassName]:
									isDisabled || isDateDisabled || (isWeekendDaysShouldBeDisabled && isWeekendDay),
							}
						)}
						key={item.toString()}
						disabled={isDisabled || isDateDisabled || (isWeekendDaysShouldBeDisabled && isWeekendDay)}
					>
						<span className={monthDayCellTextClassName}>{getFormattedShortDayForMonthView(item)}</span>
					</button>
				);
			})}
		</div>
	);
};
