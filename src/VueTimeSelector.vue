<template>
  <div class="vtimeselctor">
    <input type="text" readonly="readonly" autocomplete="off" v-model="timeToDisplay">
    <div class="vtimeselctor__box">
        <ul>
          <li v-for="(hour, index) in timeCount(hoursInterval, hoursLength)" :key="index">{{hour}}</li>
        </ul>
        <ul>
          <li v-for="(min, index) in timeCount(minutesInterval)" :key="index">{{min}}</li>
        </ul>
        <ul>
          <li v-for="(sec, index) in timeCount(secondsInterval)" :key="index">{{sec}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeselector',
  props: {
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
    h24: {
      type: Boolean,
      default: false
    },
    hoursInterval: {
      type: Number,
      default: 1
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
        min: 0,
        sec: 0,
        long: false
      },
      longHourCount: 24,
      shortHourCount: 12,
      minCount: 60,
      secCount: 60
    }
  },
  computed: {
    hoursLength () {
      return this.h24 ? this.longHourCount : this.shortHourCount;
    },
    timeToDisplay () {
      return  (this.displayHours ? (this.pad(this.picker.hour)) : '') +
              (this.displayMinutes && this.displayHours ? (this.separator + this.pad(this.picker.min)) : (this.displayMinutes ? this.padTime(this.picker.min) : '')) +
              (this.displaySeconds ? (this.separator + this.pad(this.picker.sec)) : '');
    }
  },
  methods: {
    pad (time) {
      return this.padTime ? time.toString().padStart(2, '0') : time;
    },
    timeCount (interval = 1, timeLength = 60) {
      return Array.apply(null, {length: timeLength}).map(Number.call, Number => Number + 1).filter(num => num % interval === 0);
    },
  }
}
</script>

<style>
  .vtimeselctor {
    position: relative;
  }
  .vtimeselctor__box {
    position: absolute;
    left: 0;
    top: 100%;
    display: flex;
  }
</style>
