// hook that response for modes of Date picker (interval / week selection / single date);
import { formatDate, getDatesInRange, getMonday, getSunday } from "../handlers";
import { DatePickerChangeHandler, DatePickerMode, DatePickerValue } from "../types/DatePicker.typedef";
import { useState } from "react";

type UseDatePickerModes = {
	value: DatePickerValue;
	onChangeDate: DatePickerChangeHandler;
	mode: DatePickerMode;
};
// hook that implements logic for different datePicker modes
const useDatePickerModes = ({ value, onChangeDate, mode }: UseDatePickerModes) => {
	const defineDefaultSelectedDates = () => {
		if (mode === "week" && value instanceof Date) {
			const monday = getMonday(value);
			const sunday = getSunday(value);
			const formattedDates = getDatesInRange(monday, sunday).map((item) => {
				return formatDate(item);
			});
			return formattedDates;
		}

		if (value instanceof Date) {
			return [value];
		}

		if (Array.isArray(value)) {
			const isFirstDateDefined = value[0] !== undefined ? value[0] : false;
			const isSecondDateDefined = value[1] !== undefined ? value[1] : false;
			if (isFirstDateDefined) {
				return [value[0]];
			}
			if (isFirstDateDefined && isSecondDateDefined) {
				const firstDate = value[0];
				const secondDate = value[1];
				const start = new Date(firstDate) < secondDate ? firstDate : secondDate;
				const end = new Date(secondDate) > firstDate ? secondDate : firstDate;
				return getDatesInRange(start, end);
			}
		} else {
			if (value.start !== null && value.end !== null) {
				return getDatesInRange(value.start, value.end);
			}
		}
		return [];
	};

	const defaultSelectedDates = defineDefaultSelectedDates();
	const [selectedDates, setSelectedDates] = useState<Array<string | Date>>(defaultSelectedDates);

	const selectDayForInterval = (date: Date) => {
		if (value instanceof Date || Array.isArray(value)) {
			return;
		}
		const isDateIncluded = selectedDates.includes(formatDate(date));
		if (value.start && value.end && isDateIncluded) {
			onChangeDate({ value: { start: null, end: null } });
			setSelectedDates([]);
		}
		if (value.start && value.end && date > value.end) {
			onChangeDate({ value: { start: value.start, end: date } });
			const formattedDates = getDatesInRange(value.start, date).map((item) => {
				return formatDate(item);
			});
			setSelectedDates(formattedDates);
		}
		if (value.start && value.end && date < value.start) {
			onChangeDate({ value: { start: date, end: value.end } });
			const formattedDates = getDatesInRange(date, value.end).map((item) => {
				return formatDate(item);
			});
			setSelectedDates(formattedDates);
		}
		if (value.start === null) {
			onChangeDate({ value: { start: date, end: value.end } });
			setSelectedDates([formatDate(date)]);
		}

		if (value.start !== null && value.end === null) {
			const start = new Date(value.start) < date ? value.start : date;
			const end = new Date(date) > value.start ? date : value.start;
			const formattedDates = getDatesInRange(start, end).map((item) => {
				return formatDate(item);
			});
			setSelectedDates(formattedDates);
			onChangeDate({ value: { start: start, end: end } });
		}
	};

	const selectDayForWeek = (date: Date) => {
		const firstDate = getMonday(date);
		const lastDate = getSunday(date);
		const formattedDates = getDatesInRange(firstDate, lastDate).map((item) => {
			return formatDate(item);
		});
		setSelectedDates(formattedDates);
		onChangeDate({ value: { start: firstDate, end: lastDate } });
	};
	const selectSingleDate = (date: Date, formattedDate: string) => {
		setSelectedDates([formattedDate]);
		onChangeDate({ value: date });
	};
	const mappedSelectedDatesToFormattedValue = selectedDates.map((item) => {
		return formatDate(new Date(item));
	});
	const selectDayForPartial = (date: Date) => {
		if (mappedSelectedDatesToFormattedValue.includes(formatDate(date))) {
			const filteredDates = selectedDates.filter((item) => {
				return formatDate(new Date(date)) !== formatDate(new Date(item));
			});
			setSelectedDates(filteredDates);
			if (selectedDates.length > 0) {
				onChangeDate({
					value: selectedDates
						.filter((item) => {
							return formatDate(new Date(item)) !== formatDate(date);
						})
						.map((date) => {
							return new Date(date);
						}),
				});
			}

			return;
		}
		setSelectedDates((prev) => {
			return [...prev, formatDate(date)];
		});
		const mappedSelectedDatesToRawDates = selectedDates.map((item) => {
			return new Date(item);
		});
		onChangeDate({ value: [...mappedSelectedDatesToRawDates, new Date(date)] });
	};

	const selectDay = (date: Date) => {
		const formattedDate = formatDate(date);
		if (mode === "single") {
			selectSingleDate(date, formattedDate);
		}
		if (mode === "partial") {
			selectDayForPartial(date);
		}
		if (mode === "interval") {
			selectDayForInterval(date);
		}
		if (mode === "week") {
			selectDayForWeek(date);
		}
	};

	return {
		selectedDates,
		selectDay,
	};
};

export default useDatePickerModes;
