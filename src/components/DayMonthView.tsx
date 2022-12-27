import classNames from "classnames";
import {
	add,
	formatDate,
	getFormattedShortDayForMonthView,
	isFirstDateEarlierThanSecondOne,
	subtract,
} from "../core/handlers";
import { CustomizedDate, DatePickerMonthViewClassNames, AvailableDate } from "../core/types";
import { initMonthCalendarClassNames } from "../core/utils/initMonthCalendarClassNames";
import { WeekendDays } from "../core/types/DatePicker.typedef";

type DayMonthViewProps = {
	date: Date;
	currentMonthIdx: number;
	customizedDates?: Array<CustomizedDate>;
	minDate?: AvailableDate;
	maxDate?: AvailableDate;
	weekendDays?: WeekendDays;
	bannedDates?: Array<string>;
	customMonthClassNames?: Partial<DatePickerMonthViewClassNames>;
	selectedDates: Array<string>;
	onDayClick: (date: Date) => void;
};

export const DayMonthView = ({
	currentMonthIdx,
	weekendDays,
	customizedDates,
	date,
	minDate,
	maxDate,
	selectedDates,
	bannedDates,
	customMonthClassNames,
	onDayClick,
}: DayMonthViewProps) => {
	const isDateNotRelatedToCurrentMonth = date.getMonth() !== currentMonthIdx;
	const customizedDate = customizedDates?.find((customizedDate) => {
		return formatDate(date) === formatDate(customizedDate.date);
	});
	const minDateValue =
		minDate?.options?.isPassedDateIncluded === true
			? add({
					date: minDate?.date ?? new Date(),
					type: "day",
					count: 1,
			  })
			: minDate?.date ?? new Date();
	const maxDateValue =
		maxDate?.options?.isPassedDateIncluded === true
			? subtract({
					date: maxDate?.date ?? new Date(),
					type: "day",
					count: 1,
			  })
			: maxDate?.date ?? new Date();
	const isDisabledByMinDate =
		minDate !== undefined ? isFirstDateEarlierThanSecondOne(date, minDateValue) : false;
	const isDisabledByMaxDate =
		maxDate !== undefined ? isFirstDateEarlierThanSecondOne(maxDateValue, date) : false;
	const isSelected = selectedDates.includes(formatDate(date));
	const isToday = new Date().toDateString() === date.toDateString();
	const isCustomizedDateIsDisabled = customizedDate !== undefined ? customizedDate.isDisabled : false;
	const isDateBanned =
		(bannedDates !== undefined && bannedDates.includes(formatDate(date))) || isCustomizedDateIsDisabled;
	const isWeekendDay = weekendDays !== undefined && weekendDays.weekendDays.includes(date.getDay());
	const isWeekendDaysShouldBeDisabled = weekendDays !== undefined ? weekendDays.shouldBeDisabled : false;
	const customizedDateClassName = customizedDate !== undefined ? customizedDate.className : "";
	const {
		defaultMonthDayCellBackgroundClassName,
		monthViewDateIsNotRelatedToMonthClassName,
		monthViewIsTodayClassName,
		monthDayCellActiveClassName,
		monthDayCellDisabledClassName,
		monthDayCellTextClassName,
		monthDayCellClassName,
		monthWeekendDayClassName,
	} = initMonthCalendarClassNames(customMonthClassNames);

	return (
		<button
			type="button"
			onClick={() => {
				return onDayClick(date);
			}}
			title={customizedDate !== undefined ? customizedDate.textOnHover : ""}
			value={date.toString()}
			className={classNames(
				[monthDayCellClassName],
				customizedDateClassName,
				{
					[defaultMonthDayCellBackgroundClassName]: customizedDate === undefined,
				},
				{ [monthWeekendDayClassName]: isWeekendDay },
				{
					[monthViewIsTodayClassName]: isToday,
				},
				{
					[monthViewDateIsNotRelatedToMonthClassName]: isDateNotRelatedToCurrentMonth,
				},
				{
					[monthDayCellActiveClassName]: isSelected && !isDateBanned,
					[monthDayCellDisabledClassName]:
						isDisabledByMinDate ||
						isDisabledByMaxDate ||
						isDateBanned ||
						(isWeekendDaysShouldBeDisabled && isWeekendDay),
				}
			)}
			key={date.toString()}
			disabled={
				isDisabledByMinDate ||
				isDateBanned ||
				isDisabledByMaxDate ||
				(isWeekendDaysShouldBeDisabled && isWeekendDay)
			}
		>
			<span className={monthDayCellTextClassName}>{getFormattedShortDayForMonthView(date)}</span>
		</button>
	);
};
