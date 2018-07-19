import * as React from 'react';
import * as  ReactDOM from 'react-dom';
import MonthsRange from './MomentMonthsRange';
import { WeekDays, isDescendant } from './utils';
import { Moment } from 'moment';
import * as moment from "moment";
import classnames from 'classnames';

export interface IDateRangeProps {
    formatString?: string;
    firstDisplayedMonth?: Moment;
    weekStartDay?: WeekDays;
    monthsCount?: number;
    from?: Moment;
    to?: Moment;
    onRangeChange?: (from, to) => void;
}

export class DateRangeState {
    from?: Moment;
    to?: Moment;
    currentInput?: string;
}

export default class MomentDateRange extends React.Component<IDateRangeProps, DateRangeState> {
    constructor(props: IDateRangeProps) {
        super(props);
        this.state = {
            from: props.from != null ? props.from.startOf('day') : null,
            to: props.to != null ? props.to.startOf('day') : null,
            currentInput: ""
        };

        this.onGlobalClick = this.onGlobalClick.bind(this);
    }

    public componentDidMount() {
        document.addEventListener('click', this.onGlobalClick)
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.onGlobalClick)
    }

    componentWillReceiveProps(nextProps: IDateRangeProps) {
        this.setState({
            from: nextProps.from != null ? nextProps.from.startOf('day') : null,
            to: nextProps.to != null ? nextProps.to.startOf('day') : null
        });
    }

    private onGlobalClick(e) {
        if (this.state.currentInput != "" && !isDescendant(ReactDOM.findDOMNode(this), e.target))
            this.setState({ ...this.state, currentInput: "" });
    }

    private onRangeChanged(clickedDate: Moment) {

        let from = this.state.from;
        let to = this.state.to;
        let currentInput = this.state.currentInput;

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

        this.setState({ ...this.state, from, to, currentInput }, () => this.props.onRangeChange(from, to));
    }

    private onKeyDown(e, isToDate) {
        if (e.keyCode == 8 || e.keyCode == 46) {

            let { from, to } = this.state;

            if (isToDate)
                to = null;
            else
                from = null;

            this.setState({ ...this.state, from, to }, () => this.props.onRangeChange(from, to));
        }
    }

    public render() {

        let { from, to } = this.state;

        return (
            <div className="moment-date-range">
                <div className="inputs">
                    <input type="text" placeholder="Start Date"
                        className={classnames("input-from", { focus: this.state.currentInput == "from" })}
                        onFocus={() => { this.setState({ ...this.state, currentInput: "from" }) }}
                        onChange={() => { }}
                        onKeyDown={(e) => this.onKeyDown(e, false)}
                        value={from != null ? from.format(this.props.formatString) : ""} />

                    &nbsp;&nbsp;►&nbsp;&nbsp;

                        <input type="text" placeholder="End Date"
                        className={classnames("input-from", { focus: this.state.currentInput == "to" })}
                        onFocus={() => { this.setState({ ...this.state, currentInput: "to" }) }}
                        onChange={() => { }}
                        onKeyDown={(e) => this.onKeyDown(e, true)}
                        value={to != null ? to.format(this.props.formatString) : ""} />
                </div>

                {this.state.currentInput != "" ? <MonthsRange
                    weekStartDay={this.props.weekStartDay || moment.localeData(moment.locale()).firstDayOfWeek()}
                    monthsCount={this.props.monthsCount || 3}
                    range={{ from, to }}
                    firstDisplayedMonth={this.props.firstDisplayedMonth || moment().startOf('month')}
                    onRangeChange={(clickedDate) => this.onRangeChanged(clickedDate)} /> : null}
            </div>
        );
    }
}
