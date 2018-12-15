<template>
  <div class="vtimeselctor">
    <input type="text" :id="id" :required="required" :name="name" readonly="readonly" autocomplete="off" v-model="timeToDisplay" @input="$emit('input', $event.target.value)">
    <div class="vtimeselctor__box">
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
import moment from 'moment';

export default {
  name: 'timeselector',
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    displayHours: {
      type: Boolean,
      default: true
    },
    displayMinutes: {
      type: Boolean,
      default: true
    },
    displaySeconds: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: ':'
    },
    padTime: {
      type: Boolean,
      default: false
    },
    format: {
      type: String
    },
    h24: {
      type: Boolean,
      default: false
    },
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
    minutesInterval: {
      type: Number,
      default: 10
    },
    secondsInterval: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      picker: {
        hour: 0,
        minute: 0,
        second: 0,
        long: false,
        time: new Date()
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
    * @desc Get 24|12 hours mode
    * @return {Number} - function to generate time replacement
    */
    hoursLength () {
      return this.h24 ? this.longHourCount : this.shortHourCount;
    },

    /**
    * @desc Rules that defines time replacement in regex
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
    * @desc Generate a time format depending on formating props
    * @return {String} - formated time
    */
    timeToDisplay () {
      // Inline formating (separator/displayHours... props)
      if(!this.format)
        return  (this.displayHours ? (this.pad(this.picker.hour)) : '') +
                (this.displayMinutes && this.displayHours ? (this.separator + this.pad(this.picker.minute)) : (this.displayMinutes ? this.padTime(this.picker.minute) : '')) +
                (this.displaySeconds ? (this.separator + this.pad(this.picker.second)) : '');

      // RegExp formating (format props)
      let display = this.format;
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
    * @desc Get time as date Object
    * @return {Date} - Time as a date Object
    */
    time () {
      return this.picker.time.setHours(this.picker.hour, this.picker.minute, this.picker.second);
    }
  },
  methods: {
    pad (time) {
      return this.padTime ? time.toString().padStart(2, '0') : time;
    },
    timeCount (interval = 1, timeLength = 59) {
      return Array.apply(null, {length: timeLength})
             .map(Number.call, Number => timeLength < 59 ? (!this.h24 ? Number + 1 : Number) : Number )
             .filter(num => num % interval === 0)
             .map(time => this.pad(time));
    },
    selectTime (time, e) {
      this.picker[time] = e.target.textContent;
      this.$emit(`selected${time.charAt(0).toUpperCase()}`, this.picker[time]);
    }
  }
}
</script>

<style>
  .vtimeselctor {
    position: relative;
  }
  .vtimeselctor__box {
    position: absolute;
    display: flex;
    left: 0;
    top: 100%;
    background: white;
    z-index: 1;
  }
</style>
