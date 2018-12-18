# vue-timeselector
🕒 Simple customizable Vue.js timepicker component

![Travis (.org)](https://travis-ci.com/alexiscolin/vue-timeselector.svg?branch=master)
![David](https://img.shields.io/david/alexiscolin/vue-timeselector.svg)
![NpmLicense](https://img.shields.io/npm/l/vue-timeselector.svg)

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

``` html
<!-- Default to 24-Hour format HH:mm -->
<timeselector></timeselector>
```

value prop if passed should be a Date object in order to pass a preconfigured time or Null if you want to set the picker default time as `00:00`.

``` html
<script>
var state = {
  time: new Date() // or null
}
</script>
<timeselector :value="state.date"></timeselector>
```
Using `v-model`
``` html
<datepicker v-model="state.date"></datepicker>
```

Support name attribute for normal html form submission
``` html
<datepicker :value="state.date" :name="uniquename"></datepicker>
```

Support id attribute as well
``` html
<datepicker :value="state.date" :id="uniqueid"></datepicker>
```

Make a use of state attributes like disabled or required
``` html
<datepicker :value="state.date" :required="true" :disabled="false"></datepicker>
```

Choose a placeholder as default views (need more tests)
``` html
<datepicker :value="state.date" :placeholder="'Select a time'"></datepicker>
```

Emits events
``` html
<datepicker @input="myInputFunc" @opened="myOpenFunc" @closed="myCloseFunc">
```

### Custom modal

* displayHours
* displayMinutes
* displaySeconds

### Customized Time Format

* displayed
* returned
* utc
* separator

...


### 12 Hours in modal

...

### Interval in modal

...

### Highligth time

...

### Disable time

...

### Slot (TODO)

...

### Style sdelector (TODO)


### Use classes to curstomize elements
#### Classes structure

vue-timeselector is built following [BEM](http://getbem.com/) guidelines so it's easy for everyone to overrides the component's styles for each elements and their modifiers. Here is that classes structure.

##### Block - Elements

```
.vtimeselector
|
|----- .vtimeselector__input
|----- .vtimeselector__box
|      |
|      | ----- .vtimeselector__box__list .vtimeselector__box__list--hours
|      |       |
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--hours
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--hours
|      |       | ----- ...
|      |
|      | ----- .vtimeselector__box__list .vtimeselector__box__list--minutes
|      |       |
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--minutes
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--minutes
|      |       | ----- ...
|      |
|      | ----- .vtimeselector__box__list .vtimeselector__box__list--seconds
|      |       |
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--seconds
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--seconds
|      |       | ----- ..
|      |
|      | ----- .vtimeselector__box__list .vtimeselector__box__list--ampm
|      |       |
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--ampm
|      |       | ----- vtimeselector__box__item .vtimeselector__box__item--ampm
|      |       | ----- ...


```

##### Mofifiers

- **`.vtimeselector__input--is-open`**: Modifier displayed on `.vtimeselector__input` element when the modal is opened

- **`.vtimeselector__box--is-closed`**: Modifier displayed on `.vtimeselector__box` element when the modal is closed

- **`.timeselector__box__item--is-highlighted`**: Modifier displayed on `.timeselector__box__item` element when the item is highlighted

- **`.timeselector__box__item--is-selected`**: Modifier displayed on `.timeselector__box__item` element when the item is selected

- **`.timeselector__box__item--is-disabled`**: Modifier displayed on `.timeselector__box__item` element when the item is disabled


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
### Tests

Component tests are made using [Jest](https://jestjs.io/) and are written inside the `tests` folder. You can start a test session by running the following commands:

``` bash

npm test
yarn test

```

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
