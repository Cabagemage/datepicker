export class InvalidDate extends Error {
	message: string;
	constructor(message?: string) {
		super();
		this.message = message || "you pass invalid date";
		this.name = "Invalid Date";
	}
}
