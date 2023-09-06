import { memo } from "react";
import { classNamesResolver } from "../core/utils/classNamesResolver";

type DecadeCell = {
	onClick: () => void;
	isDisabled: boolean;
	isSelected: boolean;
	className: HTMLButtonElement["className"];
	disabledClassName: HTMLButtonElement["className"];
	selectedClassName: HTMLButtonElement["className"];
	value: Date;
};

export const DecadeCell = memo(
	({
		onClick,
		value,
		disabledClassName,
		selectedClassName,
		isDisabled,
		className,
		isSelected,
	}: DecadeCell) => {
		return (
			<button
				type="button"
				onClick={onClick}
				disabled={isDisabled}
				className={classNamesResolver(className, {
					[disabledClassName]: isDisabled,
					[selectedClassName]: isSelected,
				})}
				key={value.toString()}
			>
				{value.getFullYear()}
			</button>
		);
	}
);
