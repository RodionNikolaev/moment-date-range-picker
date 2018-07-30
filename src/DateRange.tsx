import * as React from 'react';
import * as  ReactDOM from 'react-dom';
import MonthsRange from './MonthsRange';
import { WeekDays, isDescendant, getActualRange, isAnyBetween } from './utils';
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

    locale?: string;
    fromText?: string;
    toText?: string;
    closeOnSelect?: boolean;
    disabledDates?: Moment[];
    onRangeChange?: (from, to) => void;
}

export class DateRangeState {
    from?: Moment;
    to?: Moment;

    locale: string;

    selectedDates: Moment[];
    currentInput?: string;
}

export default class MomentDateRange extends React.Component<IDateRangeProps, DateRangeState> {
    constructor(props: IDateRangeProps) {
        super(props);
        this.state = {
            from: props.from != null ? props.from.startOf('day') : null,
            to: props.to != null ? props.to.startOf('day') : null,
            locale: props.locale || moment.locale(),
            currentInput: "",
            selectedDates: []
        };

        moment.locale(props.locale);
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
            to: nextProps.to != null ? nextProps.to.startOf('day') : null,
            locale: nextProps.locale || this.state.locale
        });
    }

    private onGlobalClick(e) {
        if (this.state.currentInput != "" && !isDescendant(ReactDOM.findDOMNode(this), e.target))
            this.setState({ ...this.state, currentInput: "" });
    }

    private onCurrentDateChanged(newCurrentDate: Moment) {

        let { from, to, currentInput } = this.state;

        let actualRange;
        if ((currentInput == "from" && to == null) || (currentInput == "to" && from == null))
            actualRange = [newCurrentDate, newCurrentDate];
        else
            actualRange = getActualRange(currentInput == "from", from || newCurrentDate, to || newCurrentDate, this.props.disabledDates);

        this.setState({ ...this.state, selectedDates: actualRange });
    }

    private onRangeChanged(newCurrentDate: Moment) {

        let { from, to, currentInput } = this.state;

        if (currentInput == "from") {
            currentInput = "to";

            if (to != null && to.isBefore(newCurrentDate)) {
                to = null;
            }
            from = newCurrentDate;
        }
        else {
            if (from != null && from.isAfter(newCurrentDate)) {
                to = null;
                from = newCurrentDate;
                currentInput = "to";
            }
            else {
                if (this.props.closeOnSelect == true)
                    currentInput = "";
                else
                    currentInput = "from";
                to = newCurrentDate;
            }
        }

        if (from != null && to != null && isAnyBetween(this.props.disabledDates, from, to))
            return;

        let selectedDates = [];
        if (from != null && to != null) {
            for (let days = 0; days <= to.diff(from, 'days'); days++) {
                selectedDates.push(from.clone().add(days, 'day'));
            }
        }

        this.setState({ ...this.state, from, to, currentInput, selectedDates }, () => this.props.onRangeChange(from, to));
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

        let { currentInput, from, to } = this.state;

        return (
            <div className="moment-date-range">
                <div className="inputs">
                    <input type="text" placeholder={this.props.fromText || "Start Date"}
                        className={classnames("input-from", { focus: currentInput == "from" })}
                        onFocus={() => { this.setState({ ...this.state, currentInput: "from" }) }}
                        onChange={() => { }}
                        onKeyDown={(e) => this.onKeyDown(e, false)}
                        value={from != null ? from.locale(this.state.locale).format(this.props.formatString || "L") : ""} />

                    &nbsp;&nbsp;►&nbsp;&nbsp;

                        <input type="text" placeholder={this.props.toText || "End Date"}
                        className={classnames("input-from", { focus: currentInput == "to" })}
                        onFocus={() => { this.setState({ ...this.state, currentInput: "to" }) }}
                        onChange={() => { }}
                        onKeyDown={(e) => this.onKeyDown(e, true)}
                        value={to != null ? to.locale(this.state.locale).format(this.props.formatString || "L") : ""} />
                </div>

                {this.state.currentInput != "" ? <MonthsRange
                    from={from}
                    to={to}
                    selectedDates={this.state.selectedDates}
                    disabledDates={this.props.disabledDates || []}
                    monthsCount={this.props.monthsCount || 3}
                    firstDisplayedMonth={this.props.firstDisplayedMonth || moment().startOf('month')}
                    weekStartDay={this.props.weekStartDay || moment.localeData(this.state.locale).firstDayOfWeek()}
                    onCurrentDateChange={(currentDate) => this.onCurrentDateChanged(currentDate)}
                    onRangeChange={(clickedDate) => this.onRangeChanged(clickedDate)} /> : null}
            </div>
        );
    }
}
