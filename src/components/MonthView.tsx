import { formatDate, getDatesInRange, getMonday, getSunday } from "../core/handlers";
import { MonthViewProps } from "../core/types/DatePicker.typedef";
import { initMonthCalendarClassNames } from "../core/utils/initMonthCalendarClassNames";
import { formatDayOfWeek } from "../core/handlers/formatDayOfWeek";
import { DayMonthView } from "./DayMonthView";

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

	const formattedSelectedDates = selectedDates.map((item) => {
		return formatDate(new Date(item));
	});

	const { monthViewMonthBodyClassName, monthViewWeekDaysClassName, monthViewWeekDaysListItemClassName } =
		initMonthCalendarClassNames(customMonthClassNames);
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
				if (customDayCellRenderProp !== undefined) {
					customDayCellRenderProp({ date: item, onDateClick: onDateChange });
				}
				return (
					<DayMonthView
						key={item.toString()}
						date={item}
						minDate={minDate}
						maxDate={maxDate}
						bannedDates={mappedBannedDates}
						weekendDays={weekendDays}
						customMonthClassNames={customMonthClassNames}
						currentMonthIdx={currentMonth}
						customizedDates={customizedDates}
						selectedDates={formattedSelectedDates}
						onDayClick={onDateChange}
					/>
				);
			})}
		</div>
	);
};
