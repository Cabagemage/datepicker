import { isFirstDateEarlierThanSecondOne, ONE_YEAR, subtract } from "../core";
import classNames from "classnames";
import { DecadeViewProps } from "../core/types/DatePicker.typedef";

const DecadeView = ({
	years,
	onYearClick,
	minDate,
	activeYear,
	customDecadeClassNames,
	customYearCellRenderProp,
}: DecadeViewProps) => {
	const decadeViewBodyClassName = customDecadeClassNames?.body
		? customDecadeClassNames.body
		: "datePicker-body";
	const decadeViewCellClassName = customDecadeClassNames?.decadeViewYearCell
		? customDecadeClassNames.decadeViewYearCell
		: "datePicker-body__month-cell";
	const decadeCellDisabledClassName = customDecadeClassNames?.decadeViewCellDisabled
		? customDecadeClassNames.decadeViewCellDisabled
		: "datePicker-body__day_disabled";
	const decadeCellSelected = customDecadeClassNames?.decadeViewCellSelected
		? customDecadeClassNames.decadeViewCellSelected
		: "datePicker-body__year_selected";
	return (
		<div className={decadeViewBodyClassName}>
			{years.map((item) => {
				const lastDateInMonth = new Date(item.getFullYear(), item.getMonth() + 1, 0);
				// we don't want to disable year for chose year have not passed
				const isLastDateInMonthEqualToPassedMinDate =
					minDate?.date.toDateString() === lastDateInMonth.toDateString();
				const year = isLastDateInMonthEqualToPassedMinDate
					? minDate.date
					: subtract({ date: new Date(minDate?.date ?? new Date()), type: "year", count: ONE_YEAR });
				const isDisabled = minDate !== undefined ? isFirstDateEarlierThanSecondOne(item, year) : false;

				if (customYearCellRenderProp !== undefined) {
					customYearCellRenderProp({ date: item, onDateClick: onYearClick });
				}
				const isSelected = activeYear === item.getFullYear();
				return (
					<button
						type="button"
						onClick={() => {
							return onYearClick(item);
						}}
						disabled={isDisabled}
						className={classNames(decadeViewCellClassName, {
							[decadeCellDisabledClassName]: isDisabled,
							[decadeCellSelected]: isSelected,
						})}
						key={item.toString()}
					>
						{item.getFullYear()}
					</button>
				);
			})}
		</div>
	);
};

export default DecadeView;
