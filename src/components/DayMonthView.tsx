import classNames from "classnames";
import {
	add,
	formatDate,
	getFormattedShortDayForMonthView,
	isFirstDateEarlierThanSecondOne,
} from "../core/handlers";
import { CustomizedDate, DatePickerMonthViewClassNames, MinDate } from "../core/types";
import { initMonthCalendarClassNames } from "../core/utils/initMonthCalendarClassNames";
import { WeekendDays } from "../core/types/DatePicker.typedef";

type DayMonthViewProps = {
	date: Date;
	currentMonthIdx: number;
	customizedDates?: Array<CustomizedDate>;
	minDate?: MinDate;
	weekendDays?: WeekendDays;
	bannedDates?: Array<string>;
	customMonthClassNames?: Partial<DatePickerMonthViewClassNames>;
	selectedDates: Array<string>;
	onDayClick: (date: Date) => void;
};

const DayMonthView = ({
	currentMonthIdx,
	weekendDays,
	customizedDates,
	date,
	minDate,
	selectedDates,
	bannedDates,
	customMonthClassNames,
	onDayClick,
}: DayMonthViewProps) => {
	const isDateNotRelatedToCurrentMonth = date.getMonth() !== currentMonthIdx;
	const customizedDate = customizedDates?.find((customizedDate) => {
		return formatDate(date) === formatDate(customizedDate.date);
	});
	const endDate =
		minDate?.options?.isPassedDateIncluded === true
			? add({
					date: minDate?.date ?? new Date(),
					type: "day",
					count: 1,
			  })
			: minDate?.date ?? new Date();

	const isDisabled = minDate !== undefined ? isFirstDateEarlierThanSecondOne(date, endDate) : false;
	const isSelected = selectedDates.includes(formatDate(date));
	const isToday = new Date().toDateString() === date.toDateString();
	const isCustomizedDateIsDisabled = customizedDate !== undefined ? customizedDate.isDisabled : false;
	const isDateDisabled =
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
					[monthDayCellActiveClassName]: isSelected && !isDateDisabled,
					[monthDayCellDisabledClassName]:
						isDisabled || isDateDisabled || (isWeekendDaysShouldBeDisabled && isWeekendDay),
				}
			)}
			key={date.toString()}
			disabled={isDisabled || isDateDisabled || (isWeekendDaysShouldBeDisabled && isWeekendDay)}
		>
			<span className={monthDayCellTextClassName}>{getFormattedShortDayForMonthView(date)}</span>
		</button>
	);
};

export default DayMonthView;
