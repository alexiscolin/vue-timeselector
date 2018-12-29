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
<!-- Default to 24-Hour format H:m -->
<timeselector></timeselector>
```

value prop if passed should be a Date object in order to pass a preconfigured time or Null if you want to set the picker default time as `00:00`.

``` html

<template>
  <timeselector v-model="time"></timeselector>
</template>

<script>
export default {
  name: 'myComponent',
  components: { Timeselector },
  data() {
    return {
      time: new Date() // or null
      // ...
    }
  }
  // ...
}
</script>

```

Using `v-modal` lets you benefit of the "two-way-binding" thanks to the `input` event emitted included in the prop. But you can also use `:value` prop in order to inject data in vue-timeselector component and listen the input manualy:

``` html
<timeselector :value="time" @input="myListenerFunc(e)"></timeselector>
```

Support name attribute for normal html form submission
``` html
<timeselector v-model="time" :name="uniquename"></timeselector>
```

Support id attribute as well
``` html
<timeselector v-model="time" :id="uniqueid"></timeselector>
```

Make a use of state attributes like disabled or required
``` html
<timeselector v-model="time" :required="true" :disabled="false"></timeselector>
```

Choose a placeholder as default views (need more tests)
``` html
<timeselector v-model="time" :placeholder="'Select a time'"></timeselector>
```

Emits events
``` html
<timeselector :value="time" @input="myInputFunc" @opened="myOpenFunc" @closed="myCloseFunc"  @cleared="myClearedFunc"></timeselector>
```

**All [props](#available-props) are listed in the props array below**

**All [events](#events) are listed in the event array below**

### Custom modal box

Vue-timeselector component let you choose what kind of information you want to display in the modal box (aka the picker). You can choose to give your users access to **hours**, **minutes**, **seconds**. Furthermore, you can disable any of them by using the following props:

* `:displayHours="false"` - {Boolean} *optionnal* - default: `true`
* `:displayMinutes="false"` - {Boolean} *optionnal* - default: `true`
* `:displaySeconds="false"` - {Boolean} *optionnal* - default: `false`

Displays options doesn't act on the time format you see in the input field. You need to use custom time formatting props to change it.

Also, keep in mind that *AM-PM options* appears automatically in the modal box by passing the prop `h24` to `false` (`:h24="false"`) - see [here](#12-hours-in-modal) to learn more about it.

### Customized Time Format

Timeselector give the opportunity to customize time displayed and returned *(soon)* format.

By default, timeselector displays time as `H:m:s` (eg, *16:5*) following UTC datetime and 24h format. Time type displayed depends on the modal you have chosen in the modalbox props.

You can change the separator by setting it in the *separator* props : `:separator="':'"`. Default separator is `:` symbol.

The best option to fully custom time displayed in the input is to use the *displayFormat* props : `:displayFormat="'HH[h]mm : ss'"`.

Time may be set to UTC or not in order to display and return UTC time.

Finally, the component returns a `Date` object and is complient witj other format thanks to `returnFormat` props. This props should be configured in the same way as the `displayFormat` props *(SOON)*.

#### String formatter

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


### 12 hours in modal

It's easy to set 12h - 24h time mode on vue-timeselector. Just feed the `:h24` prop ith a Boolean. If true, the modalbox will display time until 23h, if false, the modalbox will display time until 12h and a AM-PM option as well.

Don't forget that h24 only affect the modalbox, so you may wish to set `:format` props in a special way in order to display input time in a 12h format (see above).

### Interval in modal

Vue-timeselector allows you to choose the time interval you want to set for each unit of time in the modalbox. You may want to display only hours that are multiples of two, every minute, and the seconds of the group by ten. To achieve this goal, you only have to fill an object with hours `h`, minutes `m`and seconds `s` keys, that you will set in the `interval` prop.

``` html
<timeselector :value="time" :interval="{h:2, m:1, s:10}"></timeselector>
```

Interval prop default value is `{h:1, m:10, s:10}`:

* **hours: 1**: each hours - eache one unit (0, 1, 2, ...)
* **minutes: 10**: each 10 minutes - eache 10 unit (0, 10, 20, ...)
* **seconds: 10**: each 10 seconds - eache 10 unit (0, 10, 20, ...)


### Highligth time

Just like interval prop, vue-timeselector allows you to choose an highlight list of times you may want to set for each unit of time in the modalbox. You may want to highlight a special hour, minute or second setting in the modalbox. The `highlight` prop give you the opportunity to do that. And because you may also want to highlight multiple times in the same kind of unit (multiple hours and minutes for exemple), vue-timeselector let you emphasis many of them. To achieve this goal, you only have to fill an object with hours `h`, minutes `m`and seconds `s` keys, and feed them with arrays which contain a list of times you wish your users focus on.

``` html
<timeselector :value="time" :h24="false" :highlight="{h:[1, 5], m:[10,45,46], s:null}"></timeselector>
<!-- Will highlight 1h, 5h and 10min, 45min and 46min fields in the modalbox -->
```

Note that list of numbers are not interval but lists of specific times.


### Disable time

Just like highlight prop, vue-timeselector allows you to choose a disabled list of times you may want to set for each unit of time in the modalbox. You may want to disable a special hour, minute or second setting in the modalbox. The `disable` prop give you the opportunity to do that. And because you may also want to also disable multiple times in the same kind of unit (multiple hours and minutes for exemple), vue-timeselector let you disable many of them. To achieve this goal, you only have to fill an object with hours `h`, minutes `m`and seconds `s` keys, and feed them with arrays which contain a list of times you wish your users focus on.

``` html
<timeselector :value="time" :h24="false" :disable="{h:[1, 5], m:null, s:[10,20,25]}"></timeselector>
<!-- Will disable 1h, 5h and 10sec, 20sec and 25sec fields in the modalbox -->
```

Note that list of numbers are not interval but lists of specific times.

### Slots

Slots will help you to introduce some code or text inside the picker.

Slots list:

- **`hours`**: in order to insert code/text above hours selectbox (default: `HH`)
- **`minutes`**: in order to insert code/text above minutes selectbox (default: `mm`)
- **`seconds`**: in order to insert code/text above seconds selectbox (default: `ss`)
- **`ampm`**: in order to insert code/text above ampm selectbox (default: `AM / PM`)
- **`clear-ico`**: in order to insert another icon into the clear button ad symbol (default: `x`)

``` html
<timeselector :value="time" :h24="false" :disable="{h:[1, 5], m:null, s:[10,20,25]}">
  <template slot="hours">
    <span>Hours</span>
  </template>
</timeselector>
```

### Style selector (TODO)

...

### Use classes to curstomize elements
#### Classes structure

vue-timeselector is built following [BEM](http://getbem.com/) guidelines so it's easy for everyone to overrides the component's styles for each elements and their modifiers. Here is that classes structure.

##### Block - Elements

```

| .vtimeselector
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

## Contributing
### Tests

Component tests are made using [Jest](https://jestjs.io/) and are written inside the `tests` folder. You can start a test session by running the following commands:

``` bash

npm test
yarn test

```

### Server

Also you can start a webpack webdev server on the demo file by running the belowing command. It will open a new window at the `9900` port of your local host.

``` bash

npm start
yarn start

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

### TODO

* Clear event
* Picker defined style
* More tests

## License

[MIT](http://opensource.org/licenses/MIT)
