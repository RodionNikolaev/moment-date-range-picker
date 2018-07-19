import { Moment } from "moment";
import * as React from "react";
export interface MonthHeaderProps {
    month: Moment;
}
export declare class MonthHeader extends React.Component<MonthHeaderProps, any> {
    constructor(props: MonthHeaderProps);
    render(): JSX.Element;
}
