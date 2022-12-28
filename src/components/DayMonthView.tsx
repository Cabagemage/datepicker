import classNames from "classnames";
import {
	add,
	formatDate,
	getFormattedShortDayForMonthView,
	isFirstDateEarlierThanSecondOne,
	subtract,
} from "../core/handlers";
import type { CustomizedDate, DatePickerMonthViewClassNames, AvailableDate } from "../core/types";
import { initMonthCalendarClassNames } from "../core/utils/initMonthCalendarClassNames";
import type { WeekendDays } from "../core/types/DatePicker.typedef";

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

	const isDateBannedConditions = () => {
		if (bannedDates === undefined) {
			return;
		}
		const conditionsForBannedDates = [bannedDates.includes(formatDate(date)), isCustomizedDateIsDisabled];

		return conditionsForBannedDates.some((condition) => {
			return condition;
		});
	};
	const isMonthDayIsDisabled = () => {
		const conditionsToDisableMonthDay = [
			isDisabledByMinDate,
			isDisabledByMaxDate,
			isDateBannedConditions(),
			isWeekendDaysShouldBeDisabled && isWeekendDay,
		];

		return conditionsToDisableMonthDay.some((condition) => {
			return condition;
		});
	};

	const isMonthDayIsActive = isSelected && !isDateBannedConditions();
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
					[monthDayCellActiveClassName]: isMonthDayIsActive,
					[monthDayCellDisabledClassName]: isMonthDayIsDisabled(),
				}
			)}
			key={date.toString()}
			disabled={isMonthDayIsDisabled()}
		>
			<span className={monthDayCellTextClassName}>{getFormattedShortDayForMonthView(date)}</span>
		</button>
	);
};
