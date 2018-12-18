import { mount } from '@vue/test-utils';
import VueTimeSelector from '../src/VueTimeSelector.vue';

/**
* First load instance test
*/
describe('VueTimeSelector', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(VueTimeSelector)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
