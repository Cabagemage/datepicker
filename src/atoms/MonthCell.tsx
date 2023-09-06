import { getFormattedMonthToLocale } from "../core/handlers";
import type { FormatMonthParams } from "../core/types/commonTypes";
import { memo } from "react";
import { classNamesResolver } from "../core/utils/classNamesResolver";

type MonthCell = {
	onClick: () => void;
	value: Date;
	isDisabled: boolean;
	isSelected: boolean;
	classes: {
		defaultClassName: HTMLButtonElement["className"];
		selectedClassName: HTMLButtonElement["className"];
		disabledClassName: HTMLButtonElement["className"];
	};
	formatMonthParams?: FormatMonthParams;
};

export const MonthCell = memo(
	({ isDisabled, onClick, classes, value, isSelected, formatMonthParams }: MonthCell) => {
		const defaultParams: FormatMonthParams = !formatMonthParams
			? { month: value, locale: "ru-RU", format: "long" }
			: formatMonthParams;
		return (
			<button
				onClick={onClick}
				value={value.toDateString()}
				type="button"
				disabled={isDisabled}
				className={classNamesResolver(classes.defaultClassName, {
					[classes.selectedClassName]: isSelected && !isDisabled,
					[classes.disabledClassName]: isDisabled,
				})}
				key={value.toString()}
			>
				{getFormattedMonthToLocale(defaultParams)}
			</button>
		);
	}
);
