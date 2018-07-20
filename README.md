# moment-date-range-picker
Simple and lightweight React date range picker component based on moment.js. 

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
                formatString="DD MMM YYYY"
                monthsCount={4}
                weekStartDay={WeekDays.Friday}
                from={moment().add(5, 'day')}
                to={moment().add(1, 'month')}
                firstDisplayedMonth={moment().add(-1, 'month')}
                onRangeChange={(from, to) => console.info(from, to)}
 />
```

### Component properties
```js 
export interface IDateRangeProps {
    formatString?: string;
    firstDisplayedMonth?: Moment;
    weekStartDay?: WeekDays;
    monthsCount?: number;
    from?: Moment;
    to?: Moment;
    locale?: string;
    fromText?: string;
    toText?: string;
    onRangeChange?: (from, to) => void;
}
```
