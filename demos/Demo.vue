<template>
  <div>
    <p>Time: {{ time }}</p>
      <br><br>
    <timeselector v-model="time"
                  :utc="false"
                  :h24="false"
                  displayFormat="HH:mm"
                  returnFormat="HH-mm"
                  placeholder="bonjour"
                  :disable="{h:[16, 5], m: null, s: null}">
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
