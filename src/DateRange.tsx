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

    enableUserInput?: boolean;

    locale?: string;

    fromInputText?: string;
    toInputText?: string;

    closeOnSelect?: boolean;
    disabledDates?: Moment[];

    onRangeChange?: (from, to) => void;
}

export class DateRangeState {
    from?: Moment;
    to?: Moment;

    fromText?: string;
    toText?: string;

    locale: string;

    longDateFormat: string;

    selectedDates: Moment[];
    currentInput?: string;
}

export default class MomentDateRange extends React.Component<IDateRangeProps, DateRangeState> {

    constructor(props: IDateRangeProps) {
        super(props);

        let longDateFormat = moment.localeData(props.locale || moment.locale()).longDateFormat("L");

        this.state = {
            from: props.from != null ? props.from.startOf('day') : null,
            to: props.to != null ? props.to.startOf('day') : null,

            fromText: props.from != null ? props.from.locale(props.locale).format(props.formatString || longDateFormat) : "",
            toText: props.to != null ? props.to.locale(props.locale).format(props.formatString || longDateFormat) : "",

            longDateFormat: longDateFormat,

            locale: props.locale || moment.locale(),
            currentInput: "",
            selectedDates: []
        };

        this.onGlobalClick = this.onGlobalClick.bind(this);
    }

    public componentDidMount() {
        document.addEventListener('click', this.onGlobalClick);
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.onGlobalClick);
    }

    public componentWillReceiveProps(nextProps: IDateRangeProps) {

        let longDateFormat = moment.localeData(nextProps.locale || this.state.locale).longDateFormat("L");
        this.setState({
            from: nextProps.from != null ? nextProps.from.startOf('day') : null,
            to: nextProps.to != null ? nextProps.to.startOf('day') : null,
            toText: nextProps.to != null ? nextProps.to.format(nextProps.formatString || longDateFormat) : "",
            fromText: nextProps.from != null ? nextProps.from.format(nextProps.formatString || longDateFormat) : "",
            locale: nextProps.locale || this.state.locale,
            longDateFormat
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

    private onRangeChanged(newCurrentDate: Moment, swithInput: boolean = true) {

        let { from, to, currentInput } = this.state;

        if (currentInput == "from") {

            if (to != null && to.isBefore(newCurrentDate)) {
                to = null;
            }
            from = newCurrentDate;
        }
        else {
            if (from != null && from.isAfter(newCurrentDate)) {
                to = null;
                from = newCurrentDate;
            }
            else {
                to = newCurrentDate;
            }
        }

        if (isAnyBetween(this.props.disabledDates, from, to))
            return;

        if (swithInput == true) {
            if (currentInput == "from") {
                currentInput = "to";
            }
            else {
                if (from != null && from.isAfter(newCurrentDate)) {
                    currentInput = "to";
                }
                else {
                    if (this.props.closeOnSelect == true)
                        currentInput = "";
                    else
                        currentInput = "from";
                }
            }
        }

        let selectedDates = [];
        if (from != null && to != null) {
            for (let days = 0; days <= to.diff(from, 'days'); days++) {
                selectedDates.push(from.clone().add(days, 'day'));
            }
        }

        this.setState({
            ...this.state,
            from,
            to,
            currentInput,
            selectedDates,
            toText: to != null ? to.format(this.state.longDateFormat) : "",
            fromText: from != null ? from.format(this.state.longDateFormat) : ""
        }, () => this.props.onRangeChange(from, to));
    }

    private onKeyDown(e, isToDate) {

        if ((this.props.enableUserInput || false) == true)
            return;

        if (e.keyCode != 8 && e.keyCode != 46)
            return;

        let { from, to, fromText, toText } = this.state;

        if (isToDate) {
            to = null;
            toText = "";
        }
        else {
            from = null;
            fromText = "";
        }

        this.setState({ ...this.state, from, to, fromText, toText }, () => this.props.onRangeChange(from, to));
    }

    private onInputChange(dateText: string) {

        if (this.props.enableUserInput == null || this.props.enableUserInput == false)
            return;

        let date = moment(dateText, this.props.formatString || this.state.longDateFormat, true);
        let isFromDate = this.state.currentInput == "from";

        if (date.isValid() == false) {
            if (isFromDate == true) {
                this.setState({ ...this.state, fromText: dateText, from: null, selectedDates: [] });
            }
            else {
                this.setState({ ...this.state, toText: dateText, to: null, selectedDates: [] });
            }
        }
        else {
            this.onRangeChanged(date, false);
        }
    }

    public render() {

        let { currentInput, from, to } = this.state;

        return (
            <div className="moment-date-range">
                <div className="inputs">
                    <input type="text" placeholder={this.props.fromInputText || "From"}
                        className={classnames("input-from", { focus: currentInput == "from" })}
                        onFocus={() => { this.setState({ ...this.state, currentInput: "from" }) }}
                        onChange={(e) => this.onInputChange(e.target.value)}
                        onKeyDown={(e) => this.onKeyDown(e, false)}
                        value={this.state.fromText} />

                    &nbsp;&nbsp;►&nbsp;&nbsp;

                        <input type="text" placeholder={this.props.toInputText || "To"}
                        className={classnames("input-to", { focus: currentInput == "to" })}
                        onFocus={() => { this.setState({ ...this.state, currentInput: "to" }) }}
                        onChange={(e) => this.onInputChange(e.target.value)}
                        onKeyDown={(e) => this.onKeyDown(e, true)}
                        value={this.state.toText} />
                </div>

                {this.state.currentInput != "" ? <MonthsRange
                    from={from}
                    to={to}
                    selectedDates={this.state.selectedDates}
                    disabledDates={this.props.disabledDates || []}
                    monthsCount={this.props.monthsCount || 3}
                    firstDisplayedMonth={this.props.firstDisplayedMonth || moment().locale(this.state.locale).startOf('month')}
                    weekStartDay={this.props.weekStartDay || moment.localeData(this.state.locale).firstDayOfWeek()}
                    onCurrentDateChange={(currentDate) => this.onCurrentDateChanged(currentDate)}
                    onRangeChange={(clickedDate) => this.onRangeChanged(clickedDate)} /> : null}
            </div>
        );
    }
}
