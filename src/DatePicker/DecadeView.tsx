import { isFirstDateEarlierThanSecondOne, ONE_YEAR, subtract } from "../core";
import classNames from "classnames";
import { DecadeViewProps } from "../core/types/DatePicker.typedef";

const DecadeView = ({
	years,
	onYearClick,
	minDate,
	customDecadeClassNames,
	customYearCellRenderProp,
}: DecadeViewProps) => {
	const yearViewBodyClassName = customDecadeClassNames?.body
		? customDecadeClassNames.body
		: "datePicker-body";
	const yearViewYearCellClassName = customDecadeClassNames?.decadeViewYearCell
		? customDecadeClassNames.decadeViewYearCell
		: "datePicker-body__month-cell";
	const yearViewMonthCellDisabledClassName = customDecadeClassNames?.decadeViewCellDisabled
		? customDecadeClassNames.decadeViewCellDisabled
		: "datePicker-body__day_disabled";

	return (
		<div className={yearViewBodyClassName}>
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
					customYearCellRenderProp({ date: item });
				}

				return (
					<button
						type="button"
						onClick={() => {
							return onYearClick(item);
						}}
						disabled={isDisabled}
						className={classNames(yearViewYearCellClassName, {
							[yearViewMonthCellDisabledClassName]: isDisabled,
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
