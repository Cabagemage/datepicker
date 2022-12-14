import {formatDate} from "./index";

const mockedWeek = [
    new Date("2022.12.01"),
    new Date("2022.01.21"),
    new Date("2022.02.28"),
    new Date("2022.03.12"),
    new Date("2022.04.12"),
    new Date("2022.05.15"),
    new Date("2022.06.12"),
    new Date("2022.07.12")
]
const formattedDateResultsWithDot = [
   "2022.12.01",
   "2022.01.21",
    "2022.02.28",
    "2022.03.12",
    "2022.04.12",
    "2022.05.15",
    "2022.06.12",
    "2022.07.12",
];
const formattedDateResultsWithSkin = [
    "2022-12-01",
    "2022-01-21",
    "2022-02-28",
    "2022-03-12",
    "2022-04-12",
    "2022-05-15",
    "2022-06-12",
    "2022-07-12",
];
describe("fn should return formatted dates", () => {
    test("should format passed Dates with dot", () => {
        mockedWeek.forEach((item, i) => {
            const formattedDate = formatDate(item, '.');
            const result =  formattedDateResultsWithDot[i]
            expect(formattedDate).toBe(result)
        })
    });
    test("should format passed Dates with skin", () => {
        mockedWeek.forEach((item, i) => {
            const formattedDate = formatDate(item, '-');
            const result =  formattedDateResultsWithSkin[i]
            expect(formattedDate).toBe(result)
        })
    });
})