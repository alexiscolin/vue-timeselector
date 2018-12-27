<template>
  <div>
    <timeselector :value="time">
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
      time: new Date()
    }
  }
}
</script>

<style>
</style>
