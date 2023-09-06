import {
	add,
	formatDate,
	getDatesInRange,
	getMonday,
	getSunday,
	isFirstDateEarlierThanSecondOne,
	subtract,
} from "../core/handlers";
import type { MonthViewProps } from "../core/types/DatePicker.typedef";
import { initMonthCalendarClassNames } from "../core/utils/initMonthCalendarClassNames";
import { formatDayOfWeek } from "../core/handlers/formatDayOfWeek";
import { DayCell } from "../atoms/DayCell";

const daysOfWeek = () => {
	const startDate = getMonday(new Date());
	const endDate = getSunday(new Date());
	return getDatesInRange(startDate, endDate);
};
const week = daysOfWeek();

export const MonthView = ({
	locale,
	month,
	currentMonth,
	onDateChange,
	customizedDates,
	customMonthClassNames,
	minDate,
	disabledDates,
	selectedDates,
	maxDate,
	weekendDays,
	customDayCellRenderProp,
}: MonthViewProps) => {
	const mappedBannedDates = disabledDates?.map((item) => {
		return formatDate(new Date(item));
	});

	const { monthViewMonthBodyClassName, monthViewWeekDaysClassName, monthViewWeekDaysListItemClassName } =
		initMonthCalendarClassNames(customMonthClassNames);

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

	return (
		<div className={monthViewMonthBodyClassName}>
			<ul className={monthViewWeekDaysClassName}>
				{week.map((weekDay, idx) => {
					return (
						<li className={monthViewWeekDaysListItemClassName} key={idx}>
							{formatDayOfWeek(weekDay, locale)}
						</li>
					);
				})}
			</ul>
			{month.map((date) => {
				if (customDayCellRenderProp !== undefined) {
					customDayCellRenderProp({ date: date, onDateClick: onDateChange });
				}
				const customizedDate = customizedDates?.find((customizedDate) => {
					return formatDate(date) === formatDate(customizedDate.date);
				});
				const isDisabledByMinDate =
					minDate !== undefined ? isFirstDateEarlierThanSecondOne(date, minDateValue) : false;
				const isDisabledByMaxDate =
					maxDate !== undefined ? isFirstDateEarlierThanSecondOne(maxDateValue, date) : false;
				const isSelected = selectedDates.includes(formatDate(date));
				const isToday = new Date().toDateString() === date.toDateString();
				const isCustomizedDateIsDisabled = customizedDate !== undefined ? customizedDate.isDisabled : false;
				const isWeekendDay = weekendDays !== undefined && weekendDays.weekendDays.includes(date.getDay());
				const isWeekendDaysShouldBeDisabled =
					weekendDays !== undefined ? weekendDays.shouldBeDisabled : false;
				const isDateNotRelatedToCurrentMonth = date.getMonth() !== currentMonth;

				const isDateBannedConditions = () => {
					if (mappedBannedDates === undefined) {
						return;
					}
					const conditionsForBannedDates = [
						mappedBannedDates.includes(formatDate(date)),
						isCustomizedDateIsDisabled,
					];

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
				const isDisabled = isMonthDayIsDisabled();
				return (
					<DayCell
						value={date}
						isActive={isMonthDayIsActive}
						customizedDate={customizedDate}
						customMonthClassNames={customMonthClassNames}
						isWeekendDay={isWeekendDay}
						isDisabled={isDisabled}
						isToday={isToday}
						isDateNotRelatedToCurrentMonth={isDateNotRelatedToCurrentMonth}
						onDayClick={() => {
							return onDateChange(date);
						}}
					/>
				);
			})}
		</div>
	);
};
