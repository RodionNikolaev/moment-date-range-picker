import * as React from "react";
import { Moment } from "moment";
import { WeekDays, Range } from "./utils";
interface IMonthsRangeProps {
    firstDisplayedMonth?: Moment;
    monthsCount?: any;
    weekStartDay?: WeekDays;
    range?: Range;
    onRangeChange?: (newDate: Moment) => void;
}
declare class MonthsRangeState extends Range {
    currentStartMonth: Moment;
    currentDate?: Moment;
}
export default class MonthsRange extends React.Component<IMonthsRangeProps, MonthsRangeState> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: IMonthsRangeProps): void;
    onPrevMonth(): void;
    onNextMonth(): void;
    render(): JSX.Element;
}
export {};
