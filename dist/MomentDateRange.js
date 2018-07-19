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
var ReactDOM = require("react-dom");
var MomentMonthsRange_1 = require("./MomentMonthsRange");
var utils_1 = require("./utils");
var moment = require("moment");
var classnames_1 = require("classnames");
var DateRangeState = /** @class */ (function () {
    function DateRangeState() {
    }
    return DateRangeState;
}());
var MomentDateRange = /** @class */ (function (_super) {
    __extends(MomentDateRange, _super);
    function MomentDateRange(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            from: props.from != null ? props.from.startOf('day') : null,
            to: props.to != null ? props.to.startOf('day') : null,
            currentInput: ""
        };
        _this.onGlobalClick = _this.onGlobalClick.bind(_this);
        return _this;
    }
    MomentDateRange.prototype.componentDidMount = function () {
        document.addEventListener('click', this.onGlobalClick);
    };
    MomentDateRange.prototype.componentWillUnmount = function () {
        document.removeEventListener('click', this.onGlobalClick);
    };
    MomentDateRange.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            from: nextProps.from != null ? nextProps.from.startOf('day') : null,
            to: nextProps.to != null ? nextProps.to.startOf('day') : null
        });
    };
    MomentDateRange.prototype.onGlobalClick = function (e) {
        if (this.state.currentInput != "" && !utils_1.isDescendant(ReactDOM.findDOMNode(this), e.target))
            this.setState(__assign({}, this.state, { currentInput: "" }));
    };
    MomentDateRange.prototype.onRangeChanged = function (clickedDate) {
        var _this = this;
        var from = this.state.from;
        var to = this.state.to;
        var currentInput = this.state.currentInput;
        if (currentInput == "from") {
            currentInput = "to";
            if (to != null && to.isBefore(clickedDate)) {
                to = null;
            }
            from = clickedDate;
        }
        else {
            if (from != null && from.isAfter(clickedDate)) {
                to = null;
                from = clickedDate;
                currentInput = "to";
            }
            else {
                currentInput = "";
                to = clickedDate;
            }
        }
        this.setState(__assign({}, this.state, { from: from, to: to, currentInput: currentInput }), function () { return _this.props.onRangeChange(from, to); });
    };
    MomentDateRange.prototype.onKeyDown = function (e, isToDate) {
        var _this = this;
        if (e.keyCode == 8 || e.keyCode == 46) {
            var _a = this.state, from_1 = _a.from, to_1 = _a.to;
            if (isToDate)
                to_1 = null;
            else
                from_1 = null;
            this.setState(__assign({}, this.state, { from: from_1, to: to_1 }), function () { return _this.props.onRangeChange(from_1, to_1); });
        }
    };
    MomentDateRange.prototype.render = function () {
        var _this = this;
        var _a = this.state, from = _a.from, to = _a.to;
        return (React.createElement("div", { className: "moment-date-range" },
            React.createElement("div", { className: "inputs" },
                React.createElement("input", { type: "text", placeholder: "Start Date", className: classnames_1.default("input-from", { focus: this.state.currentInput == "from" }), onFocus: function () { _this.setState(__assign({}, _this.state, { currentInput: "from" })); }, onChange: function () { }, onKeyDown: function (e) { return _this.onKeyDown(e, false); }, value: from != null ? from.format(this.props.formatString) : "" }),
                "\u00A0\u00A0\u25BA\u00A0\u00A0",
                React.createElement("input", { type: "text", placeholder: "End Date", className: classnames_1.default("input-from", { focus: this.state.currentInput == "to" }), onFocus: function () { _this.setState(__assign({}, _this.state, { currentInput: "to" })); }, onChange: function () { }, onKeyDown: function (e) { return _this.onKeyDown(e, true); }, value: to != null ? to.format(this.props.formatString) : "" })),
            this.state.currentInput != "" ? React.createElement(MomentMonthsRange_1.default, { weekStartDay: this.props.weekStartDay || moment.localeData(moment.locale()).firstDayOfWeek(), monthsCount: this.props.monthsCount || 3, range: { from: from, to: to }, firstDisplayedMonth: this.props.firstDisplayedMonth || moment().startOf('month'), onRangeChange: function (clickedDate) { return _this.onRangeChanged(clickedDate); } }) : null));
    };
    return MomentDateRange;
}(React.Component));
exports.default = MomentDateRange;
