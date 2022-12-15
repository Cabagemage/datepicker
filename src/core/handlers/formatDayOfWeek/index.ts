export const formatDayOfWeek = (date: Date, locale: Intl.LocalesArgument) => {
	return date.toLocaleDateString(locale, { weekday: "short" }).toUpperCase();
};
