import * as React from "react";
import { Moment } from "moment";

import { WeekDays, getMonthWeeksArray, getWeekDaysNames, isBetween, isInRange, isDateInArray } from "./utils";
import { MonthHeader } from "./MonthHeader";

import classnames from 'classnames';

export interface MonthProps {

    disabledDates: Moment[];

    firstMonthDay: Moment;
    weekStartDay: WeekDays;

    selectedDates: Moment[];

    from: Moment;
    to: Moment;

    onClick?: (clicedkDate: Moment) => void;
    onCurrentDateChange?: (currentHoveredDate: Moment) => void;
}

export class MonthState {
    weeks: any[];
    weekDaysNames: string[];
}

export default class Month extends React.Component<MonthProps, MonthState> {
    constructor(props) {
        super(props);

        this.state = {
            weeks: getMonthWeeksArray(this.props.firstMonthDay, this.props.weekStartDay, 7),
            weekDaysNames: getWeekDaysNames(this.props.firstMonthDay, this.props.weekStartDay, 7)
        };
    }

    render() {

        let { from, to, disabledDates, selectedDates } = this.props;
        let currentMonthNumber = this.props.firstMonthDay.month();

        return <table className="moment-month" cellSpacing="0" cellPadding="0">
            <MonthHeader month={this.props.firstMonthDay} />

            <tbody>
                <tr className="item weekday">
                    {this.state.weekDaysNames.map((d, i) => <td key={i}>{d}</td>)}
                </tr>
                {this.state.weeks.map((week) => <tr key={week}>
                    {
                        week.map((day, j) => {

                            let isStartOrEnd = (from != null && from.isSame(day)) || (to != null && to.isSame(day));
                            let isSelected = isDateInArray(selectedDates, day) && isStartOrEnd == false;
                            let disabled = isDateInArray(disabledDates, day) == true;

                            let dayClasses = classnames("item monthday",
                                { startRange: isStartOrEnd },
                                { endRange: isStartOrEnd },
                                { disabled: disabled },
                                { inRange: isSelected == true })

                            return day.month() === currentMonthNumber ?
                                <td key={day.unix()}
                                    className={dayClasses}
                                    onMouseOver={() => this.props.onCurrentDateChange(day)}
                                    onClick={() => { this.props.onClick(day) }}>
                                    {day.format('D')}
                                </td>
                                : <td key={j}></td>
                        })}
                </tr>)}
            </tbody>
        </table>
    }
}