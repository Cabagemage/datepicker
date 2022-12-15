import type { MinDate } from "../core";
import { isFirstDateEarlierThanSecondOne, ONE_YEAR, subtract } from "../core";
import classNames from "classnames";

type YearViewProps = {
	years: Array<Date>;
	onYearClick: (date: Date) => void;
	minDate?: MinDate;
};

const DecadeView = ({ years, onYearClick, minDate }: YearViewProps) => {
	return (
		<div className={"datePicker-body"}>
			{years.map((item) => {
				const lastDateInMonth = new Date(item.getFullYear(), item.getMonth() + 1, 0);
				// we don't want to disable year for chose year have not passed
				const isLastDateInMonthEqualToPassedMinDate =
					minDate?.date.toDateString() === lastDateInMonth.toDateString();
				const year = isLastDateInMonthEqualToPassedMinDate
					? minDate.date
					: subtract({ date: new Date(minDate?.date ?? new Date()), type: "year", count: ONE_YEAR });
				const isDisabled = minDate !== undefined ? isFirstDateEarlierThanSecondOne(item, year) : false;
				return (
					<button
						type="button"
						onClick={() => {
							return onYearClick(item);
						}}
						disabled={isDisabled}
						className={classNames("datePicker-body__month-cell", {
							"datePicker-body__day_disabled": isDisabled,
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
