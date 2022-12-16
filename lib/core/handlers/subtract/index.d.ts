import { DateUnit } from "../../types/commonTypes";
declare type Subtract = ({
	date,
	count,
	type,
}: {
	date: Date | string;
	count: number;
	type: DateUnit;
}) => Date;
export declare const subtract: Subtract;
export {};
