import * as moment from "moment";
import * as React from "react";

import MomentDateRange from "moment-date-range/dist/MomentDateRange";
import { WeekDays } from "moment-date-range/dist/utils";
require("moment-date-range/dist/MomentDateRange.css");

require("./Index.less");

export default class Index extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {

        return <div className="container" style={{ fontFamily: 'Open Sans, sans-serif' }}>

            <select onChange={(e) => { moment.locale(e.target.value); this.forceUpdate() }}>
                <option value="en">EN</option>
                <option value="ru">RU</option>
            </select>

            <MomentDateRange
                formatString="DD-MM-YY"
                weekStartDay={WeekDays.Monday}
                monthsCount={3}
                onRangeChange={(from, to) => console.info(from != null ? from.format("MM/DD/YY") : null, to != null ? to.format("MM/DD/YY") : null)}
            /><br />
            <MomentDateRange
                formatString="DD MMM YY"               
                from={moment().startOf('year')}
                firstDisplayedMonth={moment().startOf('year').add(-1, 'month')}                
                monthsCount={4}
                onRangeChange={(from, to) => console.info(from != null ? from.format("MM/DD/YY") : null, to != null ? to.format("MM/DD/YY") : null)}
            /><br />

            <MomentDateRange
                formatString="DD MMM YYYY"
                monthsCount={1}
                weekStartDay={WeekDays.Friday}
                to={moment().add(1, 'month')}
                firstDisplayedMonth={moment().add(1, 'month')}
                onRangeChange={(from, to) => console.info(from != null ? from.format("MM/DD/YY") : null, to != null ? to.format("MM/DD/YY") : null)}
            /><br />
            <MomentDateRange
                formatString="MM/DD/YYYY"
                from={moment()}
                to={moment().add(1, "month")}
                weekStartDay={WeekDays.Monday}
                onRangeChange={(from, to) => console.info(from != null ? from.format("MM/DD/YY") : null, to != null ? to.format("MM/DD/YY") : null)}
            />
        </div>;
    }
}
