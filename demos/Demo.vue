<template>
  <div>
    {{ time }}
    <timeselector v-model="time" :utc="false" displayFormat="HH:mm:ss" returnFormat="HH">
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
