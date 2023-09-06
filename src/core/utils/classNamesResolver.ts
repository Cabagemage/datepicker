type ClassArgument = string | Array<string> | Record<string, boolean> | undefined;

export function classNamesResolver(...args: Array<ClassArgument>): string {
	const classList: Array<ClassArgument> = [];

	args.forEach((arg) => {
		if (Array.isArray(arg)) {
			classList.push(...arg);
		} else if (arg && typeof arg === "object") {
			Object.entries(arg).forEach(([key, value]) => {
				if (value) {
					classList.push(key);
				}
			});
		} else if (arg) {
			classList.push(arg);
		}
	});

	return classList.join(" ");
}
