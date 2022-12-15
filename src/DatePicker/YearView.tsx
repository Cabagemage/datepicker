import { formatDate, getFormattedMonthToLocale, isFirstDateEarlierThanSecondOne, subtract } from "../core";

import classNames from "classnames";
import type { MinDate } from "../core";

type YearViewProps = {
	months: Array<Date>;
	onMonthClick: (date: Date) => void;
	defaultLocale: Intl.LocalesArgument;
	minDate?: MinDate;
	selectedDates: Array<string | Date>;
};

const YearView = ({ months, onMonthClick, defaultLocale, minDate, selectedDates }: YearViewProps) => {
	return (
		<div className={"datePicker-body"}>
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
				return (
					<button
						onClick={() => {
							return onMonthClick(item);
						}}
						type="button"
						disabled={isDisabled}
						className={classNames("datePicker-body__month-cell", {
							selected: isSelected && !isDisabled,
							"datePicker-body__day_disabled": isDisabled,
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
