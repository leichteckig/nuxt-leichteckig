import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Polaroid from '~/components/Polaroid.vue'

describe('Polaroid component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Polaroid, {
      props: {
        imagePath: 'test/images/amazing.png'
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('should render image path', () => {
    const wrapper = shallowMount(Polaroid, {
      props: {
        imagePath: 'test/images/amazing.png'
      }
    });

    expect(wrapper.find('.polaroid__image').attributes().src).toBe('test/images/amazing.png');
  });

  it('should render in primary color', () => {
    const wrapper = shallowMount(Polaroid, {
      props: {
        imagePath: 'test/images/amazing.png',
        type: 'primary'
      }
    });
    expect(wrapper.find('.polaroid__primary').exists()).toBe(true);
  });

  it('should render in rose color', () => {
    const wrapper = shallowMount(Polaroid, {
      props: {
        imagePath: 'test/images/amazing.png',
        type: 'rose'
      }
    });
    expect(wrapper.find('.polaroid__rose').exists()).toBe(true);
  });

  it('should render in purple color', () => {
    const wrapper = shallowMount(Polaroid, {
      props: {
        imagePath: 'test/images/amazing.png',
        type: 'purple'
      }
    });
    expect(wrapper.find('.polaroid__purple').exists()).toBe(true);
  });
});
