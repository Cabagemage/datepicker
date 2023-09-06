export function isDateValid(date: Date) {
	return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime());
}
