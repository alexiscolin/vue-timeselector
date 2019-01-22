import { mount } from '@vue/test-utils';
import Vue from 'vue';
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

  /**
  * Test initial view picker open
  */
  it('Can be opened when created', () => {
    [new Date(), null].forEach(type => {
      const wrapper = factory({
        propsData: {
          value: type,
          initialView: true
        }
      });

      expect(wrapper.find('.vtimeselector__box').classes('vtimeselector__box--is-closed')).toBeFalsy();
    });
  });

  /**
  * Test falsy h24 set hours 12 times (and no more) and AMPM picker
  */
  it('Display 12h in picker when h24 is disabled', () => {
    [new Date(), null].forEach(type => {
      const wrapper = factory({
        propsData: {
          value: type,
          h24: false
        }
      });

      expect(wrapper.findAll('.vtimeselector__box__item--hours').length).toEqual(12);
      expect(wrapper.findAll('.vtimeselector__box__list--ampm').exists()).toBe(true);
    });
  });

  /**
  * Test if display hour prop can display or not the hour picker
  */
  it('Achieve to display or not the hour picker', () => {
    [new Date(), null].forEach(type => {
      [false,true].forEach(state => {
        const wrapper = factory({
          propsData: {
            value: type,
            displayHours: state
          }
        });

        expect(wrapper.findAll('.vtimeselector__box__list--hours').exists()).toBe(state);
      })
    });
  });

  /**
  * Test if display minute prop can display or not the minute picker
  */
  it('Achieve to display or not the minute picker', () => {
    [new Date(), null].forEach(type => {
      [false,true].forEach(state => {
        const wrapper = factory({
          propsData: {
            value: type,
            displayMinutes: state
          }
        });

        expect(wrapper.findAll('.vtimeselector__box__list--minutes').exists()).toBe(state);
      })
    });
  });

  /**
  * Test if display second prop can display or not the second picker
  */
  it('Achieve to display or not the second picker', () => {
    [new Date(), null].forEach(type => {
      [false,true].forEach(state => {
        const wrapper = factory({
          propsData: {
            value: type,
            displaySeconds: state
          }
        });

        expect(wrapper.findAll('.vtimeselector__box__list--seconds').exists()).toBe(state);
      })
    });
  });

  /**
  * Test if returnedFormat return a String
  */
  it('Return a string when returnFormat is set', () => {
    const wrapper = factory({
      propsData: {
        value: null,
        initialView: true,
        interval: {h:1, m:1, s:1},
        returnFormat: 'H[h]m'
      }
    });

    const hours = Math.floor(Math.random() * 23);
    const minutes = Math.floor(Math.random() * 59);

    wrapper.findAll('.vtimeselector__box__item--hours').at(hours).trigger('click');
    expect(wrapper.emitted().formatedTime[0][0]).toBe(`${hours}h0`);

    wrapper.findAll('.vtimeselector__box__item--minutes').at(minutes).trigger('click');
    expect(wrapper.emitted().formatedTime[1][0]).toBe(`${hours}h${minutes}`);

    console.log(wrapper.emitted().formatedTime)
  });

  /**
  * Test if click on input open and close the picker
  */
  it('Can open and close the picker with emitted event', () => {
    const wrapper = factory({
      propsData: {
        value: null,
      }
    });

    const input = wrapper.find('.vtimeselector__input');
    input.trigger('click');
    expect(wrapper.find('.vtimeselector__box').classes('vtimeselector__box--is-closed')).toBeFalsy();
    expect(wrapper.emitted().opened[0][0]).toBeTruthy();

    input.trigger('click');
    expect(wrapper.find('.vtimeselector__box').classes('vtimeselector__box--is-closed')).toBeTruthy();
    expect(wrapper.emitted().closed[0][0]).toBeTruthy();
  });
})
