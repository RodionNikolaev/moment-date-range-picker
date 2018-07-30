import { Moment } from "moment";
import * as React from "react";

export interface MonthHeaderProps {
    month: Moment;
}

export class MonthHeader extends React.Component<MonthHeaderProps, any> {
    constructor(props: MonthHeaderProps) {
        super(props);
    }

    public render() {
        return (
            <thead className="rc-date-range header">
                <tr>
                    <td colSpan={7}>{this.props.month.format('MMMM YYYY')}</td>
                </tr>
            </thead>
        );
    }
}
