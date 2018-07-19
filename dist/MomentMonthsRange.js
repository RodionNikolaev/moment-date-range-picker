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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MomentMonth_1 = require("./MomentMonth");
var utils_1 = require("./utils");
var MonthsRangeState = /** @class */ (function (_super) {
    __extends(MonthsRangeState, _super);
    function MonthsRangeState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MonthsRangeState;
}(utils_1.Range));
var MonthsRange = /** @class */ (function (_super) {
    __extends(MonthsRange, _super);
    function MonthsRange(props) {
        var _this = _super.call(this, props) || this;
        var state = new MonthsRangeState();
        state.from = _this.props.range.from || null;
        state.to = _this.props.range.to || null;
        state.currentStartMonth = _this.props.firstDisplayedMonth.clone().startOf('month');
        state.currentDate = null;
        _this.state = state;
        return _this;
    }
    MonthsRange.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(__assign({}, this.state, { from: nextProps.range.from, to: nextProps.range.to, currentStartMonth: nextProps.firstDisplayedMonth }));
    };
    MonthsRange.prototype.onPrevMonth = function () {
        this.setState(__assign({}, this.state, { currentStartMonth: this.state.currentStartMonth.clone().add(-1, 'month') }));
    };
    MonthsRange.prototype.onNextMonth = function () {
        this.setState(__assign({}, this.state, { currentStartMonth: this.state.currentStartMonth.clone().add(1, 'month') }));
    };
    MonthsRange.prototype.render = function () {
        var _this = this;
        var monthsArray = new Array(this.props.monthsCount);
        for (var m = 0; m < monthsArray.length; m++) {
            monthsArray[m] = this.state.currentStartMonth.clone().startOf('month').add(m, 'month');
        }
        return React.createElement("div", { className: "moment-months-range" },
            React.createElement("div", null,
                React.createElement("div", { className: "prev-month", onClick: function () { return _this.onPrevMonth(); } }, "◄"),
                React.createElement("div", { className: "next-month", onClick: function () { return _this.onNextMonth(); } }, "►"),
                monthsArray.map(function (month) {
                    return React.createElement(MomentMonth_1.default, { key: month.unix(), from: _this.state.from, to: _this.state.to, weekStartDay: _this.props.weekStartDay, currentDate: _this.state.currentDate, onClick: (function (date) { return _this.props.onRangeChange(date); }), onCurrentDateChange: function (currentDate) { return _this.setState(__assign({}, _this.state, { currentDate: currentDate })); }, firstMonthDay: month });
                })));
    };
    return MonthsRange;
}(React.Component));
exports.default = MonthsRange;
