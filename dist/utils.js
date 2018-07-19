"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeekDays;
(function (WeekDays) {
    WeekDays[WeekDays["Sunday"] = 0] = "Sunday";
    WeekDays[WeekDays["Monday"] = 1] = "Monday";
    WeekDays[WeekDays["Tuesday"] = 2] = "Tuesday";
    WeekDays[WeekDays["Wednesday"] = 3] = "Wednesday";
    WeekDays[WeekDays["Thursday"] = 4] = "Thursday";
    WeekDays[WeekDays["Friday"] = 5] = "Friday";
    WeekDays[WeekDays["Saturday"] = 6] = "Saturday";
})(WeekDays = exports.WeekDays || (exports.WeekDays = {}));
var Range = /** @class */ (function () {
    function Range() {
    }
    return Range;
}());
exports.Range = Range;
function isBetween(day, from, to) {
    return day.isBetween(from, to) || day.isBetween(to, from);
}
exports.isBetween = isBetween;
function inRange(day, from, to, currenTemptDate) {
    if (from != null && to != null)
        return isBetween(day, from, to);
    else if (from == null)
        return isBetween(day, currenTemptDate, to);
    else if (to == null)
        return isBetween(day, from, currenTemptDate);
}
exports.inRange = inRange;
function sortbyIndex(array, startIndex) {
    if (startIndex > 0) {
        var deleted = array.splice(0, startIndex);
        array = array.concat(deleted);
    }
    return array;
}
exports.sortbyIndex = sortbyIndex;
function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
exports.isDescendant = isDescendant;
