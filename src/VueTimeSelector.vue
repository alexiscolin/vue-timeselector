<template>
  <div class="vtimeselector">
    <input type="text"
           readonly="readonly"
           autocomplete="off"
           class="vtimeselector__input"
           v-model="timeToDisplay"
           :id="id"
           :required="required"
           :name="name"
           :class="{'vtimeselector__input--is-open': !picker.isClosed}"
           @click="togglePicker">

    <div class="vtimeselector__box" :class="{'vtimeselector__box--is-closed': picker.isClosed}">
        <ul class="vtimeselector__box__list vtimeselector__box__list--hours" v-if="displayHours">
          <li class="vtimeselector__box__head" slot="hours">HH</li>
          <li class="vtimeselector__box__item vtimeselector__box__item--hours"
              v-for="(hour, index) in timeCount(interval.h, hoursLength)" :key="index"
              :class="{'timeselector__box__item--is-selected': picker.selected.hour === hour, 'timeselector__box__item--is-highlighted': getState('hour', 'highlight', hour), 'timeselector__box__item--is-disabled': getState('hour', 'disable', hour)}"
              @click="selectTime('hour', hour, $event)">{{hour}}</li>
        </ul>
        <ul class="vtimeselector__box__list vtimeselector__box__list--minutes" v-if="displayMinutes">
          <li class="vtimeselector__box__head" slot="minutes">mm</li>
          <li class="vtimeselector__box__item vtimeselector__box__item--minutes"
              v-for="(minute, index) in timeCount(interval.m)" :key="index"
              :class="{'timeselector__box__item--is-selected': picker.selected.minute === minute, 'timeselector__box__item--is-highlighted': getState('minute', 'highlight', minute), 'timeselector__box__item--is-disabled': getState('minute', 'disable', minute)}"
              @click="selectTime('minute', minute, $event)">{{minute}}</li>
        </ul>
        <ul class="vtimeselector__box__list vtimeselector__box__list--seconds"  v-if="displaySeconds">
          <li class="vtimeselector__box__head" slot="seconds">ss</li>
          <li class="vtimeselector__box__item vtimeselector__box__item--seconds"
              v-for="(second, index) in timeCount(interval.s)" :key="index"
              :class="{'timeselector__box__item--is-selected': picker.selected.second === second, 'timeselector__box__item--is-highlighted': getState('second', 'highlight', second), 'timeselector__box__item--is-disabled': getState('second', 'disable', second)}"
              @click="selectTime('second', second, $event)">{{second}}</li>
        </ul>
        <ul class="vtimeselector__box__list vtimeselector__box__list--ampm"  v-if="!h24">
          <li class="vtimeselector__box__head" slot="ampm">AM / PM</li>
          <li class="vtimeselector__box__item vtimeselector__box__item--ampm"
              :class="{'timeselector__box__item--is-selected': picker.selected.ampm === 'AM'}"
              @click="selectTime('ampm', 'AM', $event)">AM</li>
          <li class="vtimeselector__box__item vtimeselector__box__item--ampm"
              :class="{'timeselector__box__item--is-selected': picker.selected.ampm === 'PM'}"
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
      picker: {
        hour: this.value ? (this.utc ? this.value.getUTCHours() : this.value.getHours()) : 0,
        minute: this.value ? (this.utc ? this.value.getUTCMinutes() : this.value.getMinutes()) : 0,
        second: this.value ? (this.utc ? this.value.getUTCSeconds() : this.value.getSeconds()) : 0,
        ampm: !this.h24 ? 'AM' : null,
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
      formater: ['HH', 'H', 'hh', 'h', 'kk', 'k', 'mm', 'm', 'ss', 's'],
      longHourCount: 24,
      shortHourCount: 12,
      minCount: 60,
      secCount: 60
    }
  },
  computed: {
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
        HH: () => this.pad(this.picker.hour),
        H: () => this.picker.hour,
        kk: () => this.pad(this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour),
        k: () => this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour,
        hh: () => {
          if (this.h24)
            return this.pad(this.picker.hour > 12 ? 12 - (this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour) : this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour)
          return this.pad(this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour)
        },
        h: () => {
          if (this.h24)
            return this.picker.hour > 12 ? 12 - (this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour) : (this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour)
          return this.picker.hour === 0 ? this.picker.hour + 1 : this.picker.hour
        },
        mm: () => this.pad(this.picker.minute),
        m: () => this.picker.minute.toString(),
        ss: () => this.pad(this.picker.second),
        s: () => this.picker.second.toString()
      }
    },

    /**
    * Generate a time format depending on formating props
    * @return {String} - formated time
    */
    timeToDisplay () {
      if(this.placeholder && this.picker.isPristine)
        return this.placeholder;

      // Inline formating (separator/displayHours... props)
      if(!this.displayFormat)
        return  (this.displayHours ? (this.pad(this.picker.hour)) : '') +
                (this.displayMinutes && this.displayHours ? (this.separator + this.pad(this.picker.minute)) : (this.displayMinutes ? this.padTime(this.picker.minute) : '')) +
                (this.displaySeconds ? (this.separator + this.pad(this.picker.second)) : '');

      // RegExp formating (format props)
      let display = this.displayFormat;
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

      // Set hours in final Date format
      this.picker.time.setHours(this.picker.hour, this.picker.minute, this.picker.second);
      const date = this.value ? this.value : new Date();
      return this.utc ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), this.picker.hour, this.picker.minute, this.picker.second)) : new Date(this.picker.time);
    }
  },
  methods: {
    /**
    * Set a zero before a one digit number if needed by padTime props
    * @param {Number} - number to analyze
    * @return {String|Number} - the padded number
    * @public
    */
    pad (time) {
      return this.padTime ? time.toString().padStart(2, '0') : time;
    },

    /**
    * Create time interval in list
    * @param {Number} [interval=1] - interval asked
    * @param {Number} [timeLength=59] - numbered range to work on.
    * @return {Array} - list of times to select
    * @public
    */
    timeCount (interval = 1, timeLength = 59) {
      return Array.apply(null, {length: timeLength})
             .map(Number.call, Number => timeLength < 59 ? (!this.h24 ? Number + 1 : Number) : Number )
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
        this.picker.isPristine = false;
        this.picker[type] = e.target.textContent;
        this.picker.selected[type] = el;

        /**
        * Emit selectedHour selectedMinute and selectedSecond depending on what changed
        * @event selected(Hour|Minute|Second)
        * @type {Date}
        */
        this.$emit(`selected${type.charAt(0).toUpperCase() + type.slice(1)}`, this.picker[type]);

        /**
        * Emit event because input has changed
        * @event input
        * @type {Date|Object}
        */
        this.$emit('input', this.time);
      }
    },

    /**
    * Toggle Picker in order to open or close the select modal
    * @public
    */
    togglePicker () {
      if (!this.disabled) {
        this.picker.isClosed = !this.picker.isClosed;

        /**
        * Emit opened|closed modal event
        * @event opened|closed
        * @type {null}
        */
        this.picker.isClosed ? this.$emit('closed', this.$el) : this.$emit('opened', this.$el);
      }
    },

    /**
    * Close timepicker when user has clicked outside of the element
    * @param {Object} e - click event listened
    * @public
    */
    close(e) {
      if (!this.$el.contains(e.target) && this.$el !== e.target && !this.picker.isClosed) {
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
        console.log('in');
        const parsedTime = parseInt(time, 10);
        const  timeAskedList = this[state][type.charAt(0)].map(h => {
          if (h instanceof Date && Object.prototype.toString.call(h) === '[object Date]') {
            h = type === 'hour' ? h.getHours() : (type === 'minute' ? h.getMinutes() : h.getSeconds());
          }

          return !isNaN(parsedTime) ? parseInt(h, 10) : h
        });

        return timeAskedList.indexOf(parsedTime) >= 0;
      }
    }
  },

  created() {
    /** Get preselected time @see timeCount */
    let firstHour;
    if (!this.h24 && this.value) {
      const hour = firstHour = this.utc ? this.value.getUTCHours() : this.value.getHours()
      this.picker.selected.ampm = hour <= 12 ? 'AM' : 'PM';
      this.picker.ampm = hour <= 12 ? 'AM' : 'PM';
      this.picker.hour = hour >= 12 ? hour - 12 : hour;
    }
    ['hour', 'minute', 'second'].forEach(type => (this.picker.selected[type] = this.picker[type] && this.pad(this.picker[type])));

    // Get 24h again for input datetime format
    if (!this.h24 && this.value)
      this.picker.hour = firstHour;

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
  .vtimeselector { position: relative; }

  .vtimeselector__input {
    width: 100%;
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
