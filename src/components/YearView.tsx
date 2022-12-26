import classNames from "classnames";
import { initYearCalendarClassNames } from "../core/utils/initYearCalendarClassNames";
import { YearViewProps } from "../core/types/DatePicker.typedef";
import {
	formatDate,
	getFormattedMonthToLocale,
	isFirstDateEarlierThanSecondOne,
	subtract,
} from "../core/handlers";

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
			{months.map((item) => {
				const lastDateInMonth = new Date(item.getFullYear(), item.getMonth() + 1, 0);
				// we don't want to disable month for chose month have not passed
				const isLastDateInMonthEqualToPassedMinDate =
					minDate !== undefined && formatDate(minDate?.date) === formatDate(lastDateInMonth);
				const disabledMonthByMinDate = isLastDateInMonthEqualToPassedMinDate
					? minDate.date
					: subtract({ date: new Date(minDate?.date ?? new Date()), type: "month", count: 1 });
				const isDisabledByMinDate =
					minDate !== undefined ? isFirstDateEarlierThanSecondOne(item, disabledMonthByMinDate) : false;

				const isDisabledByMaxDate =
					maxDate !== undefined ? isFirstDateEarlierThanSecondOne(maxDate.date, item) : false;

				const isSelected = currentMonthIdx === item.getMonth();

				if (customMonthCellRenderProp !== undefined) {
					customMonthCellRenderProp({ date: item, onDateClick: onMonthClick });
				}

				return (
					<button
						onClick={() => {
							return onMonthClick(item);
						}}
						value={item.toDateString()}
						type="button"
						disabled={isDisabledByMinDate || isDisabledByMaxDate}
						className={classNames(yearViewMonthCellClassName, {
							[yearViewMonthSelectedClassName]: isSelected && !isDisabledByMinDate && !isDisabledByMaxDate,
							[yearViewMonthCellDisabledClassName]: isDisabledByMinDate || isDisabledByMaxDate,
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
