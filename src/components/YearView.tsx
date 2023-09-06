import { initYearCalendarClassNames } from "../core/utils/initYearCalendarClassNames";
import type { YearViewProps } from "../core/types/DatePicker.typedef";
import { formatDate, isFirstDateEarlierThanSecondOne, subtract } from "../core/handlers";
import { MonthCell } from "../atoms/MonthCell";

const YearView = ({
	months,
	onMonthClick,
	defaultLocale,
	minDate,
	maxDate,
	currentMonthIdx,
	customYearClassNames,
	customMonthCellRenderProp,
}: YearViewProps) => {
	const {
		yearViewMonthSelectedClassName,
		yearViewMonthCellDisabledClassName,
		yearViewMonthCellClassName,
		yearViewBodyClassName,
	} = initYearCalendarClassNames(customYearClassNames);
	return (
		<div className={yearViewBodyClassName}>
			{months.map((month) => {
				const lastDateInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
				// we don't want to disable month for chose month have not passed
				const isLastDateInMonthEqualToPassedMinDate =
					minDate !== undefined && formatDate(minDate?.date) === formatDate(lastDateInMonth);
				const disabledMonthByMinDate = isLastDateInMonthEqualToPassedMinDate
					? minDate.date
					: subtract({ date: new Date(minDate?.date ?? new Date()), type: "month", count: 1 });
				const isDisabledByMinDate =
					minDate !== undefined ? isFirstDateEarlierThanSecondOne(month, disabledMonthByMinDate) : false;

				const isDisabledByMaxDate =
					maxDate !== undefined ? isFirstDateEarlierThanSecondOne(maxDate.date, month) : false;

				const isSelected = currentMonthIdx === month.getMonth();
				const isDisabled = isDisabledByMinDate || isDisabledByMaxDate;

				if (customMonthCellRenderProp !== undefined) {
					customMonthCellRenderProp({ date: month, onDateClick: onMonthClick });
				}
				return (
					<MonthCell
						formatMonthParams={{
							month: month,
							locale: defaultLocale,
							format: "long",
						}}
						value={month}
						isDisabled={isDisabled}
						isSelected={isSelected}
						onClick={() => {
							return onMonthClick(month);
						}}
						classes={{
							defaultClassName: yearViewMonthCellClassName,
							disabledClassName: yearViewMonthCellDisabledClassName,
							selectedClassName: yearViewMonthSelectedClassName,
						}}
					/>
				);
			})}
		</div>
	);
};

export default YearView;
