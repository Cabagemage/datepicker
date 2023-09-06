import { getFormattedShortDayForMonthView } from "../core/handlers";
import { initMonthCalendarClassNames } from "../core/utils/initMonthCalendarClassNames";
import type { CustomizedDate, DatePickerMonthViewClassNames } from "../core/types";
import { memo } from "react";
import { classNamesResolver } from "../core/utils/classNamesResolver";

type DayCell = {
	onDayClick: () => void;
	customMonthClassNames?: Partial<DatePickerMonthViewClassNames>;
	isWeekendDay: boolean;
	isToday: boolean;
	isActive: boolean;
	isDisabled: boolean;
	customizedDate?: CustomizedDate;
	isDateNotRelatedToCurrentMonth: boolean;
	value: Date;
};
export const DayCell = memo(
	({
		onDayClick,
		value,
		isWeekendDay,
		isToday,
		isActive,
		isDisabled,
		isDateNotRelatedToCurrentMonth,
		customMonthClassNames,
		customizedDate,
	}: DayCell) => {
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
				onClick={onDayClick}
				title={customizedDate?.textOnHover}
				value={value.toString()}
				className={classNamesResolver(
					monthDayCellClassName,
					customizedDate?.className,
					{
						[defaultMonthDayCellBackgroundClassName]: !customizedDate,
					},
					{ [monthWeekendDayClassName]: isWeekendDay },
					{
						[monthViewIsTodayClassName]: isToday,
					},
					{
						[monthViewDateIsNotRelatedToMonthClassName]: isDateNotRelatedToCurrentMonth,
					},
					{
						[monthDayCellActiveClassName]: isActive,
						[monthDayCellDisabledClassName]: isDisabled,
					}
				)}
				key={value.toString()}
				disabled={isDisabled}
			>
				<span className={monthDayCellTextClassName}>{getFormattedShortDayForMonthView(value)}</span>
			</button>
		);
	}
);
