// function to get sunday of passed date;
export const getSunday = (date: Date) => {
	const isSunday = date.getDay() === 0;

	if (isSunday) {
		return date;
	}

	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
};
