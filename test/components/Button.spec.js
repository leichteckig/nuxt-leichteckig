import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Button);
    expect(wrapper.vm).toBeTruthy();
  });

  it('should render text in default slot', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Read article now'
      }
    });

    expect(wrapper.find('.button').text()).toBe('Read article now');
  });
});
