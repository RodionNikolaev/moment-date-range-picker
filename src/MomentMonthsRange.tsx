import * as React from "react";
import { Moment } from "moment";
import Month from './MomentMonth';
import { WeekDays, Range } from "./utils";

export interface IMonthsRangeProps {
    firstDisplayedMonth?: Moment;
    monthsCount?;
    weekStartDay?: WeekDays;
    range?: Range;
    onRangeChange?: (newDate: Moment) => void;
}

export class MonthsRangeState extends Range {
    currentStartMonth: Moment;
    currentDate?: Moment;
}

export default class MonthsRange extends React.Component<IMonthsRangeProps, MonthsRangeState> {
    constructor(props) {
        super(props);

        let state = new MonthsRangeState();
        state.from = this.props.range.from || null;
        state.to = this.props.range.to || null;
        state.currentStartMonth = this.props.firstDisplayedMonth.clone().startOf('month');
        state.currentDate = null;

        this.state = state;
    }
    componentWillReceiveProps(nextProps: IMonthsRangeProps) {
        this.setState({ ...this.state, from: nextProps.range.from, to: nextProps.range.to});       
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

                {monthsArray.map(month =>
                    <Month key={month.unix()}
                        from={this.state.from}
                        to={this.state.to}
                        weekStartDay={this.props.weekStartDay}
                        currentDate={this.state.currentDate}
                        onClick={(date => this.props.onRangeChange(date))}
                        onCurrentDateChange={(currentDate) => this.setState({ ...this.state, currentDate: currentDate })}
                        firstMonthDay={month} />)}
            </div>
        </div>
    }
}