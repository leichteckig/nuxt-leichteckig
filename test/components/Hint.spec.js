/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import Hint from '@/components/Hint.vue'

describe('Hint component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Hint, {
      propsData: {
        title: 'A little hint',
        message: 'Here, you can set your message',
        type: 'info',
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should render info message', () => {
    const wrapper = shallowMount(Hint, {
      propsData: {
        title: 'A little info',
        message: 'Here, you can set your message',
        type: 'info',
      },
      slots: {
        default: 'Here, you can set your message'
      }
    });

    expect(wrapper.find('.hint-info')).toBeTruthy();
    expect(wrapper.find('.hint__title').text()).toBe('A little info');
    expect(wrapper.find('.hint__description').text()).toBe('Here, you can set your message');
  });

  it('should render error message', () => {
    const wrapper = shallowMount(Hint, {
      propsData: {
        title: 'A little error',
        message: 'Here, you can set your message',
        type: 'error',
      },
      slots: {
        default: 'Here, you can set your message'
      }
    });

    expect(wrapper.find('.hint-error')).toBeTruthy();
    expect(wrapper.find('.hint__title').text()).toBe('A little error');
    expect(wrapper.find('.hint__description').text()).toBe('Here, you can set your message');
  });

  it('should render success message', () => {
    const wrapper = shallowMount(Hint, {
      propsData: {
        title: 'A little success',
        message: 'Here, you can set your message',
        type: 'success',
      },
      slots: {
        default: 'Here, you can set your message'
      }
    });

    expect(wrapper.find('.hint-success')).toBeTruthy();
    expect(wrapper.find('.hint__title').text()).toBe('A little success');
    expect(wrapper.find('.hint__description').text()).toBe('Here, you can set your message');
  });
});

