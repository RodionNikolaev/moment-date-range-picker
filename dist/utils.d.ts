import { Moment } from "moment";
export declare enum WeekDays {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
export declare class Range {
    from: Moment;
    to: Moment;
}
export declare function isBetween(day: Moment, from: Moment, to: Moment): boolean;
export declare function inRange(day: Moment, from: Moment, to: Moment, currenTemptDate: Moment): boolean;
export declare function sortbyIndex(array: any[], startIndex: number): any[];
export declare function isDescendant(parent: any, child: any): boolean;
