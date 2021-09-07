import { shallowMount } from '@vue/test-utils'
import Polaroid from '@/components/Polaroid.vue'

describe('Polaroid component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Polaroid, {
      propsData: {
        imagePath: 'test/images/amazing.png'
      }
    });

    expect(wrapper.vm).toBeTruthy()
  });

  it('should render image path', () => {
    const wrapper = shallowMount(Polaroid, {
      propsData: {
        imagePath: 'test/images/amazing.png'
      }
    });

    expect(wrapper.find('.image').attributes().src).toBe('test/images/amazing.png');
  });
})
