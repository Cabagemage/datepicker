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
	selectedDates,
	onSelectDay,
	customizedDates,
	customMonthClassNames,
	minDate,
	disabledDates,
	weekendDates,
	customDayCellRenderProp,
}: MonthViewProps) => {
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
				console.info(isToday);
				const isCustomizedDateIsDisabled = customizedDate !== undefined ? customizedDate.isDisabled : false;
				const isDateDisabled =
					(mappedBannedDates !== undefined && mappedBannedDates.includes(formatDate(item))) ||
					isCustomizedDateIsDisabled;
				const isWeekendDay = weekendDates !== undefined && weekendDates.includes(item.getDay());
				const customizedDateClassName = customizedDate !== undefined ? customizedDate.className : "";

				if (customDayCellRenderProp !== undefined) {
					customDayCellRenderProp({ date: item, onDateClick: onSelectDay });
				}

				return (
					<button
						type="button"
						onClick={() => {
							return onSelectDay(item);
						}}
						title={customizedDate !== undefined ? customizedDate.textOnHover : ""}
						value={item.toString()}
						className={classNames(
							[monthDayCellClassName],
							customizedDateClassName,
							{
								[defaultMonthDayCellBackgroundClassName]: customizedDate === undefined,
							},
							{
								[monthViewIsToday]: isToday,
							},
							{
								[monthViewDateIsNotRelatedToMonthClassName]: isDateNotRelatedToCurrentMonth,
							},
							{
								[monthDayCellActiveClassName]: isSelected && !isDateDisabled && !isWeekendDay,
								[monthDayCellDisabledClassName]: isDisabled || isDateDisabled || isWeekendDay,
							}
						)}
						key={item.toString()}
						disabled={isDisabled || isDateDisabled || isWeekendDay}
					>
						<span className={monthDayCellTextClassName}>{getFormattedShortDayForMonthView(item)}</span>
					</button>
				);
			})}
		</div>
	);
};
