import * as React from 'react';
import { WeekDays } from './utils';
import { Moment } from 'moment';
interface IDateRangeProps {
    formatString?: string;
    firstDisplayedMonth?: Moment;
    weekStartDay?: WeekDays;
    monthsCount?: number;
    from?: Moment;
    to?: Moment;
    onRangeChange?: (from: any, to: any) => void;
}
declare class DateRangeState {
    from?: Moment;
    to?: Moment;
    currentInput?: string;
}
export default class MomentDateRange extends React.Component<IDateRangeProps, DateRangeState> {
    constructor(props: IDateRangeProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IDateRangeProps): void;
    private onGlobalClick;
    private onRangeChanged;
    private onKeyDown;
    render(): JSX.Element;
}
export {};
