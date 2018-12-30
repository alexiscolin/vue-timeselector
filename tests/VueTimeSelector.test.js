import { mount } from '@vue/test-utils';
import VueTimeSelector from '../src/VueTimeSelector.vue';

const factory = (values = {}) => {
  return mount(VueTimeSelector, {...values})
}

describe('VueTimeSelector', () => {
  /**
  * First load instance test
  */
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  /**
  * Test placeholder
  */
  it('Can display a placeholder', () => {
    [new Date(), null].forEach(type => {
      const wrapper = factory({
        propsData: {
          value: type,
          placeholder: 'This is a placeholder'
        }
      });

      expect(wrapper.find('.vtimeselector__input').element.value).toBe('This is a placeholder');
    })
  });

  /**
  * Test name attribute
  */
  it('May have a name attribute', () => {
    [new Date(), null].forEach(type => {
      const wrapper = factory({
        propsData: {
          value: type,
          name: 'This is a name'
        }
      });

      expect(wrapper.find('.vtimeselector__input').attributes().name).toBe('This is a name');
    });
  });

  /**
  * Test id attribute
  */
  it('May have an id attribute', () => {
    [new Date(), null].forEach(type => {
      const wrapper = factory({
        propsData: {
          value: type,
          id: 'myId'
        }
      });

      expect(wrapper.find('.vtimeselector__input').attributes().id).toBe('myId');
    });
  });

  /**
  * Test required attribute
  */
  it('May have a required attribute', () => {
    [new Date(), null].forEach(type => {
      const wrapper = factory({
        propsData: {
          value: type,
          required: true
        }
      });

      expect(wrapper.find('.vtimeselector__input').attributes().required).toBeTruthy();
    });
  });

  /**
  * Test disabled attribute
  */
  it('May have a disabled attribute', () => {
    [new Date(), null].forEach(type => {
      const wrapper = factory({
        propsData: {
          value: type,
          disabled: true
        }
      });

      expect(wrapper.find('.vtimeselector__input').attributes().disabled).toBeTruthy();
    });
  });
})
