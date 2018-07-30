import * as React from "react";
import { Moment } from "moment";
import Month from './Month';
import { WeekDays } from "./utils";

export interface IMonthsRangeProps {
    from?: Moment;
    to?: Moment;

    firstDisplayedMonth?: Moment;
    weekStartDay?: WeekDays;
    monthsCount?: number;

    onRangeChange?: (newDate: Moment) => void;
    onCurrentDateChange?: (currentHoveredDate: Moment) => void;

    selectedDates: Moment[];

    disabledDates: Moment[];
}

export class MonthsRangeState {
    currentStartMonth: Moment;
}

export default class MonthsRange extends React.Component<IMonthsRangeProps, MonthsRangeState> {
    constructor(props) {
        super(props);

        let state = new MonthsRangeState();
        state.currentStartMonth = this.props.firstDisplayedMonth.clone().startOf('month');

        this.state = state;
    }

    onPrevMonth() {
        this.setState({ ...this.state, currentStartMonth: this.state.currentStartMonth.clone().add(-1, 'month') });
    }

    onNextMonth() {
        this.setState({ ...this.state, currentStartMonth: this.state.currentStartMonth.clone().add(1, 'month') });
    }

    render() {

        let monthsArray = new Array(this.props.monthsCount);
        for (let m = 0; m < monthsArray.length; m++) {
            monthsArray[m] = this.state.currentStartMonth.clone().startOf('month').add(m, 'month');
        }

        return <div className="moment-months-range">
            <div>
                <div className="prev-month"
                    onClick={() => this.onPrevMonth()}>
                    {"◄"}
                </div>
                <div className="next-month"
                    onClick={() => this.onNextMonth()}>
                    {"►"}
                </div>

                {monthsArray.map(month => {
                    return <Month key={month.unix()}
                        from={this.props.from}
                        to={this.props.to}

                        selectedDates={this.props.selectedDates}

                        disabledDates={this.props.disabledDates}
                        weekStartDay={this.props.weekStartDay}
                        onClick={(date => this.props.onRangeChange(date))}
                        onCurrentDateChange={(currentHoveredDate) => this.props.onCurrentDateChange(currentHoveredDate)}
                        firstMonthDay={month} />
                })}
            </div>
        </div>
    }
}