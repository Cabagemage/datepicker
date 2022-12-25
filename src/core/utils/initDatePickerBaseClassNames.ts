import { DatePickerCommonClassNames } from "../types";

export const initDatePickerBaseClassNames = (
	customizationClassNames?: Partial<DatePickerCommonClassNames>
) => {
	const datePickerWrapperCn = customizationClassNames?.wrapper
		? customizationClassNames.wrapper
		: "datePicker-wrapper";
	const datePickerHeaderCn = customizationClassNames?.header
		? customizationClassNames.header
		: "datePicker-header";
	const datePickerArrowLeftCn = customizationClassNames?.arrowLeft
		? customizationClassNames.arrowLeft
		: "datePicker__controller datePicker__controller_type_prev";
	const datePickerArrowNextCn = customizationClassNames?.arrowRight
		? customizationClassNames.arrowRight
		: "datePicker__controller datePicker__controller_type_next";
	const datePickerHeaderControlsCn = customizationClassNames?.headerControls
		? customizationClassNames?.headerControls
		: "datePicker__controls";
	const datePickerHeadertextCn = customizationClassNames?.headerText
		? customizationClassNames?.headerText
		: "datepicker-header__time";

	return {
		datePickerArrowLeftCn,
		datePickerArrowNextCn,
		datePickerHeaderCn,
		datePickerWrapperCn,
		datePickerHeaderControlsCn,
		datePickerHeadertextCn,
	};
};
