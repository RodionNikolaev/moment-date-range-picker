import * as moment from 'moment';
import * as React from 'react';
import * as ReactDOM from "react-dom";
import MomentDateRange from '../src/DateRange';
import '../src/DateRange.less';
import { WeekDays } from '../src/utils';
import './app.less';

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
                    enableUserInput={true}
                    onRangeChange={(from, to) => { console.info(from, to) }}
                />
                <br />

                <MomentDateRange
                    locale={"ru"}
                    fromInputText="С"
                    toInputText="По"
                    from={moment().startOf('day')}
                    to={moment().startOf('day').add(14, 'day')}
                    disabledDates={[moment().startOf('day').add(4, 'day'), moment().startOf('day').add(9, 'day')]}
                    weekStartDay={WeekDays.Friday}
                    formatString="DD-MM-YY"
                    closeOnSelect={false}
                    enableUserInput={true}
                    onRangeChange={(from, to) => { console.info(from, to) }}
                />
            </div>
        );
    }
}


window.onload = function () {
    ReactDOM.render(<App />, document.getElementById("container"));
};







