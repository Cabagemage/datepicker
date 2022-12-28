import type { DatePickerProps } from "./core/types";
import "./datePicker.css";
import { getFormattedMonthToLocale } from "./core/handlers";
import { MIDDLE_DAY_OF_MONTH } from "./core/constants";
import { forwardRef, useMemo } from "react";
import { MonthView } from "./components/MonthView";
import YearView from "./components/YearView";
import DecadeView from "./components/DecadeView";
import { initDatePickerBaseClassNames } from "./core/utils/initDatePickerBaseClassNames";
import useDatePickerCore from "./core/hooks/useDatePickerCore";
import useDatePickerModes from "./core/hooks/useDatePickerModes";

export const DatePicker = forwardRef<HTMLDivElement | null, DatePickerProps>(
	(
		{
			locale = "en",
			mode = "single",
			minDate,
			disabledDates,
			weekendDays,
			onDateChange,
			customizedDates,
			customizationClassNames,
			value,
			view,
			changeCalendarView,
			maxDate,
			customHeaderRenderProp,
			customDecadeViewRenderProp,
			onYearClick,
			onMonthClick,
			customMonthCellRenderProp,
			customMonthViewRenderProp,
			customYearViewRenderProp,
			customYearCellRenderProp,
			customDayCellRenderProp,
			footerElement,
			isVisible = true,
		},
		ref
	) => {
		const {
			selectMonth,
			selectYear,
			activeYear,
			monthsOfYear,
			currentMonthIdx,
			month,
			decadeYears,
			toNextUnitNavAction,
			toPrevUnitNavAction,
		} = useDatePickerCore({ view, value });
		const { selectedDates, selectDay } = useDatePickerModes({
			value,
			onChangeDate: onDateChange,
			mode: mode,
		});

		const clickYear = (date: Date) => {
			if (onYearClick !== undefined) {
				onYearClick(date);
			}
			selectYear(date);
		};

		const clickMonth = (date: Date) => {
			if (onMonthClick !== undefined) {
				onMonthClick(date);
			}
			selectMonth(date);
		};

		const headerText = useMemo(() => {
			switch (view) {
				case "month":
					return `${getFormattedMonthToLocale({
						month: month[MIDDLE_DAY_OF_MONTH],
						locale: locale,
					})} ${activeYear}`;
				case "year":
					return `${activeYear}`;
				case "decade": {
					return `${decadeYears[0].getFullYear()} — ${decadeYears[decadeYears.length - 1].getFullYear()}`;
				}
				default:
					return "not available";
			}
		}, [view, month, locale, decadeYears, activeYear]);

		const {
			datePickerHeadertextCn,
			datePickerWrapperCn,
			datePickerHeaderCn,
			datePickerHeaderControlsCn,
			datePickerArrowNextCn,
			datePickerArrowLeftCn,
		} = initDatePickerBaseClassNames(customizationClassNames?.common);

		if (isVisible) {
			return (
				<div className={datePickerWrapperCn} ref={ref}>
					{customHeaderRenderProp !== undefined ? (
						customHeaderRenderProp({
							changeCalendarView,
							toNextUnitNavAction,
							toPrevUnitNavAction,
							headerText,
						})
					) : (
						<div className={datePickerHeaderCn}>
							<button className={"datePicker-header__toggler"} onClick={changeCalendarView} type="button">
								<time className={datePickerHeadertextCn}>{headerText}</time>
							</button>
							<div className={datePickerHeaderControlsCn}>
								<button className={datePickerArrowLeftCn} type="button" onClick={toPrevUnitNavAction} />
								<button className={datePickerArrowNextCn} type="button" onClick={toNextUnitNavAction} />
							</div>
						</div>
					)}
					{customMonthViewRenderProp !== undefined &&
						customMonthViewRenderProp({
							locale,
							month,
							customizedDates,
							currentMonth: currentMonthIdx,
							disabledDates,
							selectedDates,
							onDateChange: selectDay,
							minDate,
							maxDate,
							customMonthClassNames: customizationClassNames?.month,
						})}
					{view === "month" && customMonthViewRenderProp === undefined && (
						<MonthView
							locale={locale}
							selectedDates={selectedDates}
							month={month}
							customDayCellRenderProp={customDayCellRenderProp}
							customizedDates={customizedDates}
							currentMonth={currentMonthIdx}
							disabledDates={disabledDates}
							weekendDays={weekendDays}
							onDateChange={selectDay}
							minDate={minDate}
							maxDate={maxDate}
							customMonthClassNames={customizationClassNames?.month}
						/>
					)}
					{customYearViewRenderProp !== undefined &&
						customYearViewRenderProp({
							months: monthsOfYear,
							currentMonthIdx: currentMonthIdx,
							minDate,
							defaultLocale: locale,
							onMonthClick: clickMonth,
						})}
					{view === "year" && customYearViewRenderProp === undefined && (
						<YearView
							months={monthsOfYear}
							currentMonthIdx={currentMonthIdx}
							customYearClassNames={customizationClassNames?.year}
							minDate={minDate}
							maxDate={maxDate}
							customMonthCellRenderProp={customMonthCellRenderProp}
							onMonthClick={clickMonth}
							defaultLocale={locale}
						/>
					)}
					{customDecadeViewRenderProp !== undefined &&
						customDecadeViewRenderProp({
							minDate: minDate,
							onYearClick: clickYear,
							years: decadeYears,
							activeYear: activeYear,
						})}
					{view === "decade" && customDecadeViewRenderProp === undefined && (
						<DecadeView
							activeYear={activeYear}
							minDate={minDate}
							maxDate={maxDate}
							onYearClick={clickYear}
							years={decadeYears}
							customYearCellRenderProp={customYearCellRenderProp}
							customDecadeClassNames={customizationClassNames?.decade}
						/>
					)}
					{footerElement !== null && footerElement}
				</div>
			);
		} else {
			return null;
		}
	}
);
