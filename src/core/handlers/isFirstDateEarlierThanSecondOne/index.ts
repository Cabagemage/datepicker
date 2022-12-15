export const isFirstDateEarlierThanSecondOne = (start: Date | string, end: Date | string): boolean => {
	const endTime = new Date(end);
	const startTime = new Date(start);

	return (
		startTime.getTime() <= endTime.getTime() &&
		endTime.toLocaleDateString() !== startTime.toLocaleDateString()
	);
};
