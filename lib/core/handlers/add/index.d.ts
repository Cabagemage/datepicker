import { DateUnit } from "../../types/commonTypes";
declare type Add = ({ date, count, type }: {
    date: Date | string;
    count: number;
    type: DateUnit;
}) => Date;
export declare const add: Add;
export {};
