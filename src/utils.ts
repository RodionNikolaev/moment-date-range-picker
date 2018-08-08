import { Moment } from "moment";
import * as moment from "moment";

export enum WeekDays {
    Sunday = 0,
    Monday, 
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export function getMonthWeeksArray(firstMonthDay: Moment, weekStartDay: WeekDays, daysInWeek: number = 7): Array<number> {

    let locale = firstMonthDay.locale();
    let firstDayOfWeek = moment.localeData(locale).firstDayOfWeek();

    firstMonthDay = firstMonthDay.locale(firstMonthDay.locale());

    let days = [];
    for (let dayIndex = 0; dayIndex < firstMonthDay.daysInMonth(); dayIndex++) {
        days.push(firstMonthDay.clone().add(dayIndex, 'day'))
    }

    let shiftIndex = firstMonthDay.clone().weekday() + firstDayOfWeek - weekStartDay;
    if (shiftIndex < 0)
        shiftIndex = daysInWeek + shiftIndex;

    let shiftArray = [];
    for (let index = 0; index < shiftIndex; index++) {
        shiftArray[index] = firstMonthDay.clone().add(index - shiftIndex, 'day');
    }

    days = shiftArray.concat(days);

    //Split line array into arrays with daysInWeek days
    let weeks = [];
    weeks[0] = [];

    let weekIndex = 0;
    let dayIndex = 0;

    for (let day = 0; day < days.length; day++) {
        weeks[weekIndex][dayIndex] = days[day];
        dayIndex++;
        if (dayIndex == daysInWeek) {
            dayIndex = 0;
            weekIndex++;
            weeks[weekIndex] = [];
        }
    }

    return weeks;
}

export function getWeekDaysNames(firstMonthDay: Moment, weekStartDay: WeekDays, daysInWeek: number = 7): string[] {

    let locale = firstMonthDay.locale();
    let weekdaysMin = moment.localeData(locale).weekdaysMin();
    let sortedDays = sortbyIndex(weekdaysMin, weekStartDay);

    while (sortedDays.length < daysInWeek) {
        sortedDays = sortedDays.concat(sortedDays);
    }

    return sortedDays.slice(0, daysInWeek);
}

export function isBetween(day: Moment, from: Moment, to: Moment): boolean {
    return day.isBetween(from, to) || day.isBetween(to, from);
}

export function isInRange(day: Moment, from: Moment, to: Moment): boolean {
    return isBetween(day, to, from) || day.isSame(from) || day.isSame(to);
}

export function isAnyBetween(days: Moment[], from: Moment, to: Moment) {
    if (!days || days.length == 0)
        return false;

    for (let index = 0; index < days.length; index++) {
        let day = days[index];
        if (isInRange(day, from, to) == true) {
            return true;
        }
    }
    return false;
}

export function isDateInArray(days: Moment[], currentDate: Moment): boolean {

    if (!days || days.length == 0)
        return false;

    for (let index = 0; index < days.length; index++) {
        let day = days[index];
        if (currentDate.isSame(day) == true) {
            return true;
        }
    }
    return false;
}

export function getActualRange(isFromSelect: boolean, from: Moment, to: Moment, disabledDays: Moment[]): Moment[] {

    let range = [];

    let daysDiff = to.diff(from, 'days');

    if (isFromSelect == true) {
        for (let days = 0; days <= daysDiff; days++) {
            let day = to.clone().subtract(days, 'day');
            if (isDateInArray(disabledDays, day) == false)
                range.push(day);
            else
                break;
        }

        return range;
    }

    else {
        for (let days = 0; days <= daysDiff; days++) {
            let day = from.clone().add(days, 'day');
            if (isDateInArray(disabledDays, day) == false)
                range.push(day);
            else
                break;
        }

        return range;
    }
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