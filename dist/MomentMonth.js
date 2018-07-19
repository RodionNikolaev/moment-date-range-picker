"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment = require("moment");
var utils_1 = require("./utils");
var MomentMonthHeader_1 = require("./MomentMonthHeader");
var classnames_1 = require("classnames");
var MonthState = /** @class */ (function () {
    function MonthState() {
    }
    return MonthState;
}());
var Month = /** @class */ (function (_super) {
    __extends(Month, _super);
    function Month(props) {
        var _this = _super.call(this, props) || this;
        var days = [];
        for (var dayIndex_1 = 0; dayIndex_1 < _this.props.firstMonthDay.daysInMonth(); dayIndex_1++) {
            days.push(props.firstMonthDay.clone().add(dayIndex_1, 'day'));
        }
        var firstDayOfWeek = moment.localeData(moment.locale()).firstDayOfWeek();
        var shiftIndex = _this.props.firstMonthDay.clone().weekday() + firstDayOfWeek - _this.props.weekStartDay;
        if (shiftIndex < 0)
            shiftIndex = 7 + shiftIndex;
        var shiftArray = [];
        for (var index = 0; index < shiftIndex; index++) {
            shiftArray[index] = props.firstMonthDay.clone().add(index - shiftIndex, 'day');
        }
        days = shiftArray.concat(days);
        //Split line array into arrays with 7 days
        var weeks = [];
        weeks[0] = [];
        var weekIndex = 0;
        var dayIndex = 0;
        for (var day = 0; day < days.length; day++) {
            weeks[weekIndex][dayIndex] = days[day];
            dayIndex++;
            if (dayIndex == 7) {
                dayIndex = 0;
                weekIndex++;
                weeks[weekIndex] = [];
            }
        }
        _this.state = {
            weeks: weeks
        };
        return _this;
    }
    Month.prototype.render = function () {
        var _this = this;
        var _a = this.props, from = _a.from, to = _a.to, currentDate = _a.currentDate;
        var currentMonthNumber = this.props.firstMonthDay.month();
        return React.createElement("table", { className: "moment-month", cellSpacing: "0", cellPadding: "0" },
            React.createElement(MomentMonthHeader_1.MonthHeader, { month: this.props.firstMonthDay }),
            React.createElement("tbody", null,
                React.createElement("tr", { className: "item weekday" }, utils_1.sortbyIndex(moment.weekdaysMin(), this.props.weekStartDay).map(function (d) { return React.createElement("td", { key: d }, d); })),
                this.state.weeks.map(function (week) { return React.createElement("tr", { key: week }, week.map(function (day, j) {
                    var isStartOrEnd = (from != null && from.isSame(day)) || (to != null && to.isSame(day));
                    var inrange = utils_1.inRange(day, from, to, currentDate);
                    return day.month() === currentMonthNumber ?
                        React.createElement("td", { key: day.unix(), className: classnames_1.default("item monthday", { startrange: isStartOrEnd }, { endrange: isStartOrEnd }, { inrange: inrange }), onMouseOver: function () { return _this.props.onCurrentDateChange(day); }, onClick: function () { _this.props.onClick(day); } }, day.format('D'))
                        : React.createElement("td", { key: j });
                })); })));
    };
    return Month;
}(React.Component));
exports.default = Month;
