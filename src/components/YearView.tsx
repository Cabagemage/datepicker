import classNames from "classnames";
import { initYearCalendarClassNames } from "../core/utils/initYearCalendarClassNames";
import { YearViewProps } from "../core/types/DatePicker.typedef";
import { getFormattedMonthToLocale, isFirstDateEarlierThanSecondOne, subtract } from "../core/handlers";

const YearView = ({
	months,
	onMonthClick,
	defaultLocale,
	minDate,
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
			{months.map((item) => {
				const lastDateInMonth = new Date(item.getFullYear(), item.getMonth() + 1, 0);
				// we don't want to disable month for chose month have not passed
				const isLastDateInMonthEqualToPassedMinDate =
					minDate?.date.toDateString() === lastDateInMonth.toDateString();
				const disabledMonth = isLastDateInMonthEqualToPassedMinDate
					? minDate.date
					: subtract({ date: new Date(minDate?.date ?? new Date()), type: "month", count: 1 });
				const isDisabled =
					minDate !== undefined ? isFirstDateEarlierThanSecondOne(item, disabledMonth) : false;
				const isSelected = currentMonthIdx === item.getMonth();

				if (customMonthCellRenderProp !== undefined) {
					customMonthCellRenderProp({ date: item, onDateClick: onMonthClick });
				}

				return (
					<button
						onClick={() => {
							return onMonthClick(item);
						}}
						type="button"
						disabled={isDisabled}
						className={classNames(yearViewMonthCellClassName, {
							[yearViewMonthSelectedClassName]: isSelected && !isDisabled,
							[yearViewMonthCellDisabledClassName]: isDisabled,
						})}
						key={item.toString()}
					>
						{getFormattedMonthToLocale({
							month: item,
							locale: defaultLocale,
							format: "long",
						})}
					</button>
				);
			})}
		</div>
	);
};

export default YearView;
