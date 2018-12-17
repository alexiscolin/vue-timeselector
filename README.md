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

## Usage
### Basic Usage

...

### Customized Time Format

...

### Use classes to curstomize elements

#### Classes structure

##### Block - Elements

```
.vtimeselector
|
|----- .vtimeselector__input
|----- .vtimeselector__box
|      |
|      | ----- .vtimeselector__box__list .vtimeselector__box__list--hours
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--hours
|      |
|      | ----- .vtimeselector__box__list .vtimeselector__box__list--minutes
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--minutes
|      |
|      | ----- .vtimeselector__box__list .vtimeselector__box__list--seconds
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--seconds

```

##### Mofifiers

`.vtimeselector__input--is-open`

`.vtimeselector__box--is-closed`

`.timeselector__box__item--is-highlighted`

`.timeselector__box__item--is-selected`

`.timeselector__box__item--is-disabled`


## Available props

| Prop                          | Type             | Default             | Description                                              |
|-------------------------------|------------------|---------------------|----------------------------------------------------------|
| value                         | Date / Null      |                     | Date value of the timepicker                             |
| name                          | String           |                     | Input name property                                      |
| id                            | String           |                     | Input id                                                 |
| placeholder                   | String           |                     | Input placeholder text                                   |
| required                      | Boolean          | false               | Sets html required attribute on input                    |
| disabled                      | Boolean          | false               | If true, disable timepicker on screen                    |
| displayHours                  | Boolean          | true                | Display hours to the input                               |
| displayMinutes                | Boolean          | true                | Display minutes to the input                             |
| displaySeconds                | Boolean          | false               | Display seconds to the input                             |
| separator                     | String           | ":"                 | Separator symbol used if no displayFormat                |
| padTime                       | Boolean          | true                | Pads number with a zero (both input and modal)           |
| displayFormat                 | String           |                     | Time formatting string displayed                         |
| returnFormat                  | String           | `TODO`              | Time formatting string returned                          |
| h24                           | Boolean          | false               | Display 24 hours format                                  |
| utc                           | Boolean          | true                | Return UTC date format                                   |
| inline                        | Boolean          | false               | Show the timepicker always open                          |
| initialView                   | Boolean          | false               | Open on the first                                        |
| interval                      | Object           | {h:1, m:10, s:10}   | Define hours, minutes and seconds interval to the picker |
| highlight                     | Object           |                     | Hightligth defined time on hours, minutes and seconds    |
| disable                       | Object           |                     | Disable specific time on hours, minutes and seconds      |
| pickerStyle                   | String           | `TODO`              | Set the timepicker style                                 |


## Events

These events are emitted on actions in the timepicker

| Event             | Output     | Description                          |
|-------------------|------------|--------------------------------------|
| opened            | Node       | The picker is opened                 |
| closed            | Node       | The picker is closed                 |
| selectedHour      | Date       | An hour has been selected            |
| selectedMinute    | Date       | A minute has been selected           |
| selectedSecond    | Date       | A second has been selected           |
| selectedAmpm      | String     | A ampm field has been selected       |
| selectedDisabled  | Object     | A disabled time has been selected    |
| input             | Date       | Input value has been modified        |
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

## Contributing
### Documentation

vue-timeselector make a use of [vue-styleguidist](https://vue-styleguidist.github.io/) to generate auto documentation. In order to regenerate it, run the following commands:

``` bash
# to start style a guide dev server
npm run styleguide

# to build a static version
npm run styleguide:build
```

**Component's documentation is available [here](https://alexiscolin.github.io/vue-timeselector/)**

## License

[MIT](http://opensource.org/licenses/MIT)
