<template>
  <div>
    <p>Time: {{ time }}</p>
      <br><br>
    <timeselector v-model="time"
                  :utc="true"
                  :h24="false"
                  displayFormat="HH [h]our[s] and mm [s]econd"
                  returnFormat="HH-mm"
                  :initialView="false"
                  :interval="{h:1, m: 1, s: 1}">
      <template slot="hours">
        <span>hours</span>
      </template>
    </timeselector>


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
  }
}
</script>

<style>
</style>
