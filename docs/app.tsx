import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as moment from 'moment';

import MomentDateRange from '../src/MomentDateRange';
import { WeekDays } from '../src/utils';
require('../src/MomentDateRange.less')
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
                <br/>

                {/* <MomentDateRange
                    weekStartDay={WeekDays.Friday}
                    formatString="DD MMM YY"
                    locale={"ru"}
                    fromText="С"
                    toText="По"
                    from={moment().startOf('day')}
                    to={moment().startOf('day').add(14, 'day')}
                    onRangeChange={(from, to) => { }}
                />  */}
            </div>
        );
    }
}


window.onload = function () {
    ReactDOM.render(<App />, document.getElementById("container"));
};







