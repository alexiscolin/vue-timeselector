import VueTimeSelector from './VueTimeSelector.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('timeselector', VueTimeSelector);
  }
};
