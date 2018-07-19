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
var MonthHeader = /** @class */ (function (_super) {
    __extends(MonthHeader, _super);
    function MonthHeader(props) {
        return _super.call(this, props) || this;
    }
    MonthHeader.prototype.render = function () {
        return (React.createElement("thead", { className: "rc-date-range header" },
            React.createElement("tr", null,
                React.createElement("td", { colSpan: 7 }, this.props.month.format('MMMM YYYY')))));
    };
    return MonthHeader;
}(React.Component));
exports.MonthHeader = MonthHeader;
