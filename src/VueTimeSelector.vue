<template>
  <div class="vtimeselctor">
    <input type="text" readonly="readonly" autocomplete="off" v-model="timeToDisplay">
    <div class="vtimeselctor__box">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
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
    }
  },
  data () {
    return {
      picker: {
        hour: 0,
        min: 0,
        sec: 0
      }
    }
  },
  computed: {
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
