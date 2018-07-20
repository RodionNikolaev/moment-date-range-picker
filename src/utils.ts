import { Moment } from "moment";

export enum WeekDays {
    Sunday = 0,
    Monday, Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export class Range {
    from: Moment;
    to: Moment;
}

export function isBetween(day: Moment, from: Moment, to: Moment) {
    return day.isBetween(from, to) || day.isBetween(to, from);
}

export function inRange(day: Moment, from: Moment, to: Moment, currenTemptDate: Moment) {
    if (from != null && to != null)
        return isBetween(day, from, to);
    else if (from == null)
        return isBetween(day, currenTemptDate, to);
    else if (to == null)
        return isBetween(day, from, currenTemptDate);
}

export function sortbyIndex(array: any[], startIndex: number) {
    let copy = array.map(w => w);
    if (startIndex > 0) {
        var deleted = copy.splice(0, startIndex);
        copy = copy.concat(deleted);
    }
    return copy;
}

export function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}