import { formatDate, getFormattedMonthToLocale, isFirstDateEarlierThanSecondOne, subtract } from "../core";
import classNames from "classnames";
import { YearViewProps } from "../core/types/DatePicker.typedef";

const YearView = ({
	months,
	onMonthClick,
	defaultLocale,
	minDate,
	selectedDates,
	customYearClassNames,
	customMonthCellRenderProp,
}: YearViewProps) => {
	const yearViewBodyClassName = customYearClassNames?.yearViewBody
		? customYearClassNames.yearViewBody
		: "datePicker-body";
	const yearViewMonthCellClassName = customYearClassNames?.yearViewMonthCell
		? customYearClassNames.yearViewMonthCell
		: "datePicker-body__month-cell";
	const yearViewMonthCellDisabledClassName = customYearClassNames?.yearViewCellDisabled
		? customYearClassNames.yearViewCellDisabled
		: "datePicker-body__day_disabled";
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
				const isSelected = selectedDates.includes(formatDate(item));

				if (customMonthCellRenderProp !== undefined) {
					customMonthCellRenderProp({ date: item });
				}

				return (
					<button
						onClick={() => {
							return onMonthClick(item);
						}}
						type="button"
						disabled={isDisabled}
						className={classNames(yearViewMonthCellClassName, {
							selected: isSelected && !isDisabled,
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
