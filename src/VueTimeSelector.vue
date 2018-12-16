<template>
  <div class="vtimeselector">
    <input type="text"
           readonly="readonly"
           autocomplete="off"
           v-model="timeToDisplay"
           :id="id"
           :required="required"
           :name="name"
           @click="togglePicker">

    <div class="vtimeselector__box" :class="{'vtimeselector__box--is-closed': picker.isClosed}">
        <ul>
          <li v-for="(hour, index) in timeCount(interval.h, hoursLength)" :key="index" @click="selectTime('hour', $event)">{{hour}}</li>
        </ul>
        <ul>
          <li v-for="(minute, index) in timeCount(interval.m)" :key="index" @click="selectTime('minute', $event)">{{minute}}</li>
        </ul>
        <ul v-if="displaySeconds">
          <li v-for="(second, index) in timeCount(interval.s)" :key="index" @click="selectTime('second', $event)">{{second}}</li>
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
      type: Date
    },
    /**
    * Input id property
    */
    id: {
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
      default: false
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
    }
  },
  data () {
    return {
      picker: {
        hour: this.value ? this.value.getHours() : 0,
        minute: this.value ? this.value.getMinutes() : 0,
        second: this.value ? this.value.getSeconds() : 0,
        long: false,
        time: new Date(),
        isClosed: true
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
      this.picker.time.setHours(this.picker.hour, this.picker.minute, this.picker.second);
      return this.utc ? new Date(Date.UTC(this.value.getFullYear(), this.value.getMonth(), this.value.getDate(), this.picker.hour, this.picker.minute, this.picker.second)) : new Date(this.picker.time);
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
    selectTime (time, e) {
      this.picker[time] = e.target.textContent;
      /**
      * Emit selectedHour selectedMinute and selectedSecond depending on what changed
      * @event selected(Hour|Minute|Second)
      * @type {Date}
      */
      this.$emit(`selected${time.charAt(0).toUpperCase()}`, this.picker[time]);

      /**
      * Emit event because input has changed
      * @event input
      * @type {Date|Object}
      */
      this.$emit('input', this.time);
    },

    /**
    * Toggle timepocker in order to open or close the select modal
    * @emits opened
    * @emits closed
    * @public
    */
    togglePicker () {
      this.picker.isClosed = !this.picker.isClosed;

      /**
      * Emit opened|closed modal event
      * @event opened|closed
      * @type {Node}
      */
      this.picker.isClosed ? this.$emit('closed', this.$el) : this.$emit('opened', this.$el);
    }
  }
}
</script>

<style>
  .vtimeselector {
    position: relative;
  }
  .vtimeselector__box {
    position: absolute;
    display: flex;
    left: 0;
    top: 100%;
    background: white;
    z-index: 1;
  }
  .vtimeselector__box--is-closed {
    display: none;
  }
</style>
