<template>
  <div class="vtimeselector">
    <input type="text"
           readonly="readonly"
           autocomplete="off"
           class="vtimeselector__input"
           :value="timeFormated('displayFormat')"
           :id="id"
           :disabled="disabled"
           :required="required"
           :name="name"
           :class="{'vtimeselector__input--is-open': !pickerState.isClosed}"
           @click="togglePicker">
    <div class="vtimeselector__clear" @click="clearTime">
      <slot name="clear-ico"><span class="vtimeselector__clear__ico">x</span></slot>
    </div>

    <div class="vtimeselector__box" :class="{'vtimeselector__box--is-closed': pickerState.isClosed}">
        <ul class="vtimeselector__box__list vtimeselector__box__list--hours" v-if="displayHours">
          <li class="vtimeselector__box__head"><slot name="hours">HH</slot></li>
          <li class="vtimeselector__box__item vtimeselector__box__item--hours"
              v-for="(hour, index) in timeCount(interval.h, hoursLength)" :key="index"
              :class="{'timeselector__box__item--is-selected': pickerState.selected.hour == hour, 'timeselector__box__item--is-highlighted': getState('hour', 'highlight', hour), 'timeselector__box__item--is-disabled': getState('hour', 'disable', hour)}"
              @click="selectTime('hour', hour, $event)">{{hour}}</li>
        </ul>
        <ul class="vtimeselector__box__list vtimeselector__box__list--minutes" v-if="displayMinutes">
          <li class="vtimeselector__box__head"><slot name="minutes">mm</slot></li>
          <li class="vtimeselector__box__item vtimeselector__box__item--minutes"
              v-for="(minute, index) in timeCount(interval.m)" :key="index"
              :class="{'timeselector__box__item--is-selected': pickerState.selected.minute == minute, 'timeselector__box__item--is-highlighted': getState('minute', 'highlight', minute), 'timeselector__box__item--is-disabled': getState('minute', 'disable', minute)}"
              @click="selectTime('minute', minute, $event)">{{minute}}</li>
        </ul>
        <ul class="vtimeselector__box__list vtimeselector__box__list--seconds"  v-if="displaySeconds">
          <li class="vtimeselector__box__head"><slot name="seconds">ss</slot></li>
          <li class="vtimeselector__box__item vtimeselector__box__item--seconds"
              v-for="(second, index) in timeCount(interval.s)" :key="index"
              :class="{'timeselector__box__item--is-selected': pickerState.selected.second == second, 'timeselector__box__item--is-highlighted': getState('second', 'highlight', second), 'timeselector__box__item--is-disabled': getState('second', 'disable', second)}"
              @click="selectTime('second', second, $event)">{{second}}</li>
        </ul>
        <ul class="vtimeselector__box__list vtimeselector__box__list--ampm"  v-if="!h24">
          <li class="vtimeselector__box__head"><slot name="ampm">AM / PM</slot></li>
          <li class="vtimeselector__box__item vtimeselector__box__item--ampm"
              :class="{'timeselector__box__item--is-selected': pickerState.selected.ampm === 'AM'}"
              @click="selectTime('ampm', 'AM', $event)">AM</li>
          <li class="vtimeselector__box__item vtimeselector__box__item--ampm"
              :class="{'timeselector__box__item--is-selected': pickerState.selected.ampm === 'PM'}"
              @click="selectTime('ampm', 'PM', $event)">PM</li>
        </ul>
    </div>
  </div>
</template>

<script>

/**
 * Timeselector component. Click bellow to see more informations about the component
 * @example ../README.md
 */
export default {
  name: 'timeselector',
  props: {
    /**
    * Data binding
    * @model
    */
    value: {
      type: [String, Date]
    },
    /**
    * Input id property
    */
    id: {
      type: String
    },
    /**
    * Input placeholder text
    */
    placeholder: {
      type: String
    },
    /**
    * Input name property
    */
    name: {
      type: String
    },
    /**
    * Sets html required attribute on input
    */
    required: {
      type: Boolean,
      default: false
    },
    /**
    * Disable input
    */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
    * Display hours to the input or not
    */
    displayHours: {
      type: Boolean,
      default: true
    },
    /**
    * Display minutes to the input or not
    */
    displayMinutes: {
      type: Boolean,
      default: true
    },
    /**
    * Display seconds to the input or not
    */
    displaySeconds: {
      type: Boolean,
      default: false
    },
    /**
    * Separator symbol
    */
    separator: {
      type: String,
      default: ':'
    },
    /**
    * Open the picker on the first
    */
    initialView: {
      type: Boolean,
      default: false
    },
    /**
    * Pads number with a zero or not
    */
    padTime: {
      type: Boolean,
      default: false
    },
    /**
    * Time formatting string displayed
    */
    displayFormat: {
      type: String
    },
    /**
    * Time formatting string returned
    */
    returnFormat: {
      type: String
    },
    /**
    * Display 24 hours format or not
    */
    h24: {
      type: Boolean,
      default: true
    },
    /**
    * Return UTC date format or not
    */
    utc: {
      type: Boolean,
      default: false
    },
    /**
    * Define hours, minutes and seconds interval to the picker
    */
    interval: {
      type: Object,
      default: function () {
        return {
          h: 1,
          m: 10,
          s: 10
        }
      }
    },
    /**
    * Define hours, minutes and seconds that had to be hightlighted on the picker
    */
    highlight: {
      type: Object,
      default: function () {
        return {
          h: null,
          m: null,
          s: null,
          ampm: null
        }
      }
    },
    /**
    * Disable specific time on hours, minutes and seconds
    */
    disable: {
      type: Object,
      default: function () {
        return {
          h: null,
          m: null,
          s: null,
          ampm: null
        }
      }
    }
  },
  data () {
    return {
      pickerState: {
        selected: {
          hour: null,
          minute: null,
          second: null,
          ampm: null
        },
        time: new Date(),
        isClosed: true,
        isPristine: true
      },
      formater: ['HH', 'H', 'hh', 'h', 'kk', 'k', 'mm', 'm', 'ss', 's', 'a'],
      longHourCount: 24,
      shortHourCount: 12,
      minCount: 60,
      secCount: 60
    }
  },
  computed: {
    picker () {
      return {
        hour: this.value ? (this.utc ? this.value.getUTCHours() : this.value.getHours()) : 0,
        minute: this.value ? (this.utc ? this.value.getUTCMinutes() : this.value.getMinutes()) : 0,
        second: this.value ? (this.utc ? this.value.getUTCSeconds() : this.value.getSeconds()) : 0,
        ampm: !this.h24 ? (this.value ? (this.value.getHours() > 12 ? 'PM' : 'AM') : null ) : null,
      }
    },
    /**
    * Get 24|12 hours mode
    * @return {Number} - function to generate time replacement
    */
    hoursLength () {
      return this.h24 ? this.longHourCount : this.shortHourCount;
    },

    /**
    * Rules that defines time replacement in regex
    * @return {Object} - function to generate time replacement
    */
    displayRules () {
      return {
        HH: () => this.pad(this.picker.hour, true),
        H: () => this.picker.hour,
        kk: () => this.pad(this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour, true),
        k: () => this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour,
        hh: () => {
          if (this.h24)
            return this.pad(this.picker.hour > 12 ? 12 - (this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour) : this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour, true)
          return this.pad(this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour, true)
        },
        h: () => {
          if (this.h24)
            return this.picker.hour > 12 ? 12 - (this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour) : (this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour)
          return this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour
        },
        mm: () => this.pad(this.picker.minute, true),
        m: () => this.picker.minute.toString(),
        ss: () => this.pad(this.picker.second, true),
        s: () => this.picker.second.toString(),
        a: () => this.picker.hour >= 12 ? 'PM' : 'AM'
      }
    },

    /**
    * Get time as date Object - UTC or not depending on props utc
    * @return {Date} - Time as a date Object
    */
    time () {
      // Change time format with AM-PM depending on choice
      if (!this.h24 && this.picker.ampm !== null) {
        const hour = parseInt(this.picker.hour, 10);
        switch (this.picker.ampm){
          case 'AM':
            this.picker.hour = hour >= 12 ? hour - 12 : hour;
            break;
          case 'PM':
            this.picker.hour = hour <= 12 ? hour + 12 : hour;
            break;
        }
      }

      // If cleared
      if (this.picker.hour === -1 && this.picker.minute === -1)
        return '';

      // Set hours in final Date format - default
      this.pickerState.time.setHours(this.picker.hour, this.picker.minute, this.picker.second);
      const date = this.value ? this.value : new Date();
      return this.utc ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), this.picker.hour, this.picker.minute, this.picker.second)) : new Date(this.pickerState.time);
    }
  },
  methods: {
    /**
    * Set a zero before a one digit number if needed by padTime props
    * @param {Number} time - number to analyze
    * @param {Boolean} force - force padding even if padTime is not set
    * @return {String|Number} - the padded number
    * @public
    */
    pad (time, force = false) {
      return this.padTime || force ? time.toString().padStart(2, '0') : time;
    },

    /**
    * Generate a time format depending on formating props
    * @param {String} type - result of formatting
    * @return {String} - formated time
    */
    timeFormated (type) {
      if (this.placeholder && this.pickerState.isPristine)
        return this.placeholder;

      // Inline formating - for display method only - (separator/displayHours... props)
      if (type === 'displayFormat' && !this.displayFormat)
        return  (this.displayHours ? (this.pad(this.picker.hour)) : '') +
                (this.displayMinutes && this.displayHours ? (this.separator + this.pad(this.picker.minute)) : (this.displayMinutes ? this.pad(this.picker.minute) : '')) +
                (this.displaySeconds ? (this.separator + this.pad(this.picker.second)) : '') +
                (!this.h24 ? (this.picker.hour >= 12 ? ' AM' : ' PM' ) : '')

      // RegExp formating (formats props)
      let display = this[type];
      this.formater.forEach(format => {
        if (typeof this.displayRules[format] !== 'undefined') {
          // replace time formater
          display = display.replace(new RegExp(`${format}(?!\])`, 'g'), this.displayRules[format]());

          // replace time escaped formater
          display = display.replace(new RegExp(`\\[${format}\\]`, 'g'), format);
        }
      });

      return display
    },

    /**
    * Create time interval in list
    * @param {Number} [interval=1] - interval asked
    * @param {Number} [timeLength=60] - numbered range to work on.
    * @return {Array} - list of times to select
    * @public
    */
    timeCount (interval = 1, timeLength = 60) {
      return Array.apply(null, {length: timeLength})
             .map(Number.call, Number => timeLength < 60 ? (!this.h24 ? Number + 1 : Number) : Number )
             .filter(num => num % interval === 0)
             .map(time => this.pad(time));
    },

    /**
    * Update of the selected time on the input
    * @param {String} time - kind of time selected (hour, minute, second)
    * @param {Object} e - event listened
    * @emits selected(Hour|Minute|Second)
    * @emits input
    * @public
    */
    selectTime (type, el, e) {
      // If not disable (input as select box item)
      if (!this.disabled && !this.getState(type, 'disable', el)) {
        this.pickerState.isPristine = false;
        this.picker[type] = e.target.textContent;
        this.pickerState.selected[type] = el;

        /**
        * Emit selectedHour selectedMinute and selectedSecond depending on what changed
        * @event selected(Hour|Minute|Second)
        * @type {Date}
        */
        this.$emit(`selected${type.charAt(0).toUpperCase() + type.slice(1)}`, this.picker[type]);

        /**
        * Return formatted time if returnFormat set (absolute time ONLY)
        * @event formatedTime
        * @type {String}
        */
        if (this.returnFormat)
          this.$emit('formatedTime', this.timeFormated('returnFormat'));


        /**
        * Emit event because input has changed
        * @event input
        * @type {Date|Object}
        */
        this.$emit('input', this.time);
      } else {
        /**
        * Emit event because disabled time has been clicked
        * @event selectedDisabled
        * @type {Number}
        */
        this.$emit('selectedDisabled');
      }
    },

    /**
    * Clear time and reset modalbox
    * @public
    */
    clearTime () {
      this.pickerState.isPristine = true;
      this.pickerState.selected.hour = -1;
      this.pickerState.selected.minute = -1;
      this.pickerState.selected.second = -1;
      this.pickerState.selected.ampm = null;

      this.picker.hour = 0;
      this.picker.minute = 0;
      this.picker.second = 0;
      this.picker.ampm = 'AM';

      this.close();

      this.$emit('input', '');
      this.$emit('cleared');
    },

    /**
    * Toggle Picker in order to open or close the select modal
    * @public
    */
    togglePicker () {
      if (!this.disabled) {
        this.pickerState.isClosed = !this.pickerState.isClosed;

        /**
        * Emit opened|closed modal event
        * @event opened|closed
        * @type {null}
        */
        this.pickerState.isClosed ? this.$emit('closed', this.$el) : this.$emit('opened', this.$el);
      }
    },

    /**
    * Close timepicker when user has clicked outside of the element
    * @param {Object} [e=null] - click event listened
    * @public
    */
    close (e = null) {
      if (e === null) {
        !this.pickerState.isClosed && this.togglePicker();
      } else if (!this.$el.contains(e.target) && this.$el !== e.target && !this.pickerState.isClosed) {
        this.togglePicker()
      }
    },

    /**
    * Check if time had to chage in specific state (ie. highlight, disable...)
    * @param {String} type - type of time (hour, minute, second)
    * @param {Number} time - time to check
    * @return {Boolean} - is the time had to change
    * @public
    */
    getState (type, state, time) {
      if (this[state][type.charAt(0)]) {
        const parsedTime = parseInt(time, 10);
        const  timeAskedList = this[state][type.charAt(0)].map(h => {
          if (h instanceof Date && Object.prototype.toString.call(h) === '[object Date]') {
            h = type === 'hour' ? h.getHours() : (type === 'minute' ? h.getMinutes() : h.getSeconds());
          }

          const timeAction = !isNaN(parsedTime) ? parseInt(h, 10) : h;
          return this.h24 === false && timeAction > 12 ? timeAction - 12 : timeAction;
        });

        return timeAskedList.indexOf(parsedTime) >= 0;
      }
    }
  },

  watch: {
    value: function () {
      this.picker.hour = this.value ? (this.utc ? this.value.getUTCHours() : this.value.getHours()) : 0;
      this.picker.minute = this.value ? (this.utc ? this.value.getUTCMinutes() : this.value.getMinutes()) : 0;
      this.picker.second = this.value ? (this.utc ? this.value.getUTCSeconds() : this.value.getSeconds()) : 0;

      if (!this.pickerState.isPristine) {
        this.pickerState.selected.hour = this.h24 ? this.picker.hour : (this.picker.hour > 12 ? this.picker.hour - 12 : this.picker.hour),
        this.pickerState.selected.minute = this.picker.minute
        this.pickerState.selected.second = this.picker.second
        this.pickerState.selected.ampm = this.h24 ? null : (this.picker.hour > 12 ? 'PM' : 'AM')
        this.pickerState.time = this.value;
      }
    }
  },

  created() {
    /** Get preselected time @see timeCount */
    let firstHour;
    if (!this.h24 && this.value) {
      const hour = firstHour = this.utc ? this.value.getUTCHours() : this.value.getHours()
      this.pickerState.selected.ampm = hour <= 12 ? 'AM' : 'PM';
      this.picker.ampm = hour <= 12 ? 'AM' : 'PM';
      this.picker.hour = hour >= 12 ? hour - 12 : hour;
    }
    this.value !== null && ['hour', 'minute', 'second'].forEach(type => (this.pickerState.selected[type] = this.picker[type] && this.pad(this.picker[type])));

    // Get 24h again for input datetime format
    if (!this.h24 && this.value)
      this.picker.hour = firstHour;

    // Warn if possible AM-PM confusion on selection
    if (!this.h24 && (this.highlight.h && this.highlight.h.length > 0) || (this.disable.h && this.disable.h.length > 0)) {
      console.warn('You shouldn\'t use h24="false" with highlight or disable hour props. It may cause AM-PM confusion or limitation due to multiple hours selected.')
    }

    if (this.initialView) {
      this.togglePicker()
    }

    /** To bind click outside of the event @see close */
    window.addEventListener('click', this.close);

  },

  /** To unbind click outside of the event @see close */
  beforeDestroy() {
    window.removeEventListener('click', this.close);
  }
}
</script>

<style>
  .vtimeselector {
    position: relative;
    font-family: sans-serif;
  }

  .vtimeselector__input {
    width: 100%;
    box-sizing: border-box;
  }

  .vtimeselector__clear {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    cursor: pointer;
  }

  .vtimeselector__clear__ico {
    display: inline-block;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    color: #a5a5a5;
  }

  .vtimeselector__clear:hover .vtimeselector__clear__ico{
    color: black;
  }

  .vtimeselector__box {
    position: absolute;
    display: flex;
    left: 0;
    top: 100%;
    width: 100%;
    height: 10em;
    background: white;
    z-index: 999;
  }

  .vtimeselector__box--is-closed { display: none; }

  .vtimeselector__box__item { cursor: pointer; }

  .vtimeselector__box__list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    text-align: center;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .vtimeselector__box__list + .vtimeselector__box__list {
    border-left: 1px solid #ffffff;
  }

  .vtimeselector__box__head {
    color: #a5a5a5;
    font-size: .8em;
    padding: .8em 0 .4em;
  }

  .vtimeselector__box__item {
    padding: .4em 0;
    font-size: 1em;
  }

  .vtimeselector__box__item:not(.timeselector__box__item--is-disabled):not(.timeselector__box__item--is-selected):hover {
    background: #d3d3d3;
  }

  .timeselector__box__item--is-highlighted { background: #5b64f7; }
  .timeselector__box__item--is-selected {
    background: #05cfb5;
    color: #ffffff;
  }
  .timeselector__box__item--is-disabled {
    cursor: auto;
    background: #f5f5f5;
    color: #a5a5a5;
  }
</style>
