<template>
  <div>
    <p>Time: {{ time }}</p>
      <br><br>
    <timeselector v-model="time"
                  :utc="false"
                  :h24="false"
                  displayFormat="HH:mm a"
                  :initialView="false"
                  :displaySeconds="true"
                  :interval="{h:1, m: 1, s: 1}"
                  @formatedTime="formatedTime">
      <template slot="hours">
        <span>hours</span>
      </template>
    </timeselector>

    <button @click="change">change the date</button>
  </div>
</template>

<script>
import Timeselector from '../src/VueTimeSelector.vue';
export default {
  name: 'demo',
  components: { Timeselector },
  data() {
    return {
      time: null
    }
  },
  methods: {
    change () {
      this.time = new Date();
    },
    formatedTime (e) {
      console.log('formated: ' + e);
    }
  }
}
</script>

<style>
</style>
