import {formatDate} from "../formatDate";
import {getWeekDays} from "./index";

const datesResult = [
    new Date("2022-12-11T21:00:00.000Z"),
    new Date("2022-12-12T21:00:00.000Z"),
    new Date("2022-12-13T21:00:00.000Z"),
    new Date("2022-12-14T21:00:00.000Z"),
    new Date("2022-12-15T21:00:00.000Z"),
    new Date("2022-12-16T21:00:00.000Z"),
    new Date( "2022-12-17T21:00:00.000Z")
]
const monday = new Date("2022-12-11T21:00:00.000Z");
describe("fn should return whole week by passed date", () => {
    test("should be monday of passed week", () => {
        const week = getWeekDays(monday)
        week.forEach((item, i) => {
            const formattedDate = formatDate(week[i])
            const formattedResult = formatDate(datesResult[i])
            expect(formattedDate).toBe( formattedResult)
        })

    });
})