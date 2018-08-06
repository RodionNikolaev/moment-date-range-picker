import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as moment from 'moment';

import MomentDateRange from '../src/DateRange';
import { WeekDays } from '../src/utils';
require('../src/DateRange.less')
require('./app.less');

export default class App extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <select onChange={(e) => { moment.locale(e.target.value); this.forceUpdate(); }}>
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                </select>

                <MomentDateRange
                    firstDisplayedMonth={moment().startOf('month').add(-1, 'month')}
                    from={moment().startOf('day')}
                    locale={moment.locale()}
                    monthsCount={2}
                    onRangeChange={(from, to) => { }}
                />
                <br />

                <MomentDateRange
                    locale={"ru"}
                    fromText="С"
                    toText="По"
                    from={moment().startOf('day')}
                    to={moment().startOf('day').add(14, 'day')}
                    disabledDates={[moment().startOf('day').add(4, 'day'), moment().startOf('day').add(9, 'day')]}
                    weekStartDay={WeekDays.Friday}
                    formatString="DD MMM YY"
                    closeOnSelect={false}
                    onRangeChange={(from, to) => { }}
                    onError={(error: Error) => console.error(error)}
                />
            </div>
        );
    }
}


window.onload = function () {
    ReactDOM.render(<App />, document.getElementById("container"));
};







