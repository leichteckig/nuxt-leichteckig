/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import ColorModePicker from '@/components/ColorModePicker.vue'

describe('ColorModePicker component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(ColorModePicker, {
      propsData: {
        imagePath: 'test/images/amazing.png'
      },
      mocks: {
        $colorMode: 'unknown'
      },
    });
    wrapper.setData({
      colors: ['system', 'light', 'dark']
    });

    expect(wrapper.vm).toBeTruthy();
  });
});
