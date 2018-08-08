# moment-date-range-picker
Simple and lightweight React date range picker component based on moment.js. 
Independ localization, input text format and week start day.

![alt text](https://raw.githubusercontent.com/RodionNikolaev/moment-date-range-picker/master/docs/moment-date-range-picker.png)

[Demo page](https://rodionnikolaev.github.io/moment-date-range-picker/)

### Install
```
npm install moment-date-range-picker --save
```

### Usage
```js
import MomentDateRange from "moment-date-range-picker/dist/MomentDateRange";
import { WeekDays } from "moment-date-range-picker/dist/utils";
require("moment-date-range-picker/dist/MomentDateRange.css");

 <MomentDateRange
        from={moment().startOf('day')}
        to={moment().startOf('day').add(5, 'day')}

        fromText="From"
        toText="To"

        formatString="MM-DD-YYYY"

        weekStartDay={WeekDays.Friday}

        closeOnSelect={false}

        firstDisplayedMonth={moment().startOf('month').add(-1, 'month')}
        locale={moment.locale()}

        monthsCount={2}
        enableUserInput={true}

        disabledDates={[moment().startOf('day').add(7, 'day')]}

        onRangeChange={(from: Moment, to: Moment) => { console.info(from.format, to.format()) }}
 />
```

### Component properties
```js 
export interface IDateRangeProps {

    from?: Moment; // Moment object. Default null.
    to?: Moment; // Moment object. Default null.

    fromInputText?: string; // String. Default 'From'.
    toInputText?: string; // String. Default 'To'.

    formatString?: string;  // String. Default 'L' from current moment locale.

    weekStartDay?: WeekDays; // Number 0-6 (Sunday-Saturday). Default take from current moment locale.

    closeOnSelect?: boolean; // Boolean. Close on to selected. Default 'true'.

    firstDisplayedMonth?: Moment; // Moment object. Default current month.

    locale?: string; // String. Default from current moment locale.
    
    monthsCount?: number; // Number. Default 3.

    enableUserInput:boolean; // Boolean. Default false.
  
    disabledDates?: Moment[]; // Moment objects array. Default empty.
    
    onRangeChange?: (from, to) => void;
}
```
