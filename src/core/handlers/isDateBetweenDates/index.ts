type IsDateBetweenDates = {
	date: Date;
	startDate: Date;
	endDate: Date;
};

export const isDateBetweenDates = ({ date, startDate, endDate }: IsDateBetweenDates): boolean => {
	return date > startDate && date < endDate;
};
