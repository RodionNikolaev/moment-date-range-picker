import * as React from "react";
import * as moment from "moment";
import { Moment } from "moment";

import { inRange, WeekDays, sortbyIndex } from "./utils";
import { MonthHeader } from "./MomentMonthHeader";

import classnames from 'classnames';

export interface MonthProps {
    firstMonthDay: Moment;
    weekStartDay: WeekDays;
    currentDate: Moment;
    from: Moment;
    to: Moment;

    onClick?: (clicedkDate: Moment) => void;
    onCurrentDateChange?: (currentDate: Moment) => void;
}

export class MonthState {
    weeks: any[];
}

export default class Month extends React.Component<MonthProps, MonthState> {
    constructor(props) {
        super(props);

        let days = [];
        for (let dayIndex = 0; dayIndex < this.props.firstMonthDay.daysInMonth(); dayIndex++) {
            days.push(props.firstMonthDay.clone().add(dayIndex, 'day'))
        }

        let firstDayOfWeek = moment.localeData(moment.locale()).firstDayOfWeek();
        let shiftIndex = this.props.firstMonthDay.clone().weekday() + firstDayOfWeek - this.props.weekStartDay;
        if (shiftIndex < 0)
            shiftIndex = 7 + shiftIndex;

        let shiftArray = [];
        for (let index = 0; index < shiftIndex; index++) {
            shiftArray[index] = props.firstMonthDay.clone().add(index - shiftIndex, 'day');
        }

        days = shiftArray.concat(days);

        //Split line array into arrays with 7 days
        let weeks = [];
        weeks[0] = [];

        let weekIndex = 0;
        let dayIndex = 0;

        for (let day = 0; day < days.length; day++) {
            weeks[weekIndex][dayIndex] = days[day];
            dayIndex++;
            if (dayIndex == 7) {
                dayIndex = 0;
                weekIndex++;
                weeks[weekIndex] = [];
            }
        }

        this.state = {
            weeks: weeks
        };
    }

    render() {

        let { from, to, currentDate } = this.props;
        let currentMonthNumber = this.props.firstMonthDay.month();

        return <table className="moment-month" cellSpacing="0" cellPadding="0">
            <MonthHeader month={this.props.firstMonthDay} />

            <tbody>
                <tr className="item weekday">
                    {sortbyIndex(moment.weekdaysMin(), this.props.weekStartDay).map(d => <td key={d}>{d}</td>)}
                </tr>
                {this.state.weeks.map((week) => <tr key={week}>
                    {
                        week.map((day, j) => {

                            let isStartOrEnd = (from != null && from.isSame(day)) || (to != null && to.isSame(day));
                            let inrange = inRange(day, from, to, currentDate);

                            return day.month() === currentMonthNumber ?
                                <td key={day.unix()}
                                    className={classnames("item monthday", { startrange: isStartOrEnd }, { endrange: isStartOrEnd }, { inrange: inrange })}
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