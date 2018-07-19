import * as React from "react";
import { Moment } from "moment";
import { WeekDays } from "./utils";
interface MonthProps {
    firstMonthDay: Moment;
    weekStartDay: WeekDays;
    currentDate: Moment;
    from: Moment;
    to: Moment;
    onClick?: (clicedkDate: Moment) => void;
    onCurrentDateChange?: (currentDate: Moment) => void;
}
declare class MonthState {
    weeks: any[];
}
export default class Month extends React.Component<MonthProps, MonthState> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
