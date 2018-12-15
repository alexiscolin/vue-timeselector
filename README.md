# vue-timeselector
🕒 Simple customizable Vue.js timepicker component

## Install

``` bash
npm install vue-timeselector --save
```
or
``` bash
yarn add vue-timeselector
```

``` javascript
import Timeselector from 'vue-timeselector';

export default {
  // ...
  components: {
    Timeselector
  }
  // ...
}
```

## Available props

| Prop                          | Type             | Default             | Description                                              |
|-------------------------------|------------------|---------------------|----------------------------------------------------------|
| value                         | Date             | `TODO`              | Date value of the timepicker                             |
| name                          | String           |                     | Input name property                                      |
| id                            | String           |                     | Input id                                                 |
| placeholder                   | String           | `TODO`              | Input placeholder text                                   |
| required                      | Boolean          | false               | Sets html required attribute on input                    |
| disabled                      | Boolean          | `TODO`              | If true, disable timepicker on screen                    |
| displayHours                  | Boolean          | true                | Display hours to the input                               |
| displayMinutes                | Boolean          | true                | Display minutes to the input                             |
| displaySeconds                | Boolean          | false               | Display seconds to the input                             |
| separator                     | String           | ":"                 | Separator symbol                                         |
| padTime                       | Boolean          | true                | Pads number with a zero                                  |
| format                        | String           |                     | Time formating string                                    |
| h24                           | Boolean          | false               | Display 24 hours format                                  |
| inline                        | Boolean          | false               | Show the timepicker always open                          |
| initialView                   | Boolean          | false               | Open on the first                                        |
| interval                      | Object           | {h:1, m:10, s:10}   | Define hours, minutes and seconds interval to the picker |
| highlight                     | Object           | `TODO`              | Hightligth defined time on hours, minutes and seconds    |
| disableTime                   | Object           | `TODO`              | disable specific time on hours, minutes and seconds      |
| pickerStyle                   | String           | `TODO`              | Set the timepicker style                                 |


## Events

These events are emitted on actions in the timepicker

| Event             | Output     | Description                          |
|-------------------|------------|--------------------------------------|
| opened            |            | The picker is opened                 |
| closed            |            | The picker is closed                 |
| selectedHour      | Date\|null | An hour has been selected            |
| selectedMinute    | Date\|null | A minute has been selected           |
| selectedSecond    | Date\|null | A second has been selected           |
| selectedDisabled  | Object     | A disabled time has been selected    |
| input             | Date\|null | Input value has been modified        |
| cleared           |            | Selected time has been cleared       |

## Time formatting
### String formatter

| Token | Desc                                    | Example         |
|-------|-----------------------------------------|-----------------|
| H     | hour from 0 to 23 (non-zero padded)     | 0 1 ... 22 23   |
| HH    | hour from 0 to 23 (zero padded)         | 00 01 ... 22 23 |
| h     | hour from 1 to 12 (non-zero padded)     | 1 2 ... 11 12   |
| hh    | hour from 1 to 12 (zero padded)         | 01 02 ... 11 12 |
| k     | hour from 1 to 24 (non-zero padded)     | 1 2 ... 23 24   |
| kk    | hour from 1 to 24 (zero padded)         | 01 02 ... 23 24 |
| m     | one digit minutes                       | 0 1 ... 58 59   |
| mm    | two digits minutes                      | 00 01 ... 58 59 |
| s     | one digit seconds                       | 0 1 ... 58 59   |
| ss    | two digits seconds                      | 00 01 ... 58 59 |
